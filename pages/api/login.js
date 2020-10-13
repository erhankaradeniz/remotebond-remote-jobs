import { query as q } from "faunadb"
import { guestClient } from "../../lib/fauna-client"
import { setAuthCookie } from "../../lib/auth-cookies"

export default async function login(req, res) {
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

    setAuthCookie(res, auth.secret)

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(error.requestResult.statusCode).send(error.message)
  }
}
