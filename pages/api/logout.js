import { query as q } from "faunadb"
import { authClient } from "../../lib/fauna-client"
import withSession from "../../lib/session"

export default withSession(async (req, res) => {
  const user = req.session.get("user")

  if (user) {
    try {
      req.session
      await authClient(user.secret).query(q.Logout(false))
      req.session.destroy()
      res.json({ isLoggedIn: false })
    } catch (error) {
      res.json({ error: error })
    }
  } else {
    res.json({ isLoggedIn: false })
  }
})
