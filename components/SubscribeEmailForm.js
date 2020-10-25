import React from "react"

const SubscribeEmailForm = () => {
  return (
    <div className="px-6 py-6 bg-gray-100 md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center items-center">
        <div className="xl:w-0 xl:flex-1">
          <h2 className="text-xl leading-8 font-extrabold tracking-tight text-rb-gray-9 sm:text-2xl sm:leading-9 text-center md:text-left">
            Stop wasting time with job boards
          </h2>
          <p
            className="mt-3 max-w-3xl text-lg leading-6 text-rb-gray-8 "
            id="newsletter-headline"
          >
            Sign up for our (daily) free newsletter to stay up to date.
          </p>
        </div>
        <div className="mt-8 w-full sm:max-w-md xl:mt-0 xl:ml-8">
          <form
            action="/newsletter/subscribe"
            method="post"
            className="sm:flex"
            aria-labelledby="newsletter-headline"
          >
            <input
              type="hidden"
              name="_token"
              value="2WKNAG57RiWkV8vIGg7So1i5QhwEpQqDHF1rbjBe"
            />{" "}
            <input
              aria-label="Email address"
              type="email"
              name="email"
              required=""
              className="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 transition duration-150 ease-in-out"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubscribeEmailForm
