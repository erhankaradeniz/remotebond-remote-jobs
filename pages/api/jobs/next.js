import { getPaginatedSoftwareDevJobs } from "../../../lib/softwareDevJobs"

export default async (req, res) => {
  let nextPage, pubDate
  if (req.query) {
    nextPage = req.query.key
    pubDate = req.query.d
  }
  if (req.method === "GET") {
    let paginatedJobsFetch
    if (nextPage && pubDate) {
      paginatedJobsFetch = await getPaginatedSoftwareDevJobs(
        nextPage,
        pubDate,
        false
      )
    } else {
      paginatedJobsFetch = await getPaginatedSoftwareDevJobs()
    }
    // const paginatedJobs = JSON.parse(paginatedJobsFetch)
    console.log("All done.")
    // Everything is Okay
    // res.status(200).json(paginatedJobsFetch.data)
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.json(paginatedJobsFetch)
  } else {
    console.log(`Method not allowed`)
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
}
