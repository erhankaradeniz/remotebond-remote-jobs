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
      user: userData.data,
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
          <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
            <div>
              <h2 className="text-center text-3xl leading-9 font-extrabold text-white">
                {user.username}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <p>Profile page is coming with the next update. Stay tuned!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfilePage
