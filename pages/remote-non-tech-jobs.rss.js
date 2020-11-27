import React from "react"

import { getPaginatedNonTechJobs } from "../lib/nonTechJobs"

const htmlencode = (str) => {
  return str.replace(/[&<>"']/g, function ($0) {
    return (
      "&" +
      { "&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "#39" }[$0] +
      ";"
    )
  })
}

const createRssFeed = (jobs) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <channel>
          <title><![CDATA[Remotebond: Remote Software Development jobs]]></title>
          <link>https://remotebond.com/remote-dev-jobs.rss</link>
          <description>
            <![CDATA[Remotebond: Remote Software Development jobs]]>
          </description>
          <language>en</language>
        ${
          jobs.length &&
          jobs
            .map((job) => {
              return `
                    <item>
            <title><![CDATA[${job.data.title}]]></title>
            <link>https://remotebond.com/remote-jobs/${job.data.slug}</link>
            <pubDate>${job.data.pub_date}</pubDate>
            <guid>https://remotebond.com/remote-jobs/${job.data.slug}</guid>
            <location>${
              job.data.location ? job.data.location : "Remote"
            }</location>
            <description>
            <![CDATA[${htmlencode(job.data.description)}]]>
            </description>
        </item>
                `
            })
            .join("")
        }
        </channel>
    </rss>
    `
}

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const paginatedJobsFetch = await getPaginatedNonTechJobs("null")
    const paginatedJobs = JSON.parse(paginatedJobsFetch)

    res.setHeader("Content-Type", "text/xml")
    res.write(createRssFeed(paginatedJobs.data))
    res.end()
  }
}

export default Sitemap
