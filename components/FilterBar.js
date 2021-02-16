import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"

const FilterBar = ({ categories }) => {
  const router = useRouter()
  const currentPath = router.pathname

  const onDropdownChange = (event) => {
    router.push(event.target.value)
  }

  return (
    <div className="max-w-screen-xl w-full mx-auto flex justify-center px-4 sm:px-6">
      <span className="relative z-0 shadow-sm rounded-md hidden sm:inline-flex">
        <Link as={"/"} href={"/"}>
          <a
            className={`${
              currentPath !== "/"
                ? "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                : "relative inline-flex items-center px-4 py-2 rounded-l-md border border-blue-300 bg-blue-500 text-sm leading-5 font-medium text-white hover:text-white focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-600 active:text-white transition ease-in-out duration-150"
            }`}
          >
            All
          </a>
        </Link>
        {categories.map((category, idx) => {
          return (
            <Link
              key={idx}
              as={`/${category.data.slug}`}
              href={`/${category.data.slug}`}
              prefetch={false}
            >
              <a
                className={`${
                  idx + 1 !== categories.length
                    ? "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium  focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-600 active:text-white transition ease-in-out duration-150"
                    : "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-600 active:text-white transition ease-in-out duration-150"
                } ${
                  currentPath === `/${category.data.slug}`
                    ? "bg-blue-500 text-white hover:text-white active:text-white"
                    : "bg-white text-gray-700 hover:text-gray-500 active:text-white"
                }`}
              >
                {category.data.title}
              </a>
            </Link>
          )
        })}
      </span>
      <div className="block sm:hidden w-full">
        <label htmlFor="category" className="block text-sm text-center">
          Select Category
        </label>
        <select
          defaultValue={`${currentPath}`}
          onChange={onDropdownChange}
          id="category"
          name="category"
          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-2 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <option value={`/`}>All</option>
          {categories.map((category, idx) => {
            return (
              <option key={idx} value={`/${category.data.slug}`}>
                {category.data.title}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default FilterBar
