import React from "react"

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="relative overflow-hidden bg-black mb-12">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
        <div>
          <h1 className="text-center text-3xl leading-10 font-extrabold text-white">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-rb-gray-4 text-center w-full">{subtitle}</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
