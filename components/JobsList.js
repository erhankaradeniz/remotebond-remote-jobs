import React from "react"
import Link from "next/link"
import ReactTooltip from "react-tooltip"

const JobsList = ({ title, slug, jobs }) => {
  const onTagClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div className="max-w-screen-xl mx-auto my-12">
      <h2 className="text-xl font-black text-center mb-4 text-gray-700">
        {`${title} Jobs`}
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
        <ul>
          {jobs.map((job, idx) => {
            const { title, location, company_name, slug, tags } = job.data
            return (
              <li key={idx}>
                <Link as={`/remote-jobs/${slug}`} href={`/remote-jobs/${slug}`}>
                  <a
                    className={`block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out ${
                      idx !== 0 ? "border-t border-gray-200" : ""
                    }`}
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                          {title}
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Allows remote
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6 flex items-center text-sm leading-5 text-rb-gray-5">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4"
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
                          <div className="mt-2 flex items-center text-sm leading-5 text-rb-gray-5 sm:mt-0">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4"
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
                                return (
                                  <li
                                    key={i}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-rb-gray-5 hover:bg-rb-gray-8 hover:text-white"
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
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <Link as={slug} href={slug}>
        <a className="text-blue-500 hover:text-blue-600 text-right block hover:underline">{`More ${title} Jobs →`}</a>
      </Link>
      <ReactTooltip place="top" type="dark" effect="solid">
        <span>Filter by tag is not available at this moment.</span>
      </ReactTooltip>
    </div>
  )
}

export default JobsList
