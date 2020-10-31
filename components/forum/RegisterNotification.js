import React from "react"

const RegisterNotification = () => {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm leading-5 font-medium text-blue-800">
            Register a free account
          </h3>
          <div className="mt-2 text-sm leading-5 text-blue-700">
            <p className="mb-1">
              Hello! Looks like you’re enjoying the discussion, but you haven’t
              signed up for an account yet.
            </p>
            <p>
              When you create an account, we remember exactly what you’ve read,
              so you always come right back where you left off. You also get
              notifications, here and via email, whenever someone replies to
              you. And you can like posts to share the love.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button className="px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 transition ease-in-out duration-150">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterNotification
