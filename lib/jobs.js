import faunadb from "faunadb"

import createNewTags from "./tag"
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

function check(x) {
  return x.every((i) => typeof i === "string")
}

export const getAndUpdateAllJobs = async () => {
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
          { size: 6000 }
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      ),
      { queryTimeout: 1000 }
    )
    // We're going to update te records now.
    const jobsArr = dbs.data.map((x) => ({ ...x.data, _id: x.ref.id }))

    for (let i = 820; i < jobsArr.length; i++) {
      let tags = jobsArr[i].tags
      let isStringArr
      if (!jobsArr[i].tags_refs) {
        if (tags) {
          isStringArr = check(tags)
          if (isStringArr) {
            const tagsRefArr = await createNewTags(tags)
            const result = await client.query(
              q.Update(q.Ref(q.Collection("jobs"), jobsArr[i]._id), {
                data: { tags_refs: tagsRefArr },
              }),
              { queryTimeout: 1000 }
            )
            console.log(`#${i}: geupdate`)
          } else {
            console.log("Values are not string")
          }
        }
      }
    }
    return jobsArr
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
