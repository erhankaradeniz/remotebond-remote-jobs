import React from "react"
import Link from "next/link"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import { searchJobsByTitle } from "../../lib/searchJobs"

import JobsList from "../../components/JobsList"

export async function getServerSideProps(ctx) {
  const { query } = ctx.query
  const jobsQuery = await searchJobsByTitle(query)
  const jobs = JSON.parse(jobsQuery)
  if (!jobs.data) {
    return {
      props: {
        result: [],
        q: query,
      },
    }
  } else {
    return {
      props: {
        result: jobs,
        q: query,
      },
    }
  }
}

const SearchJobPage = ({ result, q }) => {
  const {
    data: { data },
  } = result

  return (
    <>
      <NextSeo
        title={`Remote ${q} jobs`}
        description={`The latest and most popular remote ${q} jobs around the web. Jobs included from top remote companies. Find your new ${q} career on Remotebond.`}
        canonical={`https://remotebond.com/search/${q}`}
        openGraph={{
          url: `https://remotebond.com/search/${q}`,
          title: `Remote ${q} jobs`,
          description: `The latest and most popular remote ${q} jobs around the web. Jobs included from top remote companies. Find your new ${q} career on Remotebond.`,
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
            name: `Remote ${q} jobs`,
          },
        ]}
      />
      <div
        className={`relative overflow-hidden bg-black ${
          !data.length > 0
            ? "flex-1 items-center justify-center flex flex-row"
            : "mb-12"
        }`}
      >
        <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
          {!data.length && (
            <div className="w-full max-w-screen-xl mx-auto flex justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-24 h-24 md:w-48 md:h-48 mb-4 text-blue-500 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-white text-xl font-bold md:text-3xl">
                Your search resulted in no results
              </h3>
              <p className="text-white text-sm md:text-base">
                Try searching with a different search query.
              </p>
            </div>
          )}
          {data?.length > 0 && (
            <>
              <div className="flex items-center justify-center">
                <h1 className="text-white font-black text-2xl md:text-4xl my-4">
                  Remote {q} Jobs
                </h1>
              </div>
              <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
                Your query "{q}" resulted in {data.length} results
              </h2>
              <span className="inline-flex rounded-md shadow-sm mt-8">
                <Link href={`/hire-remotely`} as={`/hire-remotely`}>
                  <a
                    title="Post a remote job and hire remotely"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150"
                  >
                    Post a job for $25
                  </a>
                </Link>
              </span>
            </>
          )}
        </div>
      </div>
      {data?.length > 0 && <JobsList title={q} jobs={data} />}
    </>
  )
}

export default SearchJobPage
