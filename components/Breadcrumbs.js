import React from "react"
import Link from "next/link"

const Breadcrumbs = (props) => {
  return (
    <div className="bg-rb-gray-1 hidden sm:block">
      <div className="max-w-screen-xl mx-auto py-2 px-4 sm:px-6">
        <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
          <Link as={`/`} href={`/`}>
            <a className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
              Home
            </a>
          </Link>
          <svg
            className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out sm:truncate"
          >
            Remote Dev Jobs
          </a>
          <svg
            className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span className="text-gray-400 transition duration-150 ease-in-out sm:truncate">
            {props.jobTitle}
          </span>
        </nav>
      </div>
    </div>
  )
}

export default Breadcrumbs