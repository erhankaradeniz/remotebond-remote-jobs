import React from "react"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-black mb-12">
      <div className="max-w-screen-xl mx-auto text-center py-12 md:py-28 px-4 sm:px-6">
        <h3 className="uppercase text-lg tracking-widest font-bold text-rb-gray-5">
          Remote jobs
        </h3>
        <h1 className="text-white font-black text-2xl md:text-6xl md:leading-45 my-4">
          Start working remotely and join the future of work
        </h1>
        <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
          Do you want to access talent{" "}
          <strong className="text-white">everywhere</strong>, or just in
          specific markets? If the answer is everywhere, look no further and let
          Remotebond help you.
        </h2>
        <span className="inline-flex rounded-md shadow-sm mt-8">
          <Link href={`/remote-jobs/new`} as={`/remote-jobs/new`}>
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-5 hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150">
              Post a job for $25
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Hero
