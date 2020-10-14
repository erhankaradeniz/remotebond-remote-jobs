import React from "react"

import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"
// import SearchBar from "../components/SearchBar"
import Hero from "../components/Hero"

// import url from "../helpers/url"
import getAllCategories from "../lib/categories"
import getLatestSoftwareDevJobs from "../lib/softwareDevJobs"
import getLatestCustomerSupportJobs from "../lib/customerSupportJobs"
import getLatestSalesMarketingJobs from "../lib/salesMarketingJobs"

export async function getStaticProps(ctx) {
  const categories = await getAllCategories()
  const softwareDevJobs = await getLatestSoftwareDevJobs()
  const customerSupportJobs = await getLatestCustomerSupportJobs()
  const salesMarketingJobs = await getLatestSalesMarketingJobs()
  const categoriesData = JSON.parse(categories)
  let softwareDevJobsData = JSON.parse(softwareDevJobs)
  let customerSupportJobsData = JSON.parse(customerSupportJobs)
  let salesMarketingJobsData = JSON.parse(salesMarketingJobs)
  return {
    props: {
      categories: categoriesData,
      softwareDevJobs: softwareDevJobsData,
      customerSupportJobs: customerSupportJobsData,
      salesMarketingJobs: salesMarketingJobsData,
    },
    revalidate: 1,
  }
}

const IndexPage = (props) => {
  const categories = props.categories.data
  const softwareDevJobs = props.softwareDevJobs.data
  const customerSupportJobs = props.customerSupportJobs.data
  const salesMarketingJobs = props.salesMarketingJobs.data
  return (
    <>
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
    </>
  )
}

export default IndexPage
