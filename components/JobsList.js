import React from "react"
import Link from "next/link"

const JobsList = ({ title, slug, jobs }) => {
  return (
    <div className="max-w-screen-xl mx-auto my-12">
      <h2 className="text-xl font-black text-center mb-4 text-gray-700">
        {`${title} Jobs`}
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mb-4">
        <ul>
          {jobs.map((job, idx) => {
            const { title, location, company_name, slug } = job.data
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
                          <div className="mr-6 flex items-center text-sm leading-5 text-gray-500">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            {company_name}
                          </div>
                          <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            {location ? location : "Remote"}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span>
                            Closing on
                            <time datetime="2020-01-07">January 7, 2020</time>
                          </span>
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
    </div>
  )
}

export default JobsList
