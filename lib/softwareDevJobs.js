import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getPaginatedSoftwareDevJobs = async (after, pubDate, limit) => {
  limit = limit ? limit : 2
  let queryObj
  if (after) {
    if (after === "null") {
      queryObj = {
        size: limit,
      }
    } else {
      queryObj = {
        size: limit,
        after: [`${pubDate}`, q.Ref(q.Collection("jobs"), after)],
      }
    }
  } else {
    queryObj = {
      size: limit,
    }
  }
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("all_jobs_by_category_desc"), "Software Development"),
          queryObj
        ),
        // q.Lambda("jobResult", q.Get(q.Select([1], q.Var("jobResult"))))
        q.Lambda(["pub_date", "primary_category", "ref"], q.Get(q.Var("ref")))
      )
    )
    return JSON.stringify(dbs)
  } catch (e) {
    throw e.message
  }
}

const getLatestSoftwareDevJobs = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("all_jobs_by_category_desc"), "Software Development"),
          { size: 2 }
        ),
        q.Lambda(["pub_date", "primary_category", "ref"], q.Get(q.Var("ref")))
      )
    )
    return JSON.stringify({ data: dbs.data })
  } catch (e) {
    throw e.message
  }
}
export default getLatestSoftwareDevJobs
