import React, { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { NextSeo } from "next-seo"
import Link from "next/link"

const RegisterPage = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")

  const { handleSubmit, register, watch, errors } = useForm()

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("")

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push("/")
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  })

  return (
    <>
      <NextSeo
        title={`Register for a Remotebond remote profile and join the future of work.`}
        description="Register now and join the future of work on Remotebond."
      />
      <form onSubmit={onSubmit} className="flex flex-col flex-1">
        <div className="relative overflow-hidden bg-black">
          <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
            <div>
              <h2 className="text-center text-3xl leading-9 font-extrabold text-white">
                Register your account
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <form className="mt-8" action="#" method="POST">
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Password"
                    ref={register({ required: "Password is required" })}
                  />
                </div>
                <div className="-mt-px">
                  <input
                    aria-label="Password"
                    name="password2"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Repeat password"
                    ref={register({
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
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
                    for="remember_me"
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
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign up
                </button>
              </div>
              <div className="mt-6 text-center">
                <Link as={`/login`} href={`/login`}>
                  <a className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                    Already have an account?
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </form>
    </>
  )
}

export default RegisterPage
