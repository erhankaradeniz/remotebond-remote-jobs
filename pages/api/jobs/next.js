import { getPaginatedSoftwareDevJobs } from "../../../lib/softwareDevJobs"
import { getPaginatedJobsByTag } from "../../../lib/tag"

export default async (req, res) => {
  let nextPage, pubDate, tag
  if (req.query) {
    nextPage = req.query.key
    pubDate = req.query.d
    tag = req.query.tag
  }
  if (req.method === "GET") {
    let paginatedJobsFetch
    if (nextPage && pubDate) {
      if (tag) {
        paginatedJobsFetch = await getPaginatedJobsByTag(
          nextPage,
          pubDate,
          false,
          null,
          tag
        )
      } else {
        paginatedJobsFetch = await getPaginatedSoftwareDevJobs(
          nextPage,
          pubDate,
          false
        )
      }
    } else if (tag) {
      paginatedJobsFetch = await getPaginatedJobsByTag(
        null,
        null,
        null,
        null,
        tag
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
