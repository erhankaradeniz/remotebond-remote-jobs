import faunadb from "faunadb"

import Slugify from "../helpers/slugify"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export const getAllCompanies = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(q.Documents(q.Collection("companies")), { size: 1000 }),
        q.Lambda(
          "company_ref",
          q.Let(
            {
              company: q.Get(q.Var("company_ref")),
              job_refs: q.Match(
                q.Index("all_jobs_by_company"),
                q.Var("company_ref")
              ),
              jobs: q.Map(
                q.Paginate(q.Var("job_refs")),
                q.Lambda(["ref"], q.Get(q.Var("ref")))
              ),
            },
            // Return actual data of topic including author
            {
              company: q.Var("company"),
              job_refs: q.Var("job_refs"),
              jobs: q.Var("jobs"),
            }
          )
        )
      )
    )
    return JSON.stringify({ data: dbs.data })
  } catch (e) {
    throw e.message
  }
}

export const getAllCompaniesOnly = async () => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(q.Documents(q.Collection("companies"))),
        q.Lambda(
          "company_ref",
          q.Let(
            {
              company: q.Get(q.Var("company_ref")),
            },
            // Return actual data of topic including author
            {
              company: q.Var("company"),
            }
          )
        )
      )
    )
    return dbs.data
  } catch (e) {
    throw e.message
  }
}

export const getCompanyBySlug = async (slug) => {
  try {
    const dbs = await client.query(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_companies_by_slug"),
            slug // specify source
          )
        ),
        q.Lambda(
          "company_ref",
          q.Let(
            {
              company: q.Get(q.Var("company_ref")),
              job_refs: q.Match(
                q.Index("all_jobs_by_company"),
                q.Var("company_ref")
              ),
              jobs: q.Map(
                q.Paginate(q.Var("job_refs")),
                q.Lambda(["ref"], q.Get(q.Var("ref")))
              ),
            },
            // Return actual data of topic including author
            {
              company: q.Var("company"),
              job_refs: q.Var("job_refs"),
              jobs: q.Var("jobs"),
            }
          )
        )
      )
    )
    return JSON.stringify(...dbs.data)
  } catch (e) {
    throw e.message
  }
}

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
