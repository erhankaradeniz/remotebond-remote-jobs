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
    console.log(feed)
  }
}
