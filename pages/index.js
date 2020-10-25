import React from "react"
import { NextSeo } from "next-seo"

import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"
// import SearchBar from "../components/SearchBar"
import Hero from "../components/Hero"

// import url from "../helpers/url"
import getAllCategories from "../lib/categories"
import getLatestSoftwareDevJobs from "../lib/softwareDevJobs"
import getLatestCustomerSupportJobs from "../lib/customerSupportJobs"
import getLatestSalesMarketingJobs from "../lib/salesMarketingJobs"
import getLatestDesignJobs from "../lib/designJobs"
import getLatestNonTechJobs from "../lib/nonTechJobs"
import SubscribeEmailForm from "../components/SubscribeEmailForm"

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

const IndexPage = (props) => {
  const categories = props.categories.data
  const softwareDevJobs = props.softwareDevJobs.data
  const customerSupportJobs = props.customerSupportJobs.data
  const salesMarketingJobs = props.salesMarketingJobs.data
  const designJobs = props.designJobs.data
  const nonTechJobs = props.nonTechJobs.data

  return (
    <>
      <NextSeo canonical={`https://remotebond.com`} />
      {/* Hero Section */}
      <Hero />

      {/* Filters  */}
      <FilterBar categories={categories} />

      {/* Posting group */}
      <JobsList
        title="Software Development"
        slug="remote-dev-jobs"
        jobs={softwareDevJobs}
      />

      <SubscribeEmailForm />

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

export default IndexPage
