import React, { useState } from "react"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import useUser from "../../lib/hooks/useUser"
import Sidebar from "../../components/forum/Sidebar"
import getAllForumTopics from "../../lib/forumTopics"
import getAllForumCategories from "../../lib/forumCategories"
import TopicsList from "../../components/forum/TopicsList"
import CreateTopicSliderOver from "../../components/forum/CreateTopicSlideOver"
import LoginModal from "../../components/forum/LoginModal"

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
  const { user } = useUser()
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Forum threads data
  const forumTopics = props.forumTopics.data
  const forumCategories = props.forumCategories.data
  forumTopics.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.topic.data.created_at) - new Date(a.topic.data.created_at)
  })
  const openSlideOver = () => {
    user?.isLoggedIn
      ? setIsSlideOverOpen(!isSlideOverOpen)
      : setIsLoginModalOpen(!isLoginModalOpen)
  }

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
      <div className="relative overflow-hidden bg-black mb-12 z-10">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
          <div>
            <h1 className="text-center text-3xl leading-10 font-extrabold text-white">
              Remote Work Forum
            </h1>
            <h2 className="text-rb-gray-4 text-center w-full">
              The Remotebond Forum is a how-to content hub for all things remote
              work. From best practices for job seekers, tools, resources and
              news to hiring tips and processes, the Remotebond forum is meant
              to be community-driven documentation on how to get remote work
              right.
            </h2>
          </div>
          <div className="flex justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                onClick={openSlideOver}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150"
              >
                Create topic
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl z-10 w-full mx-auto py-4 px-4 sm:px-6 flex space-x-0 md:space-x-8 flex-col md:flex-row">
        <Sidebar categories={forumCategories} />
        <TopicsList topics={forumTopics} />
      </div>
      <CreateTopicSliderOver
        isOpen={isSlideOverOpen}
        handleClose={() => setIsSlideOverOpen(!isSlideOverOpen)}
        categories={forumCategories}
      />
      <LoginModal
        isModalOpen={isLoginModalOpen}
        handleClose={() => setIsLoginModalOpen(!isLoginModalOpen)}
      />
    </>
  )
}

export default ForumIndexPage
