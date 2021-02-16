import React, { useState } from "react"
import { Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/router"

import fetchJson from "../../lib/fetch"
import useUser from "../../lib/hooks/useUser"

const LoginModal = ({ isModalOpen, handleClose }) => {
  const router = useRouter()
  const { mutateUser } = useUser({
    redirectTo: router.pathname,
    redirectIfFound: true,
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { handleSubmit, register, watch, errors } = useForm()

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("")

    try {
      await mutateUser(
        fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      )
      handleClose()
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  })

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        isModalOpen ? "z-20" : "z-0 hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <Transition
            show={isModalOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-rb-gray-9 opacity-75"></div>
          </Transition>
        </div>
        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block relative align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <Transition
            show={isModalOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div>
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 flex items-center justify-center h-6 w-6 rounded-full bg-rb-gray-2"
              >
                <svg
                  className="h-3 w-3 text-rb-gray-9-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Login to post
                </h3>
                <p className="text-sm">
                  You need to be logged in to post on the forum
                </p>
                <div className="mt-2">
                  <div className="max-w-md w-full">
                    <form onSubmit={onSubmit} className="mt-8">
                      <input type="hidden" name="remember" value="true" />
                      <div className="rounded-md shadow-sm">
                        <div>
                          <input
                            aria-label="Email address"
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                            placeholder="Email address"
                            ref={register({ required: "Email is required" })}
                          />
                        </div>
                        <div className="-mt-px">
                          <input
                            aria-label="Password"
                            name="password"
                            type="password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                            placeholder="Repeat password"
                            ref={register({ required: "Password is required" })}
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember_me"
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                          />
                          <label
                            htmlFor="remember_me"
                            className="ml-2 block text-sm leading-5 text-gray-900"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm leading-5">
                          <a
                            href="#"
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                          >
                            Forgot your password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-6">
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        >
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                              className="h-5 w-5 text-blue-500 group-hover:text-blue-400 transition ease-in-out duration-150"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          Login
                        </button>
                      </div>
                      <div className="mt-6 text-center">
                        <Link as={`/register`} href={`/register`}>
                          <a className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                            Don't have an account?
                          </a>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
