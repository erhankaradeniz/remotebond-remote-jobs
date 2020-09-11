var request = require("request")
var { google } = require("googleapis")
let jwtClient

if (process.env.NODE_ENV === "production") {
  jwtClient = new google.auth.JWT(
    process.env.GOOGLE_INDEX_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_INDEX_PRIVATE_KEY,
    ["https://www.googleapis.com/auth/indexing"],
    null
  )
}

export default async (req, res) => {
  if (req.method === "POST") {
    console.log(`Posting to google index api`)
    console.log("All done.")
    // Everything is Okay
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ status: "OK" }))
  } else {
    console.log(`Method not allowed`)
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
}
