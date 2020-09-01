import React from "react"

import Header from "../components/Header"

const indexPage = () => {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <div className="max-w-screen-xl mx-auto text-center py-28">
        <h4 className="uppercase tracking-wider font-semibold text-blue-500">
          Remote jobs
        </h4>
        <h2 className="font-black text-6xl leading-45 my-4">
          Help shape the future by working remotely
        </h2>
        <p className="text-xl text-gray-800 w-3/4 mx-auto">
          RemoteBond helps streamline software projects, sprints, tasks, and bug
          tracking. It's built for high-performance teams.
        </p>
      </div>
    </div>
  )
}

export default indexPage
