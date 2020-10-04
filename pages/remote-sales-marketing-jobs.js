import React, { useState, useEffect } from "react"
import Link from "next/link"
import useSWR from "swr"

import { getJobsCountByCategory } from "../lib/jobs"
import { getPaginatedSalesMarketingJobs } from "../lib/salesMarketingJobs"
import fetcher from "../lib/fetch"
import getAllCategories from "../lib/categories"

import JobsList from "../components/JobsList"
import Loader from "../components/Loader"
import FilterBar from "../components/FilterBar"

export async function getStaticProps(ctx) {
  const categories = await getAllCategories()
  const jobsCountFetch = await getJobsCountByCategory("Customer Support")
  const jobsCount = JSON.parse(jobsCountFetch)
  const job = jobsCount.data ? jobsCount.data : false
  const categoriesData = JSON.parse(categories)

  const paginatedJobsFetch = await getPaginatedSalesMarketingJobs("null")
  const paginatedJobs = JSON.parse(paginatedJobsFetch)

  const latestRefId = paginatedJobs.after
    ? paginatedJobs.after[2]["@ref"].id
    : null
  const initialPubDate = paginatedJobs.after ? paginatedJobs.after[0] : null
  const firstPubDate = paginatedJobs.data[0].data.pub_date

  return {
    props: {
      categories: categoriesData,
      jobsCount: job,
      initialData: paginatedJobs,
      initialAfter: latestRefId,
      initialPubDate,
      firstPubDate,
    },
    revalidate: 1,
  }
}

const RemoteSalesMarketingPage = ({
  jobsCount,
  initialData,
  initialAfter,
  firstPubDate,
  categories,
  initialPubDate,
}) => {
  const [cursor, setCursor] = useState({
    key: initialAfter,
    date: firstPubDate,
    page: 0,
    before: null,
    isPrevClicked: false,
    isNextClicked: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [firstRender, setFirstRender] = useState(true)

  const newJobs = () => {
    if (cursor.isPrevClicked) {
      return `/api/jobs/prev?key=${cursor.before}&d=${cursor.prevDate}`
    }

    if (!cursor.date && !cursor.isPrevClicked) {
      return `/api/jobs/next`
    } else {
      return `/api/jobs/next?key=${cursor.key}&d=${cursor.date}`
    }
  }

  const { data, mutate } = useSWR(!isLoading ? newJobs : null, fetcher)

  let date = new Date()
  let dateOptions = {
    year: "numeric",
    month: "long",
  }

  const loadMoreJobs = () => {
    setCursor({
      key: data.after[2]
        ? data.after[2]["@ref"].id
        : data.after[1]
        ? data.after[1]["@ref"].id
        : null,
      prevDate: data.before[0], //data.data[0].data.pub_date,
      date: data.after[0], //data.data.slice(-1)[0].data.pub_date,
      page: cursor.page + 1,
      before:
        data && data.before && data.before[2]
          ? data.before[2]["@ref"].id
          : data.before[1]
          ? data.before[1]["@ref"].id
          : null,
      isPrevClicked: false,
      isNextClicked: true,
    })
    setIsLoading(true)
  }

  const loadPrevPage = () => {
    setCursor({
      key:
        data.after && data.after[2]
          ? data.after[2]["@ref"].id
          : data.after && data.after[1]
          ? data.after[1]["@ref"].id
          : null,
      prevDate: data.before[0], //data.data[0].data.pub_date,
      date: data.after ? data.after[0] : null, //data.data.slice(-1)[0].data.pub_date,
      page: cursor.page - 1,
      before:
        data.before && data.before[2]
          ? data.before[2]["@ref"].id
          : data.before[1]
          ? data.before[1]["@ref"].id
          : null,
      isPrevClicked: true,
      isNextClicked: false,
    })
  }

  // Fetch new jobs on state change
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    } else {
      mutate()
      setIsLoading(false)
    }
  }, [cursor])

  return (
    <>
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
          <h1 className="text-white font-black text-2xl md:text-4xl my-4">
            Remote Sales &amp; Marketing Jobs
          </h1>
          <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
            Browse {jobsCount} Remote Sales &amp; Marketing jobs in{" "}
            {date.toLocaleDateString("en-EN", dateOptions)}
          </h2>
          <span className="inline-flex rounded-md shadow-sm mt-8">
            <Link href={`/hire-remotely`} as={`/hire-remotely`}>
              <a className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150">
                Post a job for $25
              </a>
            </Link>
          </span>
        </div>
      </div>

      {/* Filters  */}
      <FilterBar categories={categories.data} />

      {cursor.page !== 0 && data && data.data && !isLoading ? (
        <JobsList
          slug="remote-sales-marketing-jobs"
          jobs={data.data}
          loadMoreJobs={loadMoreJobs}
          loadPrevPage={loadPrevPage}
          isLoadingJobs={isLoading}
          isPaginated
          hasPrevPage={cursor.before}
          hasMoreJobs={data.after}
        />
      ) : cursor.page !== 0 ? (
        <Loader />
      ) : null}

      {/* Weird hack to have pre-rendered content, useSWR is acting weird with initialData */}
      {cursor.page === 0 && (
        <JobsList
          slug="remote-sales-marketing-jobs"
          jobs={initialData.data}
          loadMoreJobs={loadMoreJobs}
          loadPrevPage={loadPrevPage}
          isLoadingJobs={isLoading}
          isPaginated
          hasPrevPage={null}
          hasMoreJobs={initialData.after}
        />
      )}
    </>
  )
}

export default RemoteSalesMarketingPage
