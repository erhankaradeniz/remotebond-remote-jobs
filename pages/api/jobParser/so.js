import Parser from "rss-parser"

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
    let feed = await parser.parseURL(feedSource)
    for (let i = 0; i < 5; i++) {
      let itemTitle = feed.items[i].title

      const regex = /\s[-]\s.*/gm
      const regex2 = /\s(at)\s.*/gm
      const regex3 = /\s?[,]\s.*/gm
      let strippedTitle = itemTitle
        .replace(regex, "")
        .replace(regex2, "")
        .replace(regex3, "")

      console.log("Not Stripped Title: " + feed.items[i].title)
      console.log("StrippedTitle " + strippedTitle)
    }
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
