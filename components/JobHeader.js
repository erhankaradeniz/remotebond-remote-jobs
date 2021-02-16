import React from "react"

const JobHeader = ({
  title,
  workingHours,
  company,
  applyUrl,
  location,
  isEmail,
}) => {
  return (
    <div className="bg-black">
      <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0 py-4 md:py-6">
            <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              {title}
            </h1>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
              <div className="mt-2 flex items-center text-sm leading-5 text-gray-400 sm:mr-6">
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
                {company}
              </div>
              {workingHours && (
                <div className="mt-2 flex items-center text-sm leading-5 text-gray-400 sm:mr-6">
                  <svg
                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  Full-time
                </div>
              )}
              <div className="mt-2 flex items-center text-sm leading-5 text-gray-400 sm:mr-6">
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
              {/* <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clip-rule="evenodd"
                />
              </svg>
              $120k &ndash; $140k
            </div> */}
            </div>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4 pb-4">
            <span className="shadow-sm rounded-md">
              {!isEmail ? (
                <a
                  href={`${applyUrl}?utm_source=remotebond.com&ref=remotebond.com`}
                  rel="nofollow, noindex, noreferrer"
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-5 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:shadow-outline-blue focus:border-rb-green-7 active:bg-rb-green-7 transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Apply now
                </a>
              ) : (
                <a
                  href={`mailto:${applyUrl}?subject=Application for ${title} via Remotebond`}
                  rel="nofollow, noindex, noreferrer"
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-5 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:shadow-outline-blue focus:border-rb-green-7 active:bg-rb-green-7 transition duration-150 ease-in-out"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Apply now
                </a>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobHeader
