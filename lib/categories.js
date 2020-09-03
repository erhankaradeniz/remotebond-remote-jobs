import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

const getAllCategories = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_categories") // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    )
    return JSON.stringify({ data: dbs.data })
  } catch (e) {
    throw e.message
  }
}
export default getAllCategories
