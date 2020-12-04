import React from "react"
import Link from "next/link"
import Image from "next/image"

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
  return (
    <div className="w-full max-w-screen-xl mx-auto my-12">
      {title && (
        <h2 className="text-xl flex justify-center font-black mb-4 capitalize text-gray-700 items-center">
          {`${title} Jobs`}
          {slug && (
            <a
              href={`https://remotebond.com${slug}.rss`}
              className="inline-block w-5 h-5 text-white bg-orange-400 rounded-md p-px ml-3 hover:text-white"
              title={`Remote ${title} Jobs RSS Feed`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </a>
          )}
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
              tags_refs,
              company_is_highlighted,
              show_company_logo,
              company_logo_url,
            } = job.data
            // We have to strip the first part from url
            let stripped_company_logo_url
            if (company_logo_url) {
              stripped_company_logo_url = company_logo_url.replace(
                "https://res.cloudinary.com/remotebond/image/upload",
                ""
              )
            }
            // const id = job.ref["@ref"].id
            return (
              <li key={idx}>
                <Link as={`/remote-jobs/${slug}`} href={`/remote-jobs/${slug}`}>
                  <div
                    className={`block focus:outline-none  transition duration-150 ease-in-out hover:cursor-pointer ${
                      idx !== 0 ? "border-t border-gray-200" : ""
                    } ${
                      company_is_highlighted
                        ? "bg-yellow-100 hover:bg-yellow-50 focus:bg-yellow-50"
                        : "hover:bg-gray-50 focus:bg-gray-50"
                    }`}
                  >
                    <div className="px-4 py-4 sm:px-6 flex">
                      <div className="w-auto">
                        <div
                          className={`h-12 w-12 rounded-sm font-extrabold mr-4 flex items-center justify-center relative overflow-hidden ${
                            company_is_highlighted
                              ? "bg-yellow-400 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {show_company_logo ? (
                            <Image
                              src={stripped_company_logo_url}
                              width={48}
                              height={48}
                              alt={`Remote ${title} job at ${company_name}`}
                            />
                          ) : (
                            <span className="uppercase">
                              {company_name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div
                            className={`text-sm leading-5 font-medium w-full break-all sm:truncate`}
                          >
                            <Link
                              as={`/remote-jobs/${slug}`}
                              href={`/remote-jobs/${slug}`}
                            >
                              <a
                                className={`${
                                  company_is_highlighted
                                    ? "text-yellow-800 hover:text-yellow-700"
                                    : "text-blue-600"
                                }`}
                                title={`Remote ${title} job at ${company_name}`}
                              >{`${title}`}</a>
                            </Link>
                          </div>
                          <div className="mt-2 sm:mt-0 sm:ml-2 flex-shrink-0 flex">
                            {company_is_highlighted && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-red-800 mr-2">
                                Featured
                              </span>
                            )}
                            <span className="px-2 inline-flex text-xs leading-5 font-normal rounded-full bg-green-100 text-green-800">
                              Allows remote
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div
                              className={`mr-6 flex items-center text-sm leading-5 ${
                                company_is_highlighted
                                  ? "text-yellow-500"
                                  : "text-rb-gray-5"
                              }`}
                            >
                              <svg
                                className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                                  company_is_highlighted
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
                                company_is_highlighted
                                  ? "text-yellow-500"
                                  : "text-rb-gray-5"
                              }`}
                            >
                              <svg
                                className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                                  company_is_highlighted
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
                          <div className="mt-2 flex items-center text-sm leading-5 sm:mt-0">
                            {/* Temp remove tags, before page crash */}
                            {tags_refs && tags_refs.length && (
                              <ul className="flex space-x-3">
                                {tags_refs.map((tag, i) => {
                                  if (i > 2) return
                                  return (
                                    <li
                                      key={i}
                                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs group font-medium leading-4 hover:cursor-pointer ${
                                        company_is_highlighted
                                          ? "bg-yellow-400 hover:bg-yellow-300"
                                          : "bg-blue-100 group-hover:bg-blue-600 group-hover:text-white hover:bg-blue-600 hover:text-white"
                                      }`}
                                    >
                                      <Link href={`/remote-${tag.slug}-jobs`}>
                                        <a
                                          title={`Filter remote ${tag.name} jobs`}
                                          className={`${
                                            company_is_highlighted
                                              ? "text-white group-hover:text-yellow-800"
                                              : null
                                          } group-hover:text-white`}
                                        >
                                          {tag.name}
                                        </a>
                                      </Link>
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {!isPaginated && slug ? (
        <div className="flex justify-center sm:justify-end px-2 sm:px-0">
          <Link as={slug} href={slug}>
            <a className="inline-flex px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150">{`More ${title} Jobs →`}</a>
          </Link>
        </div>
      ) : (
        <div className="flex justify-between px-2 sm:px-0">
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
    </div>
  )
}

export default JobsList
