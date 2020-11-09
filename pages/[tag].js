import React from "react"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import Link from "next/link"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import { getAllTags, getPaginatedJobsByTag } from "../lib/tag"
import JobsList from "../components/JobsList"

export async function getStaticPaths() {
  const tags = await getAllTags()
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
  if (jobs) {
    const jobsData = JSON.parse(jobs)
    return {
      props: {
        jobs: jobsData.data,
        slug: tagSlug[1],
      },
      revalidate: 1,
    }
  } else {
    return {
      props: {
        job: null,
      },
    }
  }
}

const JobsPage = ({ jobs, slug }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
        <h1>Loading...</h1>
      </div>
    )
  }

  // No match, we return a 404
  if (!jobs) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  } else {
    const tagStr = slug.replace(/-/g, " ")
    let date = new Date()
    let dateOptions = {
      year: "numeric",
      month: "long",
    }
    return (
      <>
        <NextSeo
          title={``}
          description={``}
          canonical={`https://remotebond.com`}
          openGraph={{
            url: `https://remotebond.com`,
            title: ``,
            description: ``,
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
              name: `Remote job at`,
            },
          ]}
        />
        <div className="relative overflow-hidden bg-black mb-12">
          <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
            <h1 className="text-white font-black text-2xl md:text-4xl my-4">
              Remote <span className="capitalize">{tagStr}</span> Jobs
            </h1>
            <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
              Browse {jobs.length} remote {tagStr} jobs in{" "}
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
          <JobsList jobs={jobs} />
        </div>
      </>
    )
  }
}

export default JobsPage
