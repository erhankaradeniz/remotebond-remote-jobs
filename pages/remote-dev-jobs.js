import React, { useState, useEffect } from "react"
import useSWR from "swr"

import { getJobsCountByCategory } from "../lib/jobs"
import { getPaginatedSoftwareDevJobs } from "../lib/softwareDevJobs"
import fetcher from "../lib/fetch"

import JobsList from "../components/JobsList"
import Loader from "../components/Loader"

export async function getStaticProps(ctx) {
  const jobsCountFetch = await getJobsCountByCategory("Software Development")
  const jobsCount = JSON.parse(jobsCountFetch)
  const job = jobsCount.data ? jobsCount.data : false

  const paginatedJobsFetch = await getPaginatedSoftwareDevJobs("null")
  const paginatedJobs = JSON.parse(paginatedJobsFetch)
  const latestRefId = paginatedJobs.after[2]["@ref"].id
  const initialPubDate = paginatedJobs.after[0]
  const firstPubDate = paginatedJobs.data[0].data.pub_date

  return {
    props: {
      jobsCount: job,
      initialData: paginatedJobs,
      initialAfter: latestRefId,
      initialPubDate,
      firstPubDate,
    },
  }
}

const RemoteDevJobsPage = ({
  jobsCount,
  initialData,
  initialAfter,
  firstPubDate,
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
            Remote Software Developer Jobs
          </h1>
          <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
            Browse {jobsCount} Remote Software Development jobs in{" "}
            {date.toLocaleDateString("en-EN", dateOptions)}
          </h2>
        </div>
      </div>
      {cursor.page !== 0 && data && data.data && !isLoading ? (
        <JobsList
          slug="remote-dev-jobs"
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
          slug="remote-dev-jobs"
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

export default RemoteDevJobsPage