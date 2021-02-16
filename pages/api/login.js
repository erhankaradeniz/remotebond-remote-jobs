import { query as q } from "faunadb"
import { guestClient } from "../../lib/fauna-client"
import withSession from "../../lib/session"

export default withSession(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send("Email and Password not provided")
  }

  try {
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
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
