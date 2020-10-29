import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Sidebar = ({ categories }) => {
  const router = useRouter()
  const currentPath = router.pathname
  return (
    <>
      <nav className="w-64 hidden md:block">
        <Link href={`/forum`}>
          <a
            className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            aria-current="page"
          >
            <span className="truncate">All Categories</span>
            {/* <span className="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full bg-white transition ease-in-out duration-150">
              5
            </span> */}
          </a>
        </Link>
        {categories.map(({ category: category }, idx) => {
          const { title, slug, color } = category.data
          let activeColor
          switch (color) {
            case "green":
              activeColor = "text-green-500"
              break
            case "teal":
              activeColor = "text-teal-500"
              break
            case "pink":
              activeColor = "text-pink-500"
              break
            case "yellow":
              activeColor = "text-yellow-500"
              break
            case "blue":
              activeColor = "text-blue-500"
              break
            default:
              activeColor = "text-indigo-500"
          }
          return (
            <Link href={`/forum/${slug}`} key={idx}>
              <a
                className="mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition ease-in-out duration-150"
                aria-current="page"
              >
                <span className="truncate inline-flex items-center">
                  <svg
                    className={`mr-1.5 h-2 w-2 ${activeColor}`}
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  {title}
                </span>
                {/* <span className="ml-auto inline-block py-0.5 px-3 text-xs leading-4 rounded-full bg-white transition ease-in-out duration-150">
              5
            </span> */}
              </a>
            </Link>
          )
        })}
      </nav>
      {/* // Mobile select menu  */}
      <div className="space-y-1 block md:hidden">
        <div className="relative">
          <span className="inline-block w-full rounded-md shadow-sm">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <div className="flex items-center space-x-3">
                {/* <!-- On: "bg-green-400", Off: "bg-gray-200" --> */}
                <span
                  aria-label="Online"
                  className="bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full"
                ></span>
                <span className="block truncate">Tom Cook</span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </span>

          {/* <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
            <ul
              tabIndex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
            >
              {/* <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        --> */}
              <li
                id="listbox-item-0"
                role="option"
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
              >
                <div className="flex items-center space-x-3">
                  {/* <!-- Online: "bg-green-400", Not Online: "bg-gray-200" --> */}
                  <span
                    aria-label="Online"
                    className="bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full"
                  ></span>
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span className="font-normal block truncate">
                    Wade Cooper
                  </span>
                </div>

                {/* <!--
            Checkmark, only display for selected option.

            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
          --> */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  {/* <!-- Heroicon name: check --> */}
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
