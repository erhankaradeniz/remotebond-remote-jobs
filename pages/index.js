import React from "react"

import Header from "../components/Header"
import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"

// import url from "../helpers/url"
import getAllCategories from "../lib/categories"
export async function getStaticProps(ctx) {
  const categories = await getAllCategories()
  const data = JSON.parse(categories)
  return {
    props: {
      categories: data,
    },
  }
}

const indexPage = (props) => {
  const categories = props.categories.data

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto text-center py-28">
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
          <h4 className="uppercase tracking-wider font-semibold text-blue-500">
            Remote jobs
          </h4>
          <h2 className="font-black text-6xl leading-45 my-4">
            Help shape the future by working remotely
          </h2>
          <p className="text-xl text-gray-700 w-3/4 mx-auto">
            RemoteBond helps streamline software projects, sprints, tasks, and
            bug tracking. It's built for high-performance teams.
          </p>
        </div>
      </div>
      {/* Filters  */}
      <FilterBar categories={categories} />

      {/* Posting group */}
      <JobsList title="Software Development" slug="remote-dev-jobs" />
      <JobsList title="Customer Support" slug="remote-customer-support-jobs" />
    </div>
  )
}

export default indexPage
