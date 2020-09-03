import React, { useState } from "react"

const FilterBar = ({ categories }) => {
  const [activeIdx, setActiveIdx] = useState(-1)

  const setJobFilter = (idx) => {
    setActiveIdx(idx)
  }

  return (
    <div className="max-w-screen-xl mx-auto flex justify-center">
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        <button
          onClick={() => setJobFilter(-1)}
          type="button"
          className={`${
            activeIdx !== -1
              ? "relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              : "relative inline-flex items-center px-4 py-2 rounded-l-md border border-blue-300 bg-blue-500 text-sm leading-5 font-medium text-white hover:text-white focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-600 active:text-white transition ease-in-out duration-150"
          }`}
        >
          All
        </button>
        {categories.map((category, idx) => {
          return (
            <button
              onClick={() => setJobFilter(idx)}
              type="button"
              className={`${
                idx + 1 !== categories.length
                  ? "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:text-white hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-500 focus:bg-blue-500 active:text-gray-700 transition ease-in-out duration-150"
                  : "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 focus:text-white hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-500 focus:bg-blue-500 active:text-gray-700 transition ease-in-out duration-150"
              }`}
            >
              {category.data.title}
            </button>
          )
        })}
      </span>
    </div>
  )
}

export default FilterBar
