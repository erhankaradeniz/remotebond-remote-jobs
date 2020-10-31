import faunadb from "faunadb"
import withSession from "../../../../lib/session"
import { authClient } from "../../../../lib/fauna-client"

const q = faunadb.query

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const user = req.session.get("user")
    const { topic_comment, topic_ref } = req.body

    // return if we have no content
    if (!topic_comment) {
      return res.status(400).send("No Comment provided")
    }

    // Only allow logged in users to post
    if (user) {
      try {
        // we need the ref of the posting user
        const { ref } = await authClient(user.secret).query(q.Get(q.Identity()))
        const { data } = await authClient(user.secret).query(
          q.Create(q.Collection("forum_comments"), {
            data: {
              topic_ref: q.Ref(q.Collection("forum_topics"), `${topic_ref}`),
              content: topic_comment,
              author: ref,
              created_at: new Date().toISOString(),
            },
          })
        )
      } catch (error) {
        console.log(error)
        res.json({ status: "Error" })
      }
    } else {
      res.json({ status: "not allowed, bye" })
    }

    // Everything is Okay
    // res.statusCode = 200
    // res.setHeader("Content-Type", "application/json")
    res.json({ status: "Success" })
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
})
