import React from "react"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import PageHeader from "../../components/PageHeader"
import Sidebar from "../../components/forum/Sidebar"

import getAllForumTopics from "../../lib/forumTopics"
import getAllForumCategories from "../../lib/forumCategories"
import TopicsList from "../../components/forum/TopicsList"

export async function getStaticProps(ctx) {
  // Forum related calls
  const forumTopics = await getAllForumTopics()
  const forumCategories = await getAllForumCategories()

  const forumTopicsData = JSON.parse(forumTopics)
  const forumCategoriesData = JSON.parse(forumCategories)
  return {
    props: {
      forumTopics: forumTopicsData,
      forumCategories: forumCategoriesData,
    },
    revalidate: 1,
  }
}

const ForumIndexPage = (props) => {
  // Forum threads data
  const forumTopics = props.forumTopics.data
  const forumCategories = props.forumCategories.data

  return (
    <>
      <NextSeo
        title={`Remotebond Forum a hub for everything related to remote work`}
        description="The Remotebond Forum is a how-to content hub for all things remote work."
        canonical={`https://remotebond.com/forum`}
        openGraph={{
          url: `https://remotebond.com/forum`,
          title: `Remotebond Forum a hub for everything related to remote work`,
          description: `The Remotebond Forum is a how-to content hub for all things remote work.`,
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
            name: "Forum",
          },
        ]}
      />
      <PageHeader
        title={`Remote Work Forum`}
        subtitle={`The Remotebond Forum is a how-to content hub for all things remote work. From best practices for job seekers, tools, resources and news to hiring tips and processes, the Remotebond forum is meant to be community-driven documentation on how to get remote work right.`}
      />
      <div className="max-w-screen-xl w-full mx-auto py-4 px-4 sm:px-6 flex space-x-0 md:space-x-8 flex-col md:flex-row">
        <Sidebar categories={forumCategories} />
        <TopicsList topics={forumTopics} />
      </div>
    </>
  )
}

export default ForumIndexPage
