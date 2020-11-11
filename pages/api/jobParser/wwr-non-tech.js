import Parser from "rss-parser"
import cheerio from "cheerio"
import faunadb from "faunadb"

import Slugify from "../../../helpers/slugify"
import createNewCompany from "../../../lib/company"
import createNewTags from "../../../lib/tag"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

let parser = new Parser({
  customFields: {
    item: ["region"],
  },
})

const feedSource =
  "https://weworkremotely.com/categories/remote-product-jobs.rss"

export default async (req, res) => {
  if (
    req.method === "GET"
    // && req.headers.authorization === "Basic YXV0aDo5VjhMcSpWcjBONVM="
  ) {
    // // Some regex to strip the weird titles on SO
    const regex = /\s[-]\s.*/gm // everything after -
    // const regex2 = /\s(at)\s.*/gm // everything after "at"
    // const regex3 = /\s?[,]\s.*/gm // everything after a ,
    // const regex4 = /\s[^\w\s].*/gm // everything after a non alphanumeric character, hard check
    const regex5 = /^(.*?:)\s/gm // everything before :
    const regex6 = /\s(for)\s.*/gm // everything after "at"

    // For getting the company name out of the title
    const regex7 = /.[^:]*$/gm // everything before :

    let feed = await parser.parseURL(feedSource)
    const weekAgo = new Date(Date.now() - 604800000)
    for (let i = 0; i < feed.items.length; i++) {
      let listingDate = new Date(feed.items[i].pubDate)
      let isWithinWeek = listingDate > weekAgo
      //   // Check for pubDate, don't include listings older than a week.
      if (!!isWithinWeek) {
        const $ = cheerio.load(feed.items[i].content, { xmlMode: true })

        // Cleanup wwr stuff
        $("img").remove()
        $("p:first-of-type").remove()
        $("p:last-of-type").remove()
        $("a").removeAttr("href")

        const randomDigit = Math.floor(100000 + Math.random() * 900000)
        const pub_date = new Date(feed.items[i].pubDate)
        const title = feed.items[i].title
          .replace(regex, "")
          // .replace(regex2, "")
          // .replace(regex3, "")
          // .replace(regex4, "")
          .replace(regex5, "")
          .replace(regex6, "")
        const guid = feed.items[i].guid
        const description = $.html().trim()
        const tags = feed.items[i].categories
        const companyName = feed.items[i].title.replace(regex7, "")
        const pubDate = pub_date.toISOString()
        const location = ""
        const applyUrl = feed.items[i].link
        const slug = Slugify(`${randomDigit} ${title} at ${companyName}`)
        const primaryCategory = "Non tech"
        const workingHours = ""
        const isExternalSource = true

        const isDuplicate = await client.query(
          q.Paginate(q.Match(q.Index("all_jobs_by_guid"), guid))
        )

        //     // Write to db
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
