import React from "react"
import Link from "next/link"

const TopicsScroller = ({ topics }) => {
  return (
    <div className="text-white bg-rb-gray-10 mb-12 py-3">
      <div className="max-w-screen-xl mx-auto overflow-x-scroll pr-4 sm:pr-6 overflow-scrollbar-0 scrolling-touch select-none">
        <div className="flex flex-no-wrap relative">
          <div className="flex-shrink-0 bg-rb-gray-10 mr-4 sticky left-0 top-0 px-4">
            <h2 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              Latest Topics
            </h2>
          </div>
          <div className="flex space-x-6">
            {topics.map(({ topic: topic, category: category }, idx) => {
              const { title, slug } = topic.data
              const { slug: category_slug } = category.data

              return (
                <div
                  className="flex-shrink-0 border-r border-rb-gray-5 pr-6"
                  key={idx}
                >
                  <h3 className="font-medium">
                    <Link
                      as={`/forum/${category_slug}/${slug}`}
                      href={`/forum/${category_slug}/${slug}`}
                      prefetch={false}
                    >
                      <a
                        title={title}
                        className="text-rb-gray-4 hover:text-white"
                      >
                        {title}
                      </a>
                    </Link>
                  </h3>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicsScroller
