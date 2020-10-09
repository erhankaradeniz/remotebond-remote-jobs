import React, { useState } from "react"
import Link from "next/link"
import ReactTooltip from "react-tooltip"

const JobsList = ({
  title,
  slug,
  jobs,
  isLoadingJobs,
  isPaginated,
  loadMoreJobs,
  loadPrevPage,
  hasPrevPage,
  hasMoreJobs,
}) => {
  const onTagClick = (event) => {
    event.stopPropagation()
  }
  return (
    <div className="w-full max-w-screen-xl mx-auto my-12">
      {title && (
        <h2 className="text-xl font-black text-center mb-4 text-gray-700">
          {`${title} Jobs`}
        </h2>
      )}
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
        <ul>
          {jobs.map((job, idx) => {
            const {
              title,
              location,
              company_name,
              slug,
              tags,
              isHighlighted,
            } = job.data
            const id = job.ref["@ref"].id
            return (
              <li key={idx}>
                <Link as={`/remote-jobs/${slug}`} href={`/remote-jobs/${slug}`}>
                  <a
                    title={`Remote ${title} job at ${company_name}`}
                    className={`block focus:outline-none  transition duration-150 ease-in-out ${
                      idx !== 0 ? "border-t border-gray-200" : ""
                    } ${
                      isHighlighted
                        ? "bg-yellow-100 hover:bg-yellow-50 focus:bg-yellow-50"
                        : "hover:bg-gray-50 focus:bg-gray-50"
                    }`}
                  >
                    <div className="px-4 py-4 sm:px-6 flex">
                      <div>
                        <div
                          className={`h-12 md:h-full w-12 rounded-sm text-center font-extrabold mr-4 pt-3 ${
                            isHighlighted
                              ? "bg-yellow-400 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <span className="uppercase">
                            {company_name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div
                            className={`text-sm leading-5 font-medium truncate ${
                              isHighlighted
                                ? "text-yellow-800"
                                : "text-blue-600"
                            }`}
                          >
                            {`${title} - ${id}`}
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            {isHighlighted && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-red-800 mr-2">
                                Featured
                              </span>
                            )}
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Allows remote
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div
                              className={`mr-6 flex items-center text-sm leading-5 ${
                                isHighlighted
                                  ? "text-yellow-500"
                                  : "text-rb-gray-5"
                              }`}
                            >
                              <svg
                                className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                                  isHighlighted
                                    ? "text-yellow-400"
                                    : "text-rb-gray-4"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {company_name}
                            </div>
                            <div
                              className={`mr-6 flex items-center text-sm leading-5 ${
                                isHighlighted
                                  ? "text-yellow-500"
                                  : "text-rb-gray-5"
                              }`}
                            >
                              <svg
                                className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                                  isHighlighted
                                    ? "text-yellow-400"
                                    : "text-rb-gray-4"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {location ? location : "Remote"}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm leading-5 text-rb-gray-5 sm:mt-0">
                            {tags.length && (
                              <ul className="flex space-x-3">
                                {tags.map((tag, i) => {
                                  if (i > 2) return
                                  return (
                                    <li
                                      key={i}
                                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 ${
                                        isHighlighted
                                          ? "bg-yellow-400 text-white hover:bg-yellow-300"
                                          : "bg-gray-100 text-rb-gray-5 hover:bg-rb-gray-8 hover:text-white"
                                      }`}
                                    >
                                      <span
                                        data-tip="React-tooltip"
                                        onClick={() => onTagClick()}
                                      >
                                        {tag}
                                      </span>
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
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
      {!isPaginated ? (
        <div className="flex justify-end">
          <Link as={slug} href={slug}>
            <a className="inline-flex px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150">{`More ${title} Jobs →`}</a>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between">
          <button
            disabled={isLoadingJobs || !hasPrevPage}
            onClick={loadPrevPage}
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
            onClick={loadMoreJobs}
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
      )}
      <ReactTooltip place="top" type="dark" effect="solid">
        <span>Filter by tag is not available at this moment.</span>
      </ReactTooltip>
    </div>
  )
}

export default JobsList
