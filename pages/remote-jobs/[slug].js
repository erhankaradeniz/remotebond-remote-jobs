import React from "react"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"
import Head from "next/head"
import { NextSeo, JobPostingJsonLd } from "next-seo"

import JobHeader from "../../components/JobHeader"
import randomInt from "../../helpers/randomInt"

import getAllJobs, { getJobBySlug } from "../../lib/jobs"

export async function getStaticPaths() {
  const jobs = await getAllJobs()
  return {
    paths: jobs.map((job) => {
      return {
        params: {
          slug: job.data.slug,
        },
      }
    }),
    fallback: true,
    revalidate: 1,
  }
}

export async function getStaticProps(ctx) {
  const job = await getJobBySlug(ctx.params.slug)
  const jobData = JSON.parse(job)
  return {
    props: {
      job: jobData.data,
    },
  }
}

function strip_tags(str) {
  return str.replace(/(<(br[^>]*)>)/gi, "\n").replace(/(<([^>]+)>)/gi, "")
}

const JobsPage = ({ job }) => {
  const salarayAmount = randomInt(40000, 80000)
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
        <h1>Loading...</h1>
      </div>
    )
  }

  // No match, we return a 404
  if (!job) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  } else {
    let newDate = new Date(job.pub_date)
    newDate.setMonth(newDate.getMonth() + 1)
    const jobExpireDate = new Date(newDate).toISOString()
    return (
      <>
        <NextSeo
          title={`Remote ${job.title} job at ${job.company_name}`}
          description="Looking for a remote job? Remote Bond has 5,000+ remote jobs as a Developer, Designer, Copywriter, Customer Support Rep, Sales Professional, Project Manager and more! Find a career where you can work remotely from anywhere."
        />
        <JobPostingJsonLd
          datePosted={job.pub_date}
          description={strip_tags(job.description)}
          hiringOrganization={{
            name: job.company_name,
            sameAs: null,
          }}
          jobLocation={{
            streetAddress: "Anywhere",
            addressLocality: "Anywhere",
            addressRegion: "Anywhere",
            postalCode: "Anywhere",
            addressCountry: "Anywhere",
          }}
          title={job.title}
          baseSalary={{
            currency: "USD",
            value: salarayAmount,
            unitText: "YEAR",
          }}
          employmentType="FULL_TIME"
          jobLocationType="TELECOMMUTE"
          validThrough={jobExpireDate}
        />
        <JobHeader
          title={job.title}
          company={job.company_name}
          applyUrl={job.apply_url}
          location={job.location}
        />
        <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
          <div className="w-full md:w-3/4">
            <div
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl jobDescription__container py-6"
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></div>

            <div className="flex justify-center mb-8">
              <span className="inline-flex rounded-md shadow-sm">
                <a
                  href={`${job.apply_url}&utm_source=remotebond.com&ref=remotebond.com`}
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150"
                >
                  Apply for this job
                </a>
              </span>
            </div>

            {/* Notification */}
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-xs leading-5 text-blue-700">
                    Keep in mind you never have to pay to apply. Never pay for
                    equipment or training. The basic rule is; NEVER pay for
                    anything when applying. When talking to the job poster, make
                    sure you're talking to someone from the actual company. By
                    clicking the apply button you will leave Remotebond to the
                    external application website.
                  </p>
                  <br />
                  <p className="text-xs leading-5 text-blue-700">
                    Remotebond accepts no liability or responsibility as a
                    consequence of any reliance upon information on there
                    (external sites) or here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
