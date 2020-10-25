import React, { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"
import Link from "next/link"
import fetchJson from "../lib/fetch"
import useUser from "../lib/hooks/useUser"
import Alert from "../components/dialog/Alert"

const RegisterPage = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  })
  const [errorMessage, setErrorMessage] = useState("")

  const { handleSubmit, register, watch, errors } = useForm()

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage("")

    try {
      await mutateUser(
        fetchJson("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      )
    } catch (error) {
      setErrorMessage(error.data.message)
    }
  })

  return (
    <>
      <NextSeo
        title={`Register for a Remotebond remote profile and join the future of remote work.`}
        description="Register now and join the future of remote work on Remotebond."
        canonical={`https://remotebond.com/register`}
        openGraph={{
          url: `https://remotebond.com/register`,
          title: `Register for a Remotebond remote profile and join the future of remote work.`,
          description: `Register now and join the future of remote work on Remotebond.`,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "remotebond.com",
            item: "https://remotebond.com",
          },
          {
            position: 2,
            name: "Register",
          },
        ]}
      />
      <div className="flex flex-col flex-1">
        <div className="relative overflow-hidden bg-black">
          <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
            <div>
              <h1 className="text-center text-3xl leading-9 font-extrabold text-white">
                Register your account
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            {Object.keys(errors).length !== 0 && (
              <Alert
                title={`There ${
                  Object.keys(errors).length > 1 ? "are" : "is"
                } ${Object.keys(errors).length} ${
                  Object.keys(errors).length > 1 ? "errors" : "error"
                } with your submission`}
                message={`Please fix the marked ${
                  Object.keys(errors).length > 1 ? "fields" : "field"
                } and try submitting your job post again`}
              />
            )}
            {errorMessage && <Alert title="Errors" message={errorMessage} />}
            <form onSubmit={onSubmit} className="mt-8">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm">
                <div>
                  <input
                    aria-label="Username"
                    name="username"
                    type="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                    placeholder="Username"
                    ref={register({ required: "Username is required" })}
                  />
                </div>
                <div className="-mt-px">
                  <input
                    aria-label="Email address"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
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
      </div>
    </>
  )
}

export default RegisterPage
