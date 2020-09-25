import React from "react"

import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"
import Hero from "../components/Hero"

// import url from "../helpers/url"
import getAllCategories from "../lib/categories"
import getLatestSoftwareDevJobs from "../lib/softwareDevJobs"
import getLatestCustomerSupportJobs from "../lib/customerSupportJobs"

export async function getStaticProps(ctx) {
  const categories = await getAllCategories()
  const softwareDevJobs = await getLatestSoftwareDevJobs()
  const customerSupportJobs = await getLatestCustomerSupportJobs()
  const categoriesData = JSON.parse(categories)
  let softwareDevJobsData = JSON.parse(softwareDevJobs)
  let customerSupportJobsData = JSON.parse(customerSupportJobs)
  return {
    props: {
      categories: categoriesData,
      softwareDevJobs: softwareDevJobsData,
      customerSupportJobs: customerSupportJobsData,
    },
  }
}

const IndexPage = (props) => {
  const categories = props.categories.data
  const softwareDevJobs = props.softwareDevJobs.data
  const customerSupportJobs = props.customerSupportJobs.data
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
    </>
  )
}

export default IndexPage
