import React from "react"

import Header from "../../components/Header"
import JobHeader from "../../components/JobHeader"

import getAllJobs, { getJobBySlug } from "../../lib/jobs"

export async function getStaticPaths() {
  const jobs = await getAllJobs()
  const jobsData = JSON.parse(jobs)
  return {
    paths: jobsData.data.map((job) => {
      return {
        params: {
          slug: job.data.slug,
        },
      }
    }),
    fallback: true,
  }
}

export async function getStaticProps(ctx) {
  const job = await getJobBySlug(ctx.params.slug)
  const jobData = JSON.parse(job)
  const {
    title,
    description,
    tags,
    company_name,
    apply_url,
    location,
  } = jobData.data[0].data
  return {
    props: {
      title: title,
      description: description,
      tags: tags,
      companyName: company_name,
      applyUrl: apply_url,
      location: location ? location : null,
    },
  }
}

const JobsPage = ({
  title,
  description,
  tags,
  companyName,
  applyUrl,
  location,
}) => {
  return (
    <div>
      <Header />
      <JobHeader
        title={title}
        company={companyName}
        applyUrl={applyUrl}
        location={location}
      />
      <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6">
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl jobDescription__container py-6"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  )
}

export default JobsPage
