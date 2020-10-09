import faunadb from "faunadb"

import Slugify from "../../../helpers/slugify"
import generateUUID from "../../../helpers/uuid"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
  if (req.method === "POST") {
    // TODO : company_logo moet nog gedaan worden
    const {
      position,
      company_name,
      category,
      tags,
      location,
      show_company_logo,
      company_is_highlighted,
      minSalary,
      maxSalary,
      applyLink,
      company_email,
      company_website,
      company_twitter,
      description,
    } = req.body
    const randomDigit = Math.floor(100000 + Math.random() * 900000)
    const slug = Slugify(`${randomDigit} ${position} at ${company_name}`)

    await client.query(
      q.Create(q.Collection("jobs"), {
        data: {
          title: position,
          guid: generateUUID(),
          description: description,
          tags: tags.split(","),
          company_name: company_name,
          pub_date: new Date().toISOString(),
          location: location,
          apply_url: applyLink,
          slug: slug,
          primary_category: category,
          workingHours: "",
          isExternalSource: false,
        },
      })
    )
    console.log(`!!ADDED!!: ${position} at ${company_name}`)

    // Everything is Okay
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json({ Erhan: "Success" })
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
}
