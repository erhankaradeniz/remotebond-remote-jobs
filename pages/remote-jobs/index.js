import React from "react"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"
import Link from "next/link"

import JobsList from "../../components/JobsList"
import FilterBar from "../../components/FilterBar"

import getAllCategories from "../../lib/categories"
import getLatestSoftwareDevJobs from "../../lib/softwareDevJobs"
import getLatestCustomerSupportJobs from "../../lib/customerSupportJobs"
import getLatestSalesMarketingJobs from "../../lib/salesMarketingJobs"
import getLatestDesignJobs from "../../lib/designJobs"
import getLatestNonTechJobs from "../../lib/nonTechJobs"

export async function getStaticProps(ctx) {
  const categories = await getAllCategories()
  const softwareDevJobs = await getLatestSoftwareDevJobs()
  const customerSupportJobs = await getLatestCustomerSupportJobs()
  const salesMarketingJobs = await getLatestSalesMarketingJobs()
  const designJobs = await getLatestDesignJobs()
  const nonTechJobs = await getLatestNonTechJobs()
  const categoriesData = JSON.parse(categories)
  let softwareDevJobsData = JSON.parse(softwareDevJobs)
  let customerSupportJobsData = JSON.parse(customerSupportJobs)
  let salesMarketingJobsData = JSON.parse(salesMarketingJobs)
  let designJobsData = JSON.parse(designJobs)
  let nonTechJobsData = JSON.parse(nonTechJobs)
  return {
    props: {
      categories: categoriesData,
      softwareDevJobs: softwareDevJobsData,
      customerSupportJobs: customerSupportJobsData,
      salesMarketingJobs: salesMarketingJobsData,
      designJobs: designJobsData,
      nonTechJobs: nonTechJobsData,
    },
    revalidate: 1,
  }
}

const RemoteDesignJobs = (props) => {
  const categories = props.categories.data
  const softwareDevJobs = props.softwareDevJobs.data
  const customerSupportJobs = props.customerSupportJobs.data
  const salesMarketingJobs = props.salesMarketingJobs.data
  const designJobs = props.designJobs.data
  const nonTechJobs = props.nonTechJobs.data
  let date = new Date()
  let dateOptions = {
    year: "numeric",
    month: "long",
  }
  return (
    <>
      <NextSeo
        title={`Remote Software Development, Marketing, Design and more jobs`}
        description={`The latest and most popular remote jobs around the web. Jobs included from top remote companies. Find your new remote career on Remotebond.`}
        canonical={`https://remotebond.com/remote-jobs`}
        openGraph={{
          url: `https://remotebond.com/remote-jobs`,
          title: `Remote Software Development, Marketing, Design and more jobs`,
          description: `The latest and most popular remote jobs around the web. Jobs included from top remote companies. Find your new remote career on Remotebond.`,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "remotebond.com",
            item: "https://remotebond.com",
          },
          {
            position: 2,
            name: "Remote Jobs",
          },
        ]}
      />
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
          <h1 className="text-white font-black text-2xl md:text-4xl my-4">
            Remote Jobs
          </h1>
          <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
            Browse Remote Jobs for Software Development, Sales & Marketing,
            Design, Customer Support and more in{" "}
            {date.toLocaleDateString("en-EN", dateOptions)}
          </h2>
          <span className="inline-flex rounded-md shadow-sm mt-8">
            <Link href={`/hire-remotely`} as={`/hire-remotely`}>
              <a
                title="Hire remotely with Remotebond"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150"
              >
                Post a job for $25
              </a>
            </Link>
          </span>
        </div>
      </div>

      {/* Filters  */}
      <FilterBar categories={categories} />

      {/* Posting group */}
      <JobsList
        title="Software Development"
        slug="remote-dev-jobs"
        jobs={softwareDevJobs}
      />
      <JobsList
        title="Customer Support"
        slug="remote-customer-support-jobs"
        jobs={customerSupportJobs}
      />
      <JobsList
        title="Sales & Marketing"
        slug="remote-sales-marketing-jobs"
        jobs={salesMarketingJobs}
      />
      <JobsList title="Design" slug="remote-design-jobs" jobs={designJobs} />
      <JobsList
        title="Non Tech"
        slug="remote-non-tech-jobs"
        jobs={nonTechJobs}
      />
    </>
  )
}

export default RemoteDesignJobs
