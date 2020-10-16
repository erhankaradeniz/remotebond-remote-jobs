import React from "react"
import { useRouter } from "next/router"

import getAllUsers, { getUserByUsername } from "../../lib/user"

export async function getStaticPaths() {
  const users = await getAllUsers()
  if (users.length) {
    return {
      paths: users.map((user) => {
        return {
          params: {
            username: user.data.username,
          },
        }
      }),
      fallback: true,
    }
  } else {
    return {
      paths: [],
      fallback: true,
    }
  }
}

export async function getStaticProps(ctx) {
  const user = await getUserByUsername(ctx.params.username)
  const userData = JSON.parse(user)
  return {
    props: {
      user: {
        username: userData.data.username,
        profile_image: userData.data.profile_image
          ? userData.data.profile_image
          : "",
        first_name: userData.data.first_name ? userData.data.first_name : "",
        last_name: userData.data.last_name ? userData.data.last_name : "",
        about: userData.data.about ? userData.data.about : "",
        tagline: userData.data.tagline ? userData.data.tagline : "",
        tags: userData.data.tags ? userData.data.tags : "",
      },
    },
    revalidate: 1,
  }
}

const UserProfilePage = ({ user }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  } else {
    return (
      <div className="flex flex-col flex-1">
        <div className="relative overflow-hidden bg-black">
          <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div></div>
          </div>
        </div>
        <div className="flex flex-1 justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto w-full -my-14 relative z-10 mb-14">
            <div className="flex flex-col items-center justify-center mb-6">
              {user.profile_image ? (
                <img
                  className="inline-block h-28 w-28 rounded-md mb-2 shadow-md border-white border-2"
                  src={`${user.profile_image}`}
                  alt=""
                />
              ) : (
                <div className="inline-block h-28 w-28 rounded-md mb-2 shadow-md border-white border-2 bg-rb-gray-9 text-rb-gray-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="max-w-screen-lg text-rb-gray-8 text-center">
                <h1 className="font-medium text-xl">{`@${user.username}`}</h1>
                <p className="">
                  {user.tagline ? user.tagline : "Hello, I'm using Remotebond!"}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-full">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    General Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Personal details and links.
                  </p>
                </div>
                <div>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {`${user.first_name && user.first_name} ${
                          user.last_name && user.last_name
                        }`}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Skillset
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul className="flex flex-wrap">
                          {user.tags.length &&
                            user.tags.map((tag, idx) => {
                              return (
                                <li key={idx} className="mr-3 my-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-blue-100 text-blue-800">
                                    {tag}
                                  </span>
                                </li>
                              )
                            })}
                        </ul>
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {/* {`${user.email}`} */}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Salary expectation
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.salary_indication ? salary.indication : ""}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.about ? user.about : ""}
                      </dd>
                    </div>
                    {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm leading-5 font-medium text-gray-500">
                        Attachments
                      </dt>
                      <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                        <ul className="border border-gray-200 rounded-md">
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                            <div className="w-0 flex-1 flex items-center">
                              <svg
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                resume_back_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                          <li className="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                            <div className="w-0 flex-1 flex items-center">
                              <svg
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                coverletter_back_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div> */}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfilePage
