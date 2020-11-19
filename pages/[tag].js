import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import Link from "next/link"
import useSWR from "swr"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import { getAllTags, getPaginatedJobsByTag } from "../lib/tag"
import JobsList from "../components/JobsList"
import Loader from "../components/Loader"

export async function getStaticPaths() {
  let tags = await getAllTags()
  tags.filter((e) => e !== "design")
  tags.filter((e) => e !== "non-tech")
  tags.filter((e) => e !== "customer-support")
  if (tags.length) {
    return {
      paths: tags.map((tag) => {
        const tagSlug = `remote-${tag}-jobs`
        return {
          params: {
            tag: tagSlug,
          },
        }
      }),
      fallback: "blocking",
    }
  } else {
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

export async function getStaticProps(ctx) {
  const regex = /\-(.*)\-/g
  const tagSlug = regex.exec(ctx.params.tag)
  let jobs
  if (tagSlug) {
    jobs = await getPaginatedJobsByTag(null, null, null, null, tagSlug[1])
  }
  const notFound = !jobs
  if (jobs) {
    const jobsData = JSON.parse(jobs)
    const latestRefId = jobsData.after ? jobsData.after[2]["@ref"].id : null
    const initialPubDate = jobsData?.after ? jobsData.after[0] : null
    const firstPubDate = jobsData?.data[0]?.data.pub_date
    if (initialPubDate && firstPubDate) {
      return {
        props: {
          // jobs: jobsData.data,
          initialData: jobsData,
          initialAfter: latestRefId,
          initialPubDate,
          firstPubDate,
          slug: tagSlug[1],
        },
        revalidate: 1,
      }
    } else {
      return {
        props: {
          initialData: jobsData,
          slug: tagSlug[1],
        },
      }
    }
  } else {
    return {
      props: {
        job: null,
      },
      notFound,
    }
  }
}

const JobsPage = ({
  jobs,
  slug,
  initialData,
  initialAfter,
  firstPubDate,
  initialPubDate,
}) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
        <h1>Loading...</h1>
      </div>
    )
  }

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
      return `/api/jobs/prev?key=${cursor.before}&d=${cursor.prevDate}&tag=${slug}`
    }

    if (!cursor.date && !cursor.isPrevClicked) {
      return `/api/jobs/next?tag=${slug}`
    } else {
      return `/api/jobs/next?key=${cursor.key}&d=${cursor.date}&tag=${slug}`
    }
  }

  const { data, mutate } = useSWR(!isLoading ? newJobs : null)

  const tagStr = slug.replace(/-/g, " ")
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
      <NextSeo
        title={`Remote ${tagStr} jobs`}
        description={`The latest and most popular remote ${tagStr} jobs around the web. Jobs included from top remote companies. Find your new ${tagStr} career on Remotebond.`}
        canonical={`https://remotebond.com/remote-${slug}-jobs`}
        openGraph={{
          url: `https://remotebond.com/remote-${slug}-jobs`,
          title: `Remote ${tagStr} jobs`,
          description: `The latest and most popular remote ${tagStr} jobs around the web. Jobs included from top remote companies. Find your new ${tagStr} career on Remotebond.`,
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
            name: `Remote ${tagStr} jobs`,
          },
        ]}
      />
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
          <h1 className="text-white font-black text-2xl md:text-4xl my-4">
            Remote <span className="capitalize">{tagStr}</span> Jobs
          </h1>
          <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
            Browse {initialData.length} remote {tagStr} jobs in{" "}
            {date.toLocaleDateString("en-EN", dateOptions)}
          </h2>
          <span className="inline-flex rounded-md shadow-sm mt-8">
            <Link href={`/hire-remotely`} as={`/hire-remotely`}>
              <a
                title="Hire remotely with Remotebond"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150"
              >
                Post a job for $25
              </a>
            </Link>
          </span>
        </div>
      </div>

      <div className="max-w-screen-xl w-full mx-auto py-10 px-4 sm:px-6">
        {cursor.page !== 0 && data && data.data && !isLoading ? (
          <JobsList
            slug={`remote-${slug}-jobs`}
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
        {cursor.page === 0 && initialData && (
          <JobsList
            slug={`remote-${slug}-jobs`}
            jobs={initialData.data}
            loadMoreJobs={loadMoreJobs}
            loadPrevPage={loadPrevPage}
            isLoadingJobs={isLoading}
            isPaginated
            hasPrevPage={null}
            hasMoreJobs={initialData.after}
          />
        )}
      </div>
    </>
  )
}

export default JobsPage
