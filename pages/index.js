import React from "react"
import { NextSeo } from "next-seo"
import MailchimpSubscribe from "react-mailchimp-subscribe"

import JobsList from "../components/JobsList"
import FilterBar from "../components/FilterBar"
// import SearchBar from "../components/SearchBar"
import Hero from "../components/Hero"
import SubscribeEmailForm from "../components/SubscribeEmailForm"
import TopicsScroller from "../components/TopicsScroller"

// import url from "../helpers/url"
import getAllCategories from "../lib/categories"
import getLatestSoftwareDevJobs from "../lib/softwareDevJobs"
import getLatestCustomerSupportJobs from "../lib/customerSupportJobs"
import getLatestSalesMarketingJobs from "../lib/salesMarketingJobs"
import getLatestDesignJobs from "../lib/designJobs"
import getLatestNonTechJobs from "../lib/nonTechJobs"

import getAllForumTopics from "../lib/forumTopics"

export async function getStaticProps(ctx) {
  // Jobs related calls
  const categories = await getAllCategories()
  const softwareDevJobs = await getLatestSoftwareDevJobs()
  const customerSupportJobs = await getLatestCustomerSupportJobs()
  const salesMarketingJobs = await getLatestSalesMarketingJobs()
  const designJobs = await getLatestDesignJobs()
  const nonTechJobs = await getLatestNonTechJobs()

  // Forum related calls
  const forumTopics = await getAllForumTopics()

  const categoriesData = JSON.parse(categories)
  const softwareDevJobsData = JSON.parse(softwareDevJobs)
  const customerSupportJobsData = JSON.parse(customerSupportJobs)
  const salesMarketingJobsData = JSON.parse(salesMarketingJobs)
  const designJobsData = JSON.parse(designJobs)
  const nonTechJobsData = JSON.parse(nonTechJobs)

  const forumTopicsData = JSON.parse(forumTopics)

  return {
    props: {
      categories: categoriesData,
      softwareDevJobs: softwareDevJobsData,
      customerSupportJobs: customerSupportJobsData,
      salesMarketingJobs: salesMarketingJobsData,
      designJobs: designJobsData,
      nonTechJobs: nonTechJobsData,
      forumTopics: forumTopicsData,
    },
    revalidate: 1,
  }
}

const _URL = "https://mailchimp.mailing.list.url"

const IndexPage = (props) => {
  // Jobs Data
  const categories = props.categories.data
  const softwareDevJobs = props.softwareDevJobs.data
  const customerSupportJobs = props.customerSupportJobs.data
  const salesMarketingJobs = props.salesMarketingJobs.data
  const designJobs = props.designJobs.data
  const nonTechJobs = props.nonTechJobs.data

  // Forum threads data
  const forumTopics = props.forumTopics.data
  return (
    <>
      <NextSeo canonical={`https://remotebond.com`} />
      {/* Hero Section */}
      <Hero />

      {/* Forum topics scoller */}
      <TopicsScroller topics={forumTopics} />

      {/* Filters  */}
      <FilterBar categories={categories} />

      {/* Posting group */}
      <JobsList
        title="Software Development"
        slug="/remote-dev-jobs"
        jobs={softwareDevJobs}
      />

      <MailchimpSubscribe
        url={_URL}
        render={({ subscribe, status, message }) => (
          <SubscribeEmailForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />

      <JobsList
        title="Customer Support"
        slug="/remote-customer-support-jobs"
        jobs={customerSupportJobs}
      />
      <JobsList
        title="Sales & Marketing"
        slug="/remote-sales-marketing-jobs"
        jobs={salesMarketingJobs}
      />
      <JobsList title="Design" slug="/remote-design-jobs" jobs={designJobs} />
      <JobsList
        title="Non Tech"
        slug="/remote-non-tech-jobs"
        jobs={nonTechJobs}
      />
    </>
  )
}

export default IndexPage
