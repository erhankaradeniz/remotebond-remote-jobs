import { query as q } from "faunadb"
import { guestClient } from "../../lib/fauna-client"
import withSession from "../../lib/session"

export default withSession(async (req, res) => {
  const { email, password, username } = req.body

  if (!email || !password) {
    return res.status(400).send("Email and Password not provided")
  }

  try {
    const existingEmail = await guestClient.query(
      // Exists returns boolean, Casefold returns normalize string
      q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
    )
    const existingUsername = await guestClient.query(
      // Exists returns boolean, Casefold returns normalize string
      q.Exists(q.Match(q.Index("user_by_username"), q.Casefold(username)))
    )

    if (existingEmail) {
      return res.status(400).send(`Email ${email} already exists`)
    }
    if (existingUsername) {
      return res.status(400).send(`Username ${username} already exists`)
    }

    const newUser = await guestClient.query(
      q.Create(q.Collection("users"), {
        credentials: { password },
        data: { email, username },
      })
    )

    if (!newUser.ref) {
      return res.status(404).send("user ref is missing")
    }

    const auth = await guestClient.query(
      q.Login(q.Match(q.Index("user_by_email"), q.Casefold(email)), {
        password,
      })
    )

    if (!auth.secret) {
      return res.status(404).send("auth secret is missing")
    }

    const user = {
      secret: auth.secret,
      isLoggedIn: true,
    }

    req.session.set("user", user)
    await req.session.save()

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.json({ error: error })
  }
})
