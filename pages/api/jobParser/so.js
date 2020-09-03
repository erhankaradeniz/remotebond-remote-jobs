import Parser from "rss-parser"

let parser = new Parser({
  customFields: {
    item: [["a10:author", "author"], "location"],
  },
})
const feedSource = "https://stackoverflow.com/jobs/feed?r=true"

export default async (req, res) => {
  if (req.method === "GET") {
    console.log(req)
    let feed = await parser.parseURL(feedSource)
    for (let i = 0; i < 25; i++) {
      console.log(feed.items[i].title + ":" + feed.items[i].link)
    }
    // Everything is Okay
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ status: "OK" }))
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
