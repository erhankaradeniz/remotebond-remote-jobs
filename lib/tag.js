import faunadb from "faunadb"

import Slugify from "../helpers/slugify"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getPaginatedJobsByTag = async (
  after,
  pubDate,
  loadPrev,
  limit,
  toFilterString
) => {
  limit = limit ? limit : 25
  let queryObj
  if (after) {
    if (loadPrev) {
      queryObj = {
        size: limit,
        before: [`${pubDate}`, q.Ref(q.Collection("jobs"), after)],
      }
    } else if (after === "null") {
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
          q.Match(q.Index("all_jobs_by_tag_desc"), toFilterString),
          queryObj
        ),
        q.Lambda(["pub_date", "ref"], q.Get(q.Var("ref")))
      )
    )
    return JSON.stringify(dbs)
  } catch (e) {
    throw e.message
  }
}

export const getAllTags = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // query index
          q.Documents(q.Collection("tags")), // specify source
          { size: 1000 }
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    )
    const refsArr = dbs.data.map((tag) => tag.data.slug)
    return refsArr
  } catch (e) {
    throw e.message
  }
}

const createNewTags = async (tagsArr) => {
  let tagsRefArr = []
  for (let i = 0; i < tagsArr.length; i++) {
    const tagSlug = Slugify(tagsArr[i])
    // XXX TODO: Fix size later, currently 3000 should be enough.
    const isDuplicate = await client.query(
      q.Paginate(q.Match(q.Index("all_tags_by_slug"), tagSlug), {
        size: 1,
      }),
      { queryTimeout: 1000 }
    )
    if (isDuplicate.data.length) {
      // Hier de ref ophalen van de tag die al bestaat
      tagsRefArr.push({
        name: tagsArr[i],
        slug: tagSlug,
        ref: [isDuplicate.data[0]],
      })
    } else {
      // Create new tag
      try {
        const dbs = await client.query(
          q.Create(q.Collection("tags"), {
            data: {
              name: tagsArr[i],
              slug: tagSlug,
            },
          }),
          { queryTimeout: 1000 }
        )
        tagsRefArr.push({ name: tagsArr[i], slug: tagSlug, ref: [dbs.ref] })
      } catch (e) {
        throw e.message
      }
    }
  }
  return tagsRefArr
}

export default createNewTags
