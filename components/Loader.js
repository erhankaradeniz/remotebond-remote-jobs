import React from "react"

const Loader = () => {
  return (
    <div className="flex flex-grow -mt-12 items-center justify-center min-h-full">
      <svg id="loader" width="75px" height="75px" viewBox="-1 -1 75 75">
        <rect
          fill="#fff"
          stroke="#1c64f2"
          strokeWidth="1"
          width="75px"
          height="75px"
        ></rect>
      </svg>
    </div>
  )
}

export default Loader
