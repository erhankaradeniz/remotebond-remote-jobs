import React from "react"

import getAllJobs from "../lib/jobs"
import { getAllCompaniesOnly } from "../lib/company"

const createSitemap = (
  jobs,
  companies
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`https://remotebond.com`}</loc>
            <changefreq>hourly</changefreq>
            <priority>1.0</priority>
        </url>
        <url>
            <loc>${`https://remotebond.com/hire-remotely`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/remote-jobs`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/remote-companies`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/register`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/frequently-asked-questions`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
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
        <url>
            <loc>${`https://remotebond.com/remote-design-jobs`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        <url>
            <loc>${`https://remotebond.com/remote-non-tech-jobs`}</loc>
            <changefreq>hourly</changefreq>
            <priority>0.9</priority>
            <lastmod>${new Date().toISOString()}</lastmod>
        </url>
        ${
          jobs.length &&
          jobs
            .map((job) => {
              return `
                    <url>
                        <loc>${`https://remotebond.com/remote-jobs/${job.data.slug}`}</loc>
                        <changefreq>hourly</changefreq>
                        <priority>0.9</priority>
                        <lastmod>${new Date().toISOString()}</lastmod>
                    </url>
                `
            })
            .join("")
        }
        ${
          companies.length &&
          companies
            .map((company) => {
              const {
                company: { data: companyData },
              } = company
              return `
                    <url>
                        <loc>${`https://remotebond.com/remote-companies/${companyData.slug}`}</loc>
                        <changefreq>hourly</changefreq>
                        <priority>0.9</priority>
                        <lastmod>${new Date().toISOString()}</lastmod>
                    </url>
                `
            })
            .join("")
        }
    </urlset>
    `

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const jobs = await getAllJobs()
    const companies = await getAllCompaniesOnly()
    res.setHeader("Content-Type", "text/xml")
    res.write(createSitemap(jobs, companies))
    res.end()
  }
}

export default Sitemap
