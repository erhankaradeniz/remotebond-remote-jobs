import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getPaginatedCustomerSupportJobs = async (
  after,
  pubDate,
  loadPrev,
  limit
) => {
  limit = limit ? limit : 25
  let queryObj
  if (after) {
    if (loadPrev) {
      queryObj = {
        size: limit,
        before: [
          `${pubDate}`,
          "Customer Support",
          q.Ref(q.Collection("jobs"), after),
        ],
      }
    } else if (after === "null") {
      queryObj = {
        size: limit,
      }
    } else {
      queryObj = {
        size: limit,
        after: [
          `${pubDate}`,
          "Customer Support",
          q.Ref(q.Collection("jobs"), after),
        ],
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
          q.Match(q.Index("all_jobs_by_category_desc"), "Customer Support"),
          queryObj
        ),
        q.Lambda(["pub_date", "primary_category", "ref"], q.Get(q.Var("ref")))
      )
    )
    return JSON.stringify(dbs)
  } catch (e) {
    throw e.message
  }
}

const getLatestCustomerSupportJobs = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("all_jobs_by_category_desc"), "Customer Support"),
          { size: 5 }
        ),
        q.Lambda(["pub_date", "primary_category", "ref"], q.Get(q.Var("ref")))
      )
    )
    return JSON.stringify({ data: dbs.data })
  } catch (e) {
    throw e.message
  }
}
export default getLatestCustomerSupportJobs
