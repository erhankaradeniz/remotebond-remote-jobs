import faunadb from "faunadb"
import withSession from "../../../../lib/session"
import { authClient } from "../../../../lib/fauna-client"
import Slugify from "../../../../helpers/slugify"

const q = faunadb.query

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const user = req.session.get("user")
    const { topic_content, topic_title, topic_category } = req.body

    // return if we have no content
    if (!topic_content || !topic_title) {
      return res.status(400).send("oops, we have errors")
    }

    const slug = Slugify(topic_title)
    let data
    // Only allow logged in users to post
    if (user) {
      try {
        // we need the ref of the posting user
        const { ref } = await authClient(user.secret).query(q.Get(q.Identity()))
        data = await authClient(user.secret).query(
          q.Create(q.Collection("forum_topics"), {
            data: {
              title: topic_title,
              category: q.Ref(
                q.Collection("forum_categories"),
                `${topic_category}`
              ),
              content: topic_content,
              author: ref,
              slug: slug,
              created_at: new Date().toISOString(),
              isLocked: false,
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
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json({ status: "Success" })
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
})
