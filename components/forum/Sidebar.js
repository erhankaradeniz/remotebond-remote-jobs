import React from "react"

const Sidebar = () => {
  return (
    <nav className="w-64">
      <a
        href="#"
        className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
        aria-current="page"
      >
        <span className="truncate">All Categories</span>
        <span className="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full bg-white transition ease-in-out duration-150">
          5
        </span>
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
      >
        <span className="truncate">General Advice</span>
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
      >
        <span className="truncate">Job Seeker</span>
        <span className="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full bg-gray-100 group-hover:bg-gray-200 group-focus:bg-gray-200 transition ease-in-out duration-150">
          19
        </span>
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
      >
        <span className="truncate">Remote Working Practices</span>
        <span className="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full bg-gray-100 group-hover:bg-gray-200 group-focus:bg-gray-200 transition ease-in-out duration-150">
          20+
        </span>
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
      >
        <span className="truncate">Remote Managers</span>
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
      >
        <span className="truncate">Remote Resources & Tools</span>
      </a>
      <a
        href="#"
        className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
      >
        <span className="truncate">Uncategorized</span>
      </a>
    </nav>
  )
}

export default Sidebar
