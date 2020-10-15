import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getUserByUsername = async (username) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("user_by_username"),
            username // specify source
          )
        ),
        (ref) => q.Get(ref)
      )
    )
    return JSON.stringify(...dbs.data)
  } catch (e) {
    throw e.message
  }
}

const getAllUsers = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_users") // specify source
          ),
          { size: 3000 }
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    )
    return dbs.data
  } catch (e) {
    throw e.message
  }
}

export default getAllUsers
