import faunadb from "faunadb"
import formidable from "formidable-serverless"
import { v2 as cloudinary } from "cloudinary"

// Helpers
import Slugify from "../../../helpers/slugify"
import generateUUID from "../../../helpers/uuid"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

cloudinary.config({
  cloud_name: process.env.CL_CLOUD_NAME,
  api_key: process.env.CL_API_KEY,
  api_secret: process.env.CL_SECRET_KEY,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  if (req.method === "POST") {
    const data = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true })
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    })
    let imagePath = null
    // No image upload needed
    if (
      Object.keys(data.files).length === 0 &&
      data.files.constructor === Object &&
      data.fields.show_company_logo === "false"
    ) {
      console.log("test")
    } else {
      // Image flag is set, we need to upload an image
      imagePath = data.files.company_logo.path
      // Upload actual image
      const image = await cloudinary.uploader.upload(imagePath, {
        width: 512,
        height: 512,
        crop: "fill",
      })
      console.log("test #2")
    }

    console.log("dit is data")
    console.log(data)
    console.log(data.files)
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
    } = data.fields

    // const randomDigit = Math.floor(100000 + Math.random() * 900000)
    // const slug = Slugify(`${randomDigit} ${position} at ${company_name}`)

    // await client.query(
    //   q.Create(q.Collection("jobs"), {
    //     data: {
    //       title: position,
    //       guid: generateUUID(),
    //       description: description,
    //       tags: tags.split(","),
    //       company_name: company_name,
    //       pub_date: new Date().toISOString(),
    //       location: location,
    //       apply_url: applyLink,
    //       slug: slug,
    //       primary_category: category,
    //       workingHours: "",
    //       isExternalSource: false,
    //     },
    //   })
    // )
    // console.log(`!!ADDED!!: ${position} at ${company_name}`)
    console.log("done")

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
