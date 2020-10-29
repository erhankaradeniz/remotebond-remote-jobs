import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

const getAllForumCategories = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Documents(
            // query index
            q.Collection("forum_categories") // specify source
          ),
          { size: 15 }
        ),
        q.Lambda(
          "category",
          q.Let(
            {
              category: q.Get(q.Var("category")),
            },
            // Return actual data of topic including author
            {
              category: q.Var("category"),
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
export default getAllForumCategories
