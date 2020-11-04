import faunadb from "faunadb"

import Slugify from "../helpers/slugify"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

const createNewCompany = async (company) => {
  const companySlug = Slugify(company)
  const isDuplicate = await client.query(
    q.Paginate(q.Match(q.Index("all_companies_by_slug"), companySlug))
  )
  if (!isDuplicate.data.length) {
    try {
      const dbs = await client.query(
        q.Create(q.Collection("companies"), {
          data: {
            name: company,
            slug: companySlug,
            url: "",
            bio: "",
          },
        })
      )
      return { ref: dbs.ref }
    } catch (e) {
      throw e.message
    }
  } else {
    return { ref: isDuplicate.data[0] }
  }
}

export default createNewCompany
