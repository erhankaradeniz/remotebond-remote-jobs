import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getJobsCountByCategory = async (category) => {
  try {
    const dbs = await client.query(
      q.Count(q.Match(q.Index("all_jobs_by_category_desc"), category))
    )
    return JSON.stringify({ data: dbs })
  } catch (e) {
    throw e.message
  }
}

export const getJobBySlug = async (slug) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_jobs_by_slug"),
            slug // specify source
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

const getAllJobs = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_jobs") // specify source
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
export default getAllJobs
