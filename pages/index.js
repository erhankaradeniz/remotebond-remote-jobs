import React from "react"

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
  const softwareDevJobsData = JSON.parse(softwareDevJobs)
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
      <div className="relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto text-center py-28 px-4 sm:px-6">
          <svg
            className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
          >
            <defs>
              <pattern
                id="svg-pattern-squares-1"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="404"
              fill="url(#svg-pattern-squares-1)"
            ></rect>
          </svg>
          <svg
            className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
          >
            <defs>
              <pattern
                id="svg-pattern-squares-1"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="404"
              fill="url(#svg-pattern-squares-1)"
            ></rect>
          </svg>
          <h3 className="uppercase tracking-wider font-semibold text-blue-500">
            Remote jobs
          </h3>
          <h1 className="font-black text-6xl leading-45 my-4">
            Start working remotely and join the future of work
          </h1>
          <h2 className="text-xl text-gray-700 w-3/4 mx-auto">
            Do you want to access talent{" "}
            <u className="text-blue-500">everywhere</u>, or just in specific
            markets? If the answer is everywhere, look no further and let
            Remotebond help you.
          </h2>
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
