import withSession from "../../lib/session"
import { query as q } from "faunadb"
import { authClient } from "../../lib/fauna-client"

export default withSession(async (req, res) => {
  const user = req.session.get("user")

  if (user) {
    try {
      const { ref, data } = await authClient(user.secret).query(
        q.Get(q.Identity())
      )
      res.json({
        isLoggedIn: true,
        username: data.username,
        profile_image: data.profile_image ? data.profile_image : "",
        first_name: data.first_name ? data.first_name : "",
        last_name: data.last_name ? data.last_name : "",
        about: data.about ? data.about : "",
        tagline: data.tagline ? data.tagline : "",
        tags: data.tags ? data.tags : "",
      })
    } catch (error) {
      res.json({ isLoggedIn: false })
    }
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})
