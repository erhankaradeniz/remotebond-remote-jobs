import React from "react"
import Link from "next/link"

import useUser from "../lib/hooks/useUser"

const Hero = () => {
  const { user } = useUser()
  return (
    <div id="hero" className="relative overflow-hidden bg-black">
      <div className="max-w-screen-xl relative mx-auto text-center py-12 md:py-28 px-4 sm:px-6 z-10">
        <h1 className="uppercase text-lg tracking-widest font-bold text-rb-gray-5">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Remote jobs
          </span>
        </h1>
        <h2 className="text-white font-black text-2xl md:text-5xl md:leading-45 my-4">
          Start working and hiring remotely and join the future of remote work
        </h2>
        <h3 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
          Do you want to access talent{" "}
          <strong className="text-white">everywhere</strong>, or just in
          specific markets? If the answer is everywhere, look no further and let
          Remotebond help you with your remote job / career.
        </h3>
        <div className="flex justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
          <span className="inline-flex rounded-md shadow-sm">
            <Link
              href={`/hire-remotely`}
              as={`/hire-remotely`}
              prefetch={false}
            >
              <a className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150">
                Post a job for $25
              </a>
            </Link>
          </span>
          {!user?.isLoggedIn && (
            <span className="inline-flex rounded-md">
              <Link href={`/register`} as={`/register`} prefetch={false}>
                <button
                  type="button"
                  className="inline-flex items-center border-rb-gray-8 px-6 py-3 border border-transparent font-bold text-base leading-6 rounded-md text-rb-gray-3 hover:text-rb-gray-8 hover:bg-white hover:border-white focus:outline-none active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                  Register account
                </button>
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
