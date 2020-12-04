import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { Transition } from "@headlessui/react"

import useUser from "../lib/hooks/useUser"
import fetchJson from "../lib/fetch"

const HeaderNew = () => {
  const { user, mutateUser } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()
  const currentPath = router.pathname

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const logout = async (e) => {
    e.preventDefault()
    toggleDropdown()
    await mutateUser(fetchJson("/api/logout"))
    router.push("/login")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let query = searchQuery
      .replace(/[\"\'~`!@#$%^&()_={}[\]:;,.<>+\/?-]+|\d+|^\s+$/g, "")
      .replace(/\s+/gi, " ")
    router.push(`/search/${query.toLowerCase()}`)
  }

  const emptyQuery = () => {
    setSearchQuery("")
  }

  return (
    <nav className="bg-white shadow z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 xl:px-8">
        <div className="relative flex justify-between h-16">
          <div className="flex-grow-0 xl:flex-auto flex items-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              {/* Normal Logo  */}
              <Link href={`/`} as={`/`} prefetch={false}>
                <a title="Return to homepage">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden xl:block h-4 w-auto"
                    viewBox="0 0 415 54"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="#161E2E"
                        fillRule="nonzero"
                        d="M28.807 53l-9.41-19.228h-6.851V53H.682V.636H20.83c6.187 0 10.87 1.449 14.05 4.347C38.057 7.88 39.647 11.886 39.647 17c0 3.664-.801 6.677-2.404 9.038-1.602 2.36-3.639 4.214-6.11 5.561L41.796 53H28.807zM12.546 10.454v13.602h8.284c2.096 0 3.797-.55 5.1-1.649 1.305-1.1 1.957-2.8 1.957-5.1 0-2.25-.64-3.955-1.918-5.114-1.278-1.16-2.992-1.739-5.14-1.739h-8.283zm47.969 43.262c-5.983 0-10.7-1.743-14.152-5.23-3.452-3.485-5.178-8.322-5.178-14.51 0-3.988.733-7.546 2.2-10.674 1.465-3.128 3.613-5.59 6.442-7.389 2.83-1.798 6.29-2.697 10.381-2.697 5.42 0 9.759 1.627 13.014 4.883 3.256 3.256 4.884 7.798 4.884 13.628v4.909H52.41c.307 2.335 1.1 4.197 2.378 5.587 1.278 1.389 3.153 2.083 5.625 2.083 1.568 0 2.816-.264 3.745-.792.93-.529 1.645-1.185 2.148-1.969.503-.784.89-1.568 1.163-2.352l10.33 2.761c-.409 1.705-1.257 3.465-2.544 5.28-1.287 1.815-3.128 3.35-5.523 4.602-2.395 1.253-5.467 1.88-9.217 1.88zm-.41-31.194c-1.925 0-3.502.576-4.73 1.726-1.227 1.15-2.096 2.757-2.607 4.82h14.395c0-1.841-.601-3.392-1.803-4.654-1.202-1.261-2.953-1.892-5.254-1.892zm54.976 6.137v24.34h-11.352V28.455c0-2.096-.516-3.61-1.547-4.538-1.032-.93-2.289-1.394-3.772-1.394-1.33 0-2.463.43-3.4 1.292-.938.86-1.406 2.339-1.406 4.436V53H81.842V13.727h11.455v4.193h.307c1.125-1.38 2.51-2.51 4.154-3.388 1.645-.878 3.67-1.316 6.073-1.316 4.704 0 7.909 1.806 9.613 5.42h.41c1.073-1.585 2.556-2.885 4.448-3.9 1.893-1.013 4.091-1.52 6.597-1.52 2.216 0 4.227.481 6.034 1.444 1.807.963 3.247 2.557 4.321 4.781 1.074 2.225 1.611 5.23 1.611 9.013V53h-11.761V28.454c0-2.25-.473-3.801-1.42-4.653-.945-.853-2.109-1.279-3.49-1.279-1.585 0-2.833.486-3.745 1.458-.912.971-1.368 2.531-1.368 4.679zm43.623 25.057c-3.853 0-7.16-.874-9.92-2.621-2.762-1.747-4.884-4.15-6.367-7.21-1.483-3.06-2.225-6.567-2.225-10.522 0-3.954.742-7.444 2.225-10.47 1.483-3.025 3.605-5.395 6.366-7.108 2.762-1.713 6.068-2.57 9.92-2.57 3.853 0 7.16.857 9.921 2.57 2.761 1.713 4.884 4.083 6.367 7.108 1.482 3.026 2.224 6.516 2.224 10.47 0 3.955-.742 7.462-2.224 10.522-1.483 3.06-3.606 5.463-6.367 7.21-2.761 1.747-6.068 2.62-9.92 2.62zm0-9.41c2.659 0 4.55-1.005 5.676-3.017 1.125-2.011 1.687-4.653 1.687-7.926 0-3.272-.562-5.897-1.687-7.875-1.125-1.977-3.017-2.966-5.676-2.966-2.66 0-4.552.989-5.677 2.966-1.125 1.978-1.687 4.603-1.687 7.875 0 3.273.562 5.915 1.687 7.926 1.125 2.012 3.017 3.017 5.677 3.017zm42.6-30.58v8.183h-6.137v18.716c0 1.483.32 2.416.959 2.8.64.383 1.445.575 2.416.575.358 0 .767-.026 1.227-.077a7.51 7.51 0 001.228-.23l1.738 8.693c-.334.143-1.124.35-2.372.619l-.274.059c-1.406.298-3.183.447-5.33.447-2.115 0-4.028-.473-5.74-1.419-1.714-.946-3.078-2.276-4.092-3.989-1.014-1.713-1.521-3.728-1.521-6.047V21.91h-4.398v-8.182h4.398V5.34h11.761v8.386h6.137zm21.327 39.99c-5.983 0-10.7-1.743-14.152-5.23-3.452-3.485-5.178-8.322-5.178-14.51 0-3.988.733-7.546 2.2-10.674 1.465-3.128 3.613-5.59 6.442-7.389 2.83-1.798 6.29-2.697 10.381-2.697 5.42 0 9.759 1.627 13.014 4.883 3.256 3.256 4.884 7.798 4.884 13.628v4.909h-25.696c.307 2.335 1.1 4.197 2.378 5.587 1.278 1.389 3.153 2.083 5.625 2.083 1.568 0 2.816-.264 3.745-.792.93-.529 1.645-1.185 2.148-1.969.503-.784.89-1.568 1.163-2.352l10.33 2.761c-.41 1.705-1.257 3.465-2.544 5.28-1.287 1.815-3.128 3.35-5.523 4.602-2.395 1.253-5.467 1.88-9.217 1.88zm-.41-31.194c-1.925 0-3.502.576-4.73 1.726-1.227 1.15-2.096 2.757-2.607 4.82h14.395c0-1.841-.601-3.392-1.803-4.654-1.202-1.261-2.953-1.892-5.254-1.892zM243.959.636h11.761V17.92h.41c.664-1.483 1.785-2.638 3.362-3.464 1.577-.827 3.388-1.24 5.433-1.24 2.625 0 5.088.728 7.39 2.186 2.3 1.457 4.167 3.673 5.599 6.647 1.432 2.975 2.147 6.746 2.147 11.314 0 4.466-.686 8.2-2.058 11.2-1.372 3-3.204 5.258-5.497 6.775-2.293 1.517-4.82 2.275-7.581 2.275-2.045 0-3.856-.396-5.433-1.189-1.577-.792-2.698-1.93-3.362-3.413h-.512V53h-11.659V.636zm25.057 32.727c0-3.426-.635-6.09-1.905-7.99-1.27-1.9-3.158-2.85-5.663-2.85-1.807 0-3.222.485-4.245 1.457-1.022.971-1.747 2.275-2.173 3.912-.426 1.636-.639 3.46-.639 5.471 0 1.978.204 3.797.614 5.46.409 1.661 1.125 2.99 2.147 3.988 1.023.997 2.455 1.495 4.296 1.495 2.505 0 4.393-.967 5.663-2.902 1.27-1.934 1.905-4.615 1.905-8.04zm32.066 20.353c-3.852 0-7.16-.874-9.92-2.621-2.762-1.747-4.884-4.15-6.367-7.21-1.483-3.06-2.225-6.567-2.225-10.522 0-3.954.742-7.444 2.225-10.47 1.483-3.025 3.605-5.395 6.366-7.108 2.762-1.713 6.069-2.57 9.92-2.57 3.853 0 7.16.857 9.921 2.57 2.762 1.713 4.884 4.083 6.367 7.108 1.483 3.026 2.224 6.516 2.224 10.47 0 3.955-.741 7.462-2.224 10.522-1.483 3.06-3.605 5.463-6.367 7.21-2.761 1.747-6.068 2.62-9.92 2.62zm0-9.41c2.659 0 4.551-1.005 5.676-3.017 1.125-2.011 1.687-4.653 1.687-7.926 0-3.272-.562-5.897-1.687-7.875-1.125-1.977-3.017-2.966-5.676-2.966-2.66 0-4.551.989-5.676 2.966-1.125 1.978-1.688 4.603-1.688 7.875 0 3.273.563 5.915 1.688 7.926 1.125 2.012 3.017 3.017 5.676 3.017zm34.009-12.17V53h-11.761V13.727h10.84v4.193h.41c1.125-1.432 2.599-2.574 4.423-3.426 1.824-.852 3.86-1.278 6.11-1.278 2.217 0 4.33.481 6.342 1.444 2.011.963 3.656 2.557 4.934 4.781 1.279 2.225 1.918 5.23 1.918 9.013V53h-11.762V28.863c0-2.096-.54-3.677-1.623-4.743-1.082-1.065-2.416-1.598-4.002-1.598-2.198 0-3.72.912-4.563 2.736-.844 1.824-1.266 4.117-1.266 6.878zm62.645-31.5V53h-11.659V49.01h-.511c-.665 1.483-1.786 2.62-3.362 3.413-1.577.793-3.388 1.19-5.434 1.19-2.76 0-5.288-.76-7.58-2.276-2.293-1.517-4.125-3.776-5.498-6.776-1.372-3-2.058-6.733-2.058-11.199 0-4.568.716-8.34 2.148-11.314 1.432-2.974 3.298-5.19 5.6-6.647 2.3-1.458 4.763-2.186 7.388-2.186 2.046 0 3.857.413 5.434 1.24 1.576.826 2.697 1.981 3.362 3.464h.409V.636h11.761zm-17.488 21.886c-2.506 0-4.394.95-5.664 2.851-1.27 1.9-1.904 4.564-1.904 7.99s.635 6.107 1.904 8.041c1.27 1.935 3.158 2.902 5.664 2.902 1.84 0 3.272-.498 4.295-1.495 1.023-.997 1.739-2.327 2.148-3.989.409-1.662.614-3.481.614-5.459 0-2.011-.213-3.835-.64-5.471-.426-1.637-1.15-2.94-2.173-3.912-1.023-.972-2.437-1.458-4.244-1.458z"
                      />
                      <path fill="#3C99F7" d="M403 41h12v12h-12z" />
                    </g>
                  </svg>
                </a>
              </Link>
              {/* Logo small */}
              <Link href={`/`} as={`/`} prefetch={false}>
                <a title="Return to homepage">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="block xl:hidden h-8 w-auto mt-1 text-blue-600"
                  >
                    <g fill="none" fillRule="evenodd">
                      <rect fill="currentColor" width="32" height="32" rx="4" />
                      <path
                        d="M12.36 22.095l-2.351-4.756H8.297v4.756H5.333V9.143h5.033c1.546 0 2.716.358 3.51 1.075.794.717 1.191 1.708 1.191 2.972 0 .907-.2 1.652-.6 2.236-.4.584-.909 1.043-1.526 1.376l2.663 5.293h-3.245zM8.296 11.571v3.365h2.07c.523 0 .948-.136 1.274-.408.325-.272.488-.692.488-1.262 0-.556-.16-.978-.479-1.265-.32-.286-.747-.43-1.284-.43H8.297zM21.71 9.143c1.584 0 2.764.33 3.539.993.775.662 1.162 1.511 1.162 2.549 0 .691-.18 1.275-.543 1.751-.362.477-.947.797-1.756.962v.095c.779.1 1.4.432 1.862.992.462.561.693 1.259.693 2.094 0 1.05-.386 1.898-1.156 2.545-.771.648-1.885.971-3.34.971h-5.366V9.143h4.905zm.332 7.412h-2.274v3.112h2.172c.639 0 1.1-.132 1.386-.396.285-.263.428-.629.428-1.097a1.73 1.73 0 00-.396-1.141c-.264-.319-.703-.478-1.316-.478zm-.408-4.984h-1.866v2.96h1.687c.715 0 1.23-.117 1.545-.35.316-.235.473-.598.473-1.092 0-.261-.052-.508-.156-.74-.105-.232-.29-.42-.556-.563-.266-.143-.642-.215-1.127-.215z"
                        fill="#FFF"
                        fillRule="nonzero"
                      />
                    </g>
                  </svg>
                </a>
              </Link>
            </div>
            <div className="hidden md:ml-6 xl:flex">
              <Link href={`/remote-jobs`} as={`/remote-jobs`} prefetch={false}>
                <a
                  className={`${
                    currentPath === "/remote-jobs"
                      ? "inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                      : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  }`}
                  title="Remote jobs on Remotebond"
                >
                  Remote jobs
                </a>
              </Link>
              <Link
                href={`/remote-companies`}
                as={`/remote-companies`}
                prefetch={false}
              >
                <a
                  className={`${
                    currentPath === "/remote-companies"
                      ? "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                      : "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  }`}
                  title="Remote companies on Remotebond"
                >
                  Remote companies
                </a>
              </Link>
              <Link href={`/forum`} as={`/forum`} prefetch={false}>
                <a
                  className={`${
                    currentPath === "/forum"
                      ? "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                      : "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  }`}
                  title="Remotebond forum"
                >
                  Forum
                </a>
              </Link>
              <Link
                href={`/frequently-asked-questions`}
                as={`/frequently-asked-questions`}
                prefetch={false}
              >
                <a
                  className={`${
                    currentPath === "/frequently-asked-questions"
                      ? "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-blue-700 transition duration-150 ease-in-out"
                      : "ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                  }`}
                  title="Frequently asked questions about remotebond"
                >
                  Faq
                </a>
              </Link>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center px-2 ml-4 xl:ml-6 xl:justify-end">
            <div className="max-w-lg w-full xl:max-w-xs">
              <label htmlFor="searchq" className="sr-only">
                Search
              </label>
              <div className="mt-1 flex">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <form onSubmit={handleSubmit} className="w-full">
                    <input
                      type="text"
                      name="searchq"
                      id="searchq"
                      className="border focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md shadow-sm py-2 pl-10 sm:text-sm border-gray-300"
                      placeholder="Search for job titles"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                    />
                  </form>
                  {searchQuery && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button onClick={emptyQuery}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 text-gray-400 hover:text-blue-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {/* <!-- Profile dropdown --> */}
            <div className="ml-3 relative hidden xl:block z-20">
              {user?.isLoggedIn ? (
                <button
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  {user.profile_image ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={`${user.profile_image}`}
                      alt=""
                    />
                  ) : (
                    <div className="h-8 w-8 bg-rb-gray-9 text-rb-gray-5 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ) : (
                <Link href="/login" prefetch={false}>
                  <a className="text-rb-gray-5 hover:text-blue-500">Sign in</a>
                </Link>
              )}
              {/* <!--
            Profile dropdown panel, show/hide based on dropdown state.*/}
              <Transition
                show={isDropdownOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20">
                  {user?.isLoggedIn && (
                    <div
                      className="py-1 rounded-md bg-white shadow-xs"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu"
                    >
                      <>
                        <Link
                          href={`/u/${user.username}`}
                          as={`/u/${user.username}`}
                          prefetch={false}
                        >
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                            role="menuitem"
                          >
                            Your Profile
                          </a>
                        </Link>
                        <Link
                          href={`/my/settings`}
                          as={`/my/settings`}
                          prefetch={false}
                        >
                          <a
                            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                            role="menuitem"
                          >
                            Settings
                          </a>
                        </Link>
                        <a
                          className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                          role="menuitem"
                          onClick={(e) => logout(e)}
                        >
                          Sign out
                        </a>
                      </>
                    </div>
                  )}
                </div>
              </Transition>
            </div>
            <span className="hidden xl:inline-flex rounded-md shadow-sm ml-3">
              <Link
                href={`/hire-remotely`}
                as={`/hire-remotely`}
                prefetch={false}
              >
                <a className="inline-flex items-center px-4 py-3 border border-transparent text-base leading-4 font-bold rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 hover:text-white transition ease-in-out duration-150">
                  Post a job
                </a>
              </Link>
            </span>

            <div className="flex items-center xl:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={toggleMobileMenu}
              >
                {/* <!-- Icon when menu is closed. --> */}
                <svg
                  className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* <!-- Icon when menu is open. -->*/}
                <svg
                  className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  --> */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} xl:hidden`}>
        <div className="pt-2 pb-4">
          <Link href={`/remote-jobs`} as={`/remote-jobs`} prefetch={false}>
            <a
              title="Remote jobs on Remotebond"
              className={`${
                currentPath === "/remote-jobs"
                  ? "block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              }`}
            >
              Remote jobs
            </a>
          </Link>
          <Link
            href={`/remote-companies`}
            as={`/remote-companies`}
            prefetch={false}
          >
            <a
              title="Remote companies on Remotebond"
              className={`${
                currentPath === "/remote-companies"
                  ? "block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out"
                  : "block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              }`}
            >
              Remote companies
            </a>
          </Link>
          <Link href={`/forum`} as={`/forum`} prefetch={false}>
            <a
              className={`${
                currentPath === "/forum"
                  ? "mt-1 block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out"
                  : "mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              }`}
            >
              Forum
            </a>
          </Link>
          <Link
            href={`/frequently-asked-questions`}
            as={`/frequently-asked-questions`}
            prefetch={false}
          >
            <a
              className={`${
                currentPath === "/frequently-asked-questions"
                  ? "mt-1 block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50 focus:outline-none focus:text-blue-800 focus:bg-blue-100 focus:border-blue-700 transition duration-150 ease-in-out"
                  : "mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              }`}
            >
              Faq
            </a>
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user?.isLoggedIn ? (
            <>
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  {user.profile_image ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`${user.profile_image}`}
                      alt=""
                    />
                  ) : (
                    <div className="h-10 w-10 bg-rb-gray-9 text-rb-gray-5 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-6 text-gray-800">
                    {user.username}
                  </div>
                  <div className="text-sm font-medium leading-5 text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link
                  href={`/u/${user.username}`}
                  as={`/u/${user.username}`}
                  prefetch={false}
                >
                  <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6">
                    Your Profile
                  </a>
                </Link>
                <Link
                  href={`/my/settings`}
                  as={`/my/settings`}
                  prefetch={false}
                >
                  <a className="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6">
                    Settings
                  </a>
                </Link>
                <button
                  className="mt-1 w-full block text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out sm:px-6"
                  onClick={(e) => logout(e)}
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div>
              <Link href={`/register`} as={`/register`} prefetch={false}>
                <a className="flex mx-4 sm:mx-6 justify-center items-center px-4 py-3 border border-transparent text-base leading-4 font-bold rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 hover:text-white transition ease-in-out duration-150">
                  Register
                </a>
              </Link>
              <Link href={`/login`} as={`/login`}>
                <a className="flex mx-4 sm:mx-6 mt-3 justify-center items-center px-4 py-3 border border-transparent text-base leading-4 font-bold rounded-md text-gray-500 bg-white hover:bg-blue-100 focus:outline-none focus:shadow-outline-blue hover:text-blue-600 transition ease-in-out duration-150">
                  Sign in
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default HeaderNew
