import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Transition } from "@headlessui/react"

const Sidebar = ({ categories }) => {
  const [isMobileSelectOpen, setIsMobileSelectOpen] = useState(false)
  const router = useRouter()
  const currentPath = router.pathname

  const toggleMobileSelect = () => {
    setIsMobileSelectOpen(!isMobileSelectOpen)
  }

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
      <div className="space-y-1 block md:hidden z-10 mb-6">
        <div className="relative">
          <span className="inline-block w-full rounded-md shadow-sm">
            <button
              onClick={toggleMobileSelect}
              type="button"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
              className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <div className="flex items-center space-x-3">
                <span
                  aria-label="Online"
                  className="bg-white flex-shrink-0 inline-block h-2 w-2 rounded-full"
                ></span>
                <span className="block truncate">All Categories</span>
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

          <Transition
            show={isMobileSelectOpen}
            enter=""
            enterFrom=""
            enterTo=""
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
              <ul
                tabIndex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-item-3"
                className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {categories.map((categoryData, midx) => {
                  const {
                    category: { data: category },
                  } = categoryData

                  let activeBgColor
                  switch (category.color) {
                    case "green":
                      activeBgColor = "bg-green-500"
                      break
                    case "teal":
                      activeBgColor = "bg-teal-500"
                      break
                    case "pink":
                      activeBgColor = "bg-pink-500"
                      break
                    case "yellow":
                      activeBgColor = "bg-yellow-500"
                      break
                    case "blue":
                      activeBgColor = "bg-blue-500"
                      break
                    default:
                      activeBgColor = "bg-indigo-500"
                  }

                  return (
                    <li
                      key={midx}
                      id="listbox-item-0"
                      role="option"
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-blue-600 hover:cursor-pointer"
                    >
                      <Link href={`/forum/${category.slug}`}>
                        <div className="flex items-center space-x-3">
                          {/* <!-- Online: "bg-green-400", Not Online: "bg-gray-200" --> */}
                          <span
                            aria-label="Online"
                            className={`flex-shrink-0 inline-block h-2 w-2 rounded-full ${activeBgColor}`}
                          ></span>
                          {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                          <span className="font-normal block truncate">
                            {category.title}
                          </span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

export default Sidebar
