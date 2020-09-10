import React, { useState } from "react"

const FilterBar = ({ categories }) => {
  const [activeIdx, setActiveIdx] = useState(-1)

  const setJobFilter = (idx) => {
    if (idx === activeIdx) {
      setActiveIdx(-1)
    } else {
      setActiveIdx(idx)
    }
  }

  const onDropdownChange = (event) => {
    console.log(event.target.value)
    if (event.target.value === activeIdx) {
      setActiveIdx(-1)
    } else {
      setActiveIdx(event.target.value)
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto flex justify-center px-4 sm:px-6">
      <span className="relative z-0 shadow-sm rounded-md hidden sm:inline-flex">
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
              key={idx}
              onClick={() => setJobFilter(idx)}
              type="button"
              className={`${
                idx + 1 !== categories.length
                  ? "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium  focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-600 active:text-white transition ease-in-out duration-150"
                  : "-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm leading-5 font-medium focus:z-10 focus:outline-none focus:border-blue-300 active:bg-blue-600 active:text-white transition ease-in-out duration-150"
              } ${
                activeIdx === idx
                  ? "bg-blue-500 text-white hover:text-white active:text-white"
                  : "bg-white text-gray-700 hover:text-gray-500 active:text-white"
              }`}
            >
              {category.data.title}
            </button>
          )
        })}
      </span>
      <div className="block sm:hidden w-full">
        <select
          value={activeIdx}
          onChange={onDropdownChange}
          id="category"
          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
        >
          <option>All</option>
          {categories.map((category, idx) => {
            return (
              <option key={idx} value={idx}>
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
