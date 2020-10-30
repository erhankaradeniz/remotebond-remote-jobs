import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getTopicBySlug = async (slug) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_forum_topics_by_slug"),
            slug // specify source
          )
        ),
        q.Lambda(
          "topic_ref",
          q.Let(
            {
              topic: q.Get(q.Var("topic_ref")),
              author: q.Get(q.Select(["data", "author"], q.Var("topic"))),
              category: q.Get(q.Select(["data", "category"], q.Var("topic"))),
              comments_refs: q.Match(
                q.Index("forum_comments_by_topic"),
                q.Var("topic_ref")
              ),
              comments: q.Map(
                q.Paginate(q.Var("comments_refs")),
                q.Lambda(
                  "comment_ref",
                  q.Let(
                    {
                      comment: q.Get(q.Var("comment_ref")),
                      author: q.Get(
                        q.Select(["data", "author"], q.Var("comment"))
                      ),
                    },
                    {
                      comment: q.Var("comment"),
                      author: q.Var("author"),
                    }
                  )
                )
              ),
            },
            // Return actual data of topic including author and comments
            {
              topic: q.Var("topic"),
              author: q.Var("author"),
              category: q.Var("category"),
              comments_refs: q.Var("comments_refs"),
              comments: q.Var("comments"),
            }
          )
        )
      )
    )
    return JSON.stringify(...dbs.data)
  } catch (e) {
    throw e.message
  }
}

export const getAllTopics = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_forum_topics") // specify source
          ),
          { size: 100 }
        ),
        q.Lambda(
          "topic_ref",
          q.Let(
            {
              topic: q.Get(q.Var("topic_ref")),
              category: q.Get(q.Select(["data", "category"], q.Var("topic"))),
            },
            // Return actual data of topic including author
            {
              topic: q.Var("topic"),
              category: q.Var("category"),
            }
          )
        ) // lookup each result by its reference
      )
    )
    return JSON.stringify({ data: dbs.data })
  } catch (e) {
    throw e.message
  }
}

const getAllForumTopics = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_forum_topics") // specify source
          ),
          { size: 100 }
        ),
        q.Lambda(
          "topic_ref",
          q.Let(
            {
              topic: q.Get(q.Var("topic_ref")),
              author: q.Get(q.Select(["data", "author"], q.Var("topic"))),
              category: q.Get(q.Select(["data", "category"], q.Var("topic"))),
              comments_refs: q.Match(
                q.Index("forum_comments_by_topic"),
                q.Var("topic_ref")
              ),
              comments: q.Map(
                q.Paginate(q.Var("comments_refs")),
                q.Lambda(["ref"], q.Get(q.Var("ref")))
              ),
            },
            // Return actual data of topic including author and comments
            {
              topic: q.Var("topic"),
              author: q.Var("author"),
              category: q.Var("category"),
              comments_refs: q.Var("comments_refs"),
              comments: q.Var("comments"),
            }
          )
        )
      )
    )
    return JSON.stringify({ data: dbs.data })
  } catch (e) {
    throw e.message
  }
}
export default getAllForumTopics
