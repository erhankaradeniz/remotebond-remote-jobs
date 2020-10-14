import React from "react"
import Head from "next/head"
import DefaultErrorPage from "next/error"

import { getJobBySlug } from "../../../lib/jobs"
import EditJobPost from "../../../components/form/EditJobPost"

export async function getServerSideProps(ctx) {
  const { slug, token } = ctx.query

  if (!token || !slug) {
    return {
      props: {},
    }
  }

  const job = await getJobBySlug(slug)
  const jobData = JSON.parse(job)
  if (jobData.data.token === token) {
    return {
      props: {
        title: jobData.data.title,
        description: jobData.data.description,
        tags: jobData.data.tags,
        location: jobData.data.location,
        apply_url: jobData.data.apply_url,
        primary_category: jobData.data.primary_category,
        min_salary: jobData.data.min_salary,
        max_salary: jobData.data.max_salary,
        company_name: jobData.data.company_name,
        company_logo_url: jobData.data.company_logo_url,
        company_website: jobData.data.company_website,
        company_twitter: jobData.data.company_twitter,
        job_id: jobData.ref["@ref"].id,
      },
    }
  } else {
    return { props: {} }
  }
}

const EditJobPage = (props) => {
  if (Object.keys(props).length === 0) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <div>
      <EditJobPost jobData={props} />
    </div>
  )
}

export default EditJobPage
