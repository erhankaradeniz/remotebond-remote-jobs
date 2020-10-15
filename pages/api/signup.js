import { query as q } from "faunadb"
import { guestClient } from "../../lib/fauna-client"
import { setAuthCookie } from "../../lib/auth-cookies"

export default async function signup(req, res) {
  const { email, password, username } = req.body

  if (!email || !password) {
    return res.status(400).send("Email and Password not provided")
  }

  try {
    const existingEmail = await guestClient.query(
      // Exists returns boolean, Casefold returns normalize string
      q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
    )

    if (existingEmail) {
      return res.status(400).send(`Email ${email} already exists`)
    }

    const user = await guestClient.query(
      q.Create(q.Collection("users"), {
        credentials: { password },
        data: { email, username },
      })
    )

    if (!user.ref) {
      return res.status(404).send("user ref is missing")
    }

    const auth = await guestClient.query(
      q.Login(user.ref, {
        password,
      })
    )

    if (!auth.secret) {
      return res.status(404).send("auth secret is missing")
    }

    setAuthCookie(res, auth.secret)

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(error.requestResult.statusCode).send(error.message)
  }
}
