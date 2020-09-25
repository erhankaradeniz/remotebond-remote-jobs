import React from "react"

import getAllJobs from "../lib/jobs"

const createSitemap = (jobs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`https://remotebond.com`}</loc>
            <changefreq>hourly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>${`https://remotebond.com/remote-dev-jobs`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/remote-customer-support-jobs`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/remote-sales-marketing-jobs`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        ${jobs
          .map((job) => {
            return `
                    <item>
                        <loc>${`https://remotebond.com/remote-jobs/${job.data.slug}`}</loc>
                        <changefreq>hourly</changefreq>
                        <priority>0.9</priority>
                        <lastmod>${new Date().toISOString()}</lastmod>
                    </item>
                `
          })
          .join("")}
    </urlset>
    `

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const jobs = await getAllJobs()

    res.setHeader("Content-Type", "text/xml")
    res.write(createSitemap(jobs))
    res.end()
  }
}

export default Sitemap