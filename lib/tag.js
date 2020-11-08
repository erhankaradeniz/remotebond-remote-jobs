import faunadb from "faunadb"

import Slugify from "../helpers/slugify"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

const createNewTags = async (tagsArr) => {
  let tagsRefArr = []
  for (let i = 0; i < tagsArr.length; i++) {
    const tagSlug = Slugify(tagsArr[i])
    // XXX TODO: Fix size later, currently 3000 should be enough.
    const isDuplicate = await client.query(
      q.Paginate(q.Match(q.Index("all_tags_by_slug"), tagSlug), {
        size: 3000,
      })
    )
    if (isDuplicate.data.length) {
      // Hier de ref ophalen van de tag die al bestaat
      tagsRefArr.push(isDuplicate.data[0])
    } else {
      // Create new tag
      try {
        const dbs = await client.query(
          q.Create(q.Collection("tags"), {
            data: {
              name: tagsArr[i],
              slug: tagSlug,
            },
          })
        )
        tagsRefArr.push(dbs.ref)
      } catch (e) {
        throw e.message
      }
    }
  }
  return tagsRefArr
}

export default createNewTags
