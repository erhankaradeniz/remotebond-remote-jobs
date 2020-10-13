import { query as q } from "faunadb"
import { authClient } from "../../lib/fauna-client"
import { getAuthCookie, removeAuthCookie } from "../../lib/auth-cookies"

export default async function logout(req, res) {
  const token = getAuthCookie(req)

  // already logged out
  if (!token) return res.status(200).end()

  try {
    await authClient(token).query(q.Logout(false))
    removeAuthCookie(res)
    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(error.requestResult.statusCode).send(error.message)
  }
}
