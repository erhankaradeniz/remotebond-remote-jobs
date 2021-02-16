import faunadb from "faunadb"
import formidable from "formidable-serverless"
import { v2 as cloudinary } from "cloudinary"
import UIDGenerator from "uid-generator"

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
    const { position, company_name } = data.fields
    const randomDigit = Math.floor(100000 + Math.random() * 900000)
    const slug = Slugify(`${randomDigit} ${position} at ${company_name}`)
    const uidgen = new UIDGenerator(512, UIDGenerator.BASE62)
    const token = uidgen.generateSync()

    // No image upload needed
    if (
      Object.keys(data.files).length === 0 &&
      data.files.constructor === Object &&
      data.fields.show_company_logo === "false"
    ) {
      const {
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
      const jobDocument = await client.query(
        q.Create(q.Collection("jobs"), {
          data: {
            title: position,
            guid: generateUUID(),
            description: description,
            tags: tags.split(","),
            pub_date: new Date().toISOString(),
            location: location,
            apply_url: applyLink,
            slug: slug,
            primary_category: category,
            working_hours: "",
            min_salary: minSalary,
            max_salary: maxSalary,
            company_name: company_name,
            company_logo_url: "",
            company_email: company_email,
            company_website: company_website,
            company_twitter: company_twitter,
            show_company_logo: show_company_logo === "true" ? true : false,
            company_is_highlighted:
              company_is_highlighted === "true" ? true : false,
            isExternalSource: false,
            token: token,
          },
        })
      )

      console.log(`!!ADDED!!: ${position} at ${company_name}`)
    } else {
      // Image flag is set, we need to upload an image
      imagePath = data.files.company_logo.path
      const {
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
      // Upload actual image
      const image = await cloudinary.uploader.upload(imagePath, {
        width: 512,
        height: 512,
        crop: "fill",
      })

      await client.query(
        q.Create(q.Collection("jobs"), {
          data: {
            title: position,
            guid: generateUUID(),
            description: description,
            tags: tags.split(","),
            pub_date: new Date().toISOString(),
            location: location,
            apply_url: applyLink,
            slug: slug,
            primary_category: category,
            working_hours: "",
            min_salary: minSalary,
            max_salary: maxSalary,
            company_name: company_name,
            company_logo_url: image.secure_url,
            company_email: company_email,
            company_website: company_website,
            company_twitter: company_twitter,
            show_company_logo: show_company_logo === "true" ? true : false,
            company_is_highlighted:
              company_is_highlighted === "true" ? true : false,
            isExternalSource: false,
            token: token,
          },
        })
      )
      console.log(`!!ADDED with Logo!!: ${position} at ${company_name}`)
    }

    // Everything is Okay
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json({ status: "Success" })
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
}
