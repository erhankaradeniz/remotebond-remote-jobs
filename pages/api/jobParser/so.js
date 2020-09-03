import Parser from "rss-parser"

let parser = new Parser({
  customFields: {
    item: [["a10:author", "author"], "location"],
  },
})
const feedSource = "https://stackoverflow.com/jobs/feed?r=true"

export default async (req, res) => {
  if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    let feed = await parser.parseURL(feedSource)
    for (let i = 0; i < 25; i++) {
      console.log(feed.items[i].title + ":" + feed.items[i].link)
    }
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ status: "OK" }))
  }
}
