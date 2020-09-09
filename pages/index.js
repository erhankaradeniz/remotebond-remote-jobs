import React from "react"

import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"
import Hero from "../components/Hero"

// import url from "../helpers/url"
import getAllCategories from "../lib/categories"
import getLatestSoftwareDevJobs from "../lib/softwareDevJobs"

export async function getStaticProps(ctx) {
  const categories = await getAllCategories()
  const softwareDevJobs = await getLatestSoftwareDevJobs()
  const categoriesData = JSON.parse(categories)
  let softwareDevJobsData = JSON.parse(softwareDevJobs)
  return {
    props: {
      categories: categoriesData,
      softwareDevJobs: softwareDevJobsData,
    },
  }
}

const IndexPage = (props) => {
  const categories = props.categories.data
  const softwareDevJobs = props.softwareDevJobs.data
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
      {/* <JobsList title="Customer Support" slug="remote-customer-support-jobs" /> */}
    </>
  )
}

export default IndexPage
