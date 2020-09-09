import React from "react"
import Link from "next/link"

import Header from "../components/Header"
import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"

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
    <div>
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto text-center py-12 md:py-28 px-4 sm:px-6">
          <h3 className="uppercase tracking-wider font-semibold text-blue-500">
            Remote jobs
          </h3>
          <h1 className="text-white font-black text-2xl md:text-6xl md:leading-45 my-4">
            Start working remotely and join the future of work
          </h1>
          <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
            Do you want to access talent{" "}
            <u className="text-blue-500">everywhere</u>, or just in specific
            markets? If the answer is everywhere, look no further and let
            Remotebond help you.
          </h2>
          <span class="inline-flex rounded-md shadow-sm mt-8">
            <Link href={`/remote-jobs/new`} as={`/remote-jobs/new`}>
              <a class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
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
      {/* <JobsList title="Customer Support" slug="remote-customer-support-jobs" /> */}
    </div>
  )
}

export default IndexPage
