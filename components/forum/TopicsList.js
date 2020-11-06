import React from "react"
import Link from "next/link"
import Image from "next/image"

// Local Components
import TimeAgoWrapper from "./TimeAgo"

const TopicsList = ({ topics }) => {
  // TODO, needs to be fetched like on a jobs category page
  const isLoadingJobs = false
  const hasPrevPage = false
  const hasMoreJobs = undefined

  return (
    <div className="w-full">
      <div className="bg-white w-full shadow overflow-hidden sm:rounded-md mb-4">
        <ul>
          {topics.map(({ topic: topic, author, category, comments }, idx) => {
            const { title, created_at, slug } = topic.data
            const { username, profile_image } = author.data
            const comments_length = comments.data.length

            const {
              title: category_title,
              color,
              slug: category_slug,
            } = category.data

            let activeTextColor, activeBgColor
            switch (color) {
              case "green":
                activeTextColor = "text-green-800"
                activeBgColor = "bg-green-100"
                break
              case "teal":
                activeTextColor = "text-teal-800"
                activeBgColor = "bg-teal-100"
                break
              case "pink":
                activeTextColor = "text-pink-800"
                activeBgColor = "bg-pink-100"
                break
              case "yellow":
                activeTextColor = "text-yellow-800"
                activeBgColor = "bg-yellow-100"
                break
              case "blue":
                activeTextColor = "text-blue-800"
                activeBgColor = "bg-blue-100"
                break
              default:
                activeTextColor = "text-indigo-800"
                activeBgColor = "bg-indigo-100"
            }

            return (
              <li key={idx}>
                <Link
                  as={`/forum/${category_slug}/${slug}`}
                  href={`/forum/${category_slug}/${slug}`}
                >
                  <a
                    className={`block focus:outline-none  transition duration-150 ease-in-out hover:bg-gray-50 focus:bg-gray-50 ${
                      idx !== 0 ? "border-t border-gray-200" : ""
                    }`}
                  >
                    <div className="px-4 py-4 sm:px-6 flex">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div
                            className={`text-sm leading-5 font-medium w-full break-all sm:truncate text-blue-600`}
                          >
                            {title}
                          </div>
                          <div className="mt-2 sm:mt-0 sm:ml-2 flex-shrink-0 flex">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activeBgColor} ${activeTextColor}`}
                            >
                              {category_title}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div
                              className={`mr-6 flex items-center text-sm leading-5 text-rb-gray-5`}
                            >
                              <Image
                                src={`v1602767638/41598386_10160745129720117_4948898357696266240_n_j0uqwz.jpg`}
                                width={20}
                                height={20}
                                className="rounded-full"
                                alt={`${username} profile on remotebond`}
                              />
                              <span className="ml-1.5">{username}</span>
                            </div>
                            <div
                              className={`mr-6 flex items-center text-sm leading-5 text-rb-gray-5`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className={`flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4`}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                              </svg>
                              {`${comments_length} comments`}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm leading-5 text-rb-gray-5 sm:mt-0">
                            <ul className="flex space-x-3">
                              <li
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 text-rb-gray-5`}
                              >
                                <TimeAgoWrapper date={created_at} />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Pagination */}
      <div className="flex justify-between px-2 sm:px-0">
        <button
          disabled={isLoadingJobs || !hasPrevPage}
          // onClick={loadPrevPage}
          type="button"
          className={`inline-flex px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md ${
            !!hasPrevPage
              ? "text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150"
              : "bg-tranparent text-rb-gray-4 cursor-not-allowed"
          }`}
        >
          {!isLoadingJobs ? (
            "← Previous page"
          ) : (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-rb-gray-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          )}
        </button>
        <button
          // onClick={loadMoreJobs}
          type="button"
          disabled={isLoadingJobs || hasMoreJobs === undefined}
          className={`inline-flex px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md ${
            !isLoadingJobs && hasMoreJobs !== undefined
              ? "text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150"
              : "bg-transparent text-rb-gray-4 cursor-not-allowed"
          }`}
        >
          {!isLoadingJobs ? (
            "Next page →"
          ) : (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-rb-gray-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default TopicsList
