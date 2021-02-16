import Parser from "rss-parser"
import faunadb from "faunadb"

import Slugify from "../../../helpers/slugify"
import createNewCompany from "../../../lib/company"
import createNewTags from "../../../lib/tag"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

let parser = new Parser({
  customFields: {
    item: [["a10:author", "author"], "location"],
  },
})
const feedSource = "https://stackoverflow.com/jobs/feed?r=true"

export default async (req, res) => {
  if (
    req.method === "GET"
    // && req.headers.authorization === "Basic YXV0aDo5VjhMcSpWcjBONVM="
  ) {
    // Some regex to strip the weird titles on SO
    const regex = /\s[-]\s.*/gm // everything after -
    const regex2 = /\s(at)\s.*/gm // everything after "at"
    const regex3 = /\s?[,]\s.*/gm // everything after a ,
    const regex4 = /\s[^\w\s].*/gm // everything after a non alphanumeric character, hard check

    let feed = await parser.parseURL(feedSource)
    const dayAgo = new Date(Date.now() - 86400000)

    for (let i = 0; i < feed.items.length; i++) {
      let listingDate = new Date(feed.items[i].isoDate)
      let isWithinDay = listingDate > dayAgo

      // Check for pubDate, don't include listings older than a week.
      if (!!isWithinDay) {
        const randomDigit = Math.floor(100000 + Math.random() * 900000)

        const title = feed.items[i].title
          .replace(regex, "")
          .replace(regex2, "")
          .replace(regex3, "")
          .replace(regex4, "")
        const guid = feed.items[i].guid
        const description = feed.items[i].content
        const tags = feed.items[i].categories
        const companyName = Object.values(feed.items[i].author)[0][0]
        const pubDate = feed.items[i].isoDate
        const location = feed.items[i].location
        const applyUrl = feed.items[i].link
        const slug = Slugify(`${randomDigit} ${title} at ${companyName}`)
        const primaryCategory = "Software Development"
        const workingHours = ""
        const isExternalSource = true

        const isDuplicate = await client.query(
          q.Paginate(q.Match(q.Index("all_jobs_by_guid"), guid))
        )

        // Write to db
        if (!isDuplicate.data.length) {
          const companyRef = await createNewCompany(companyName)
          const tagsRefsArr = await createNewTags(feed.items[i].categories)
          await client.query(
            q.Create(q.Collection("jobs"), {
              data: {
                title: title,
                guid: guid,
                description: description,
                tags: tags,
                tags_refs: tagsRefsArr,
                company_name: companyName,
                company_ref: companyRef.ref,
                pub_date: pubDate,
                location: location,
                apply_url: applyUrl,
                slug: slug,
                primary_category: primaryCategory,
                working_hours: workingHours,
                isExternalSource: isExternalSource,
              },
            })
          )
          console.log(`#${i} !!ADDED!!: ${title} at ${companyName}`)
        } else {
          console.log(
            `#${i} !!SKIPPING!!: ${title} at ${companyName} is already in DB`
          )
        }
      }
    }

    console.log("All done.")
    // Everything is Okay
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ status: "OK" }))
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
}

/*
 * Query to create a new index with a search field
 */

// CreateIndex({
//   name: "all_jobs_by_category_desc",
//   source: Collection("jobs"),
//   terms: [
//     { field: ["data", "primary_category"] }
//   ],
//   values: [{ field: ["data", "pub_date"], reverse: true }, { field: ["data", "primary_category"] }, { field: ["ref"] }],
// })

/*
 * Query for fetching data by category
 */

// Map(Paginate(Match(Index("all_software_dev_jobs_desc"), "Software Development")), Lambda(["pub_date", "primary_category", "ref"], Get(Var("ref"))))

/*
 * Delete all documents from a collection
 */
// Map(Paginate(Match(Index("all_jobs"))), Lambda("X", Delete(Var("X"))))

/*
 * Delete all document from a collection by Category
 */
// Map(Paginate(Match(Index("all_jobs_by_category_desc"), "Customer Support")),Lambda(["pub_date", "primary_category", "ref"], Delete(Var("ref"))))
