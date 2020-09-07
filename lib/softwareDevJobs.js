import faunadb from "faunadb"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

const getLatestSoftwareDevJobs = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index("all_jobs_by_category_desc"), "Software Development"),
          { size: 10 }
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
