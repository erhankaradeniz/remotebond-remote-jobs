import React from "react"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

import useUser from "../../../lib/hooks/useUser"

import { getTopicBySlug, getAllTopics } from "../../../lib/forumTopics"
import RegisterNotification from "../../../components/forum/RegisterNotification"
import Comment from "../../../components/forum/Comment"
import CommentEditor from "../../../components/forum/CommentEditor"

export async function getStaticProps(ctx) {
  // Forum related calls
  const topic = await getTopicBySlug(ctx.params.slug)
  const notFound = !topic
  if (!notFound) {
    const topicData = JSON.parse(topic)
    return {
      props: {
        topic: topicData,
      },
      revalidate: 1,
    }
  } else {
    return {
      props: {},
      notFound,
    }
  }
}

export async function getStaticPaths() {
  const topics = await getAllTopics()
  const topicsData = JSON.parse(topics)
  if (topicsData?.data.length) {
    return {
      paths: topicsData.data.map((data) => {
        return {
          params: {
            category: data.category.data.slug,
            slug: data.topic.data.slug,
          },
        }
      }),
      fallback: "blocking",
    }
  } else {
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

const ForumTopicPage = (props) => {
  const router = useRouter()
  const {
    topic: { data: topic, ref: topic_ref },
    author: { data: author },
    category: { data: category },
    comments: { data: comments },
  } = props.topic
  const defaultValues = { topic_comment: "" }
  const { user } = useUser()
  const { handleSubmit, register, errors, watch, control, setValue } = useForm({
    defaultValues,
  })

  const isCommentEmpty = watch("topic_comment")

  // Date manipulations
  const pubDate = new Date(topic.created_at)
  const pubDateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ]

  // Setup category coloring
  let activeTextColor, activeBgColor
  switch (category.color) {
    case "green":
      activeTextColor = "text-green-800"
      activeBgColor = "bg-green-100"
      break
    case "teal":
      activeTextColor = "text-teal-800"
      activeBgColor = "bg-teal-100"
      break
    case "pink":
      activeTextColor = "text-pink-800"
      activeBgColor = "bg-pink-100"
      break
    case "yellow":
      activeTextColor = "text-yellow-800"
      activeBgColor = "bg-yellow-100"
      break
    case "blue":
      activeTextColor = "text-blue-800"
      activeBgColor = "bg-blue-100"
      break
    default:
      activeTextColor = "text-indigo-800"
      activeBgColor = "bg-indigo-100"
  }

  const shareArticle = () => {
    console.log("Sharing article")
  }

  const onSubmit = async (values, e) => {
    e.preventDefault()

    const commentResponse = await fetch(
      `${window.location.origin}/api/forum/comment/new`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_comment: values.topic_comment,
          topic_ref: topic_ref["@ref"].id,
        }),
      }
    )
    commentResponse.ok && router.reload()
  }

  let strippedDescription = topic.content.replace(/(<([^>]+)>)/gi, "")

  return (
    <>
      <NextSeo
        title={`${topic.title}`}
        description={`${strippedDescription.substring(0, 110)}...`}
        canonical={`https://remotebond.com/forum/${category.slug}/${topic.slug}`}
        openGraph={{
          url: `https://remotebond.com/forum/${category.slug}/${topic.slug}`,
          title: `${topic.title}`,
          description: `${strippedDescription.substring(0, 110)}...`,
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
            name: "Forum",
          },
        ]}
      />
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
          <div>
            <h1 className="text-center text-3xl mb-1 font-extrabold text-white">
              {topic.title}
            </h1>
            <h2 className="text-rb-gray-4 text-center w-full">
              {`This question was asked by`}
              <Link href={`/u/${author.username}`}>
                <a
                  className="mx-2 text-white hover:underline"
                  title={`${author.username} remote worker profile on Remotebond`}
                >
                  {author.username}
                </a>
              </Link>
              {`in the`}
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full mx-2 ${activeBgColor} ${activeTextColor}`}
              >
                {category.title}
              </span>
              {`category on`}
              {` `}
              {pubDate.toLocaleDateString("en-US", pubDateOptions)}
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl w-full mx-auto pt-4 pb-12 px-4 sm:px-6 flex flex-col">
        <div>
          <div>
            <div className="mb-1">
              <span className="text-sm text-rb-gray-4">
                Posted by{" "}
                <Link
                  href={`/u/${author.username}`}
                >{`${author.username}`}</Link>
              </span>
            </div>
            <div
              className="topic_questionContainer text-rb-gray-8"
              dangerouslySetInnerHTML={{ __html: topic.content }}
            ></div>
          </div>

          {/* Actions bar */}
          <div className="flex my-5">
            <div
              className={`mr-6 flex items-center text-sm leading-5 text-rb-gray-5`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              {`${comments.length} comments`}
            </div>
            <div className={`mr-6`}>
              <button
                className="flex items-center text-sm leading-5 text-rb-gray-5 hover:text-blue-600 group"
                onClick={shareArticle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4 group-hover:text-blue-600`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                {`Share`}
              </button>
            </div>
          </div>
        </div>
        {topic.isLocked && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </span>
            <p className="text-xl font-medium">Commenting disabled</p>
            <p className="text-rb-gray-4">You cannot comment on this post.</p>
          </div>
        )}
        {/* Only show when a user is logged in */}
        {user?.isLoggedIn && !topic.isLocked && (
          <>
            {/* Post container with editor in it */}
            <div className="border-b border-rb-gray-2 pb-4">
              <p className="text-xs">
                Comment as{" "}
                <Link href={`/u/${user.username}`}>{user.username}</Link>
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CommentEditor
                  control={control}
                  inputError={errors}
                  modules={modules}
                  formats={formats}
                  inputName={"topic_comment"}
                />
                <div className="mt-4 flex flex-col items-end">
                  {/* // Quill Editor does not empty totally and we need to check for the empty paragraph */}
                  <button
                    disabled={
                      !isCommentEmpty || isCommentEmpty == "<p><br></p>"
                    }
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150 disabled:bg-rb-gray-4 disabled:cursor-not-allowed"
                  >
                    Comment
                  </button>
                </div>
              </form>
            </div>

            {/* Comments container  */}
            <div>
              {/* No comments */}
              {!comments.length && (
                <div className="flex flex-col items-center justify-center py-16">
                  <span className="text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </span>
                  <p className="text-xl font-medium">No Comments Yet</p>
                  <p className="text-rb-gray-4">
                    Be the first to share what you think!
                  </p>
                </div>
              )}

              <div className="flex flex-col pt-8 space-y-6">
                {comments.length > 0 &&
                  comments.map((commentObj, idx) => {
                    const {
                      comment: { data: comment },
                      author: { data: author },
                    } = commentObj
                    return (
                      <Comment key={idx} author={author} comment={comment} />
                    )
                  })}
              </div>
            </div>
          </>
        )}

        {/* Only show this message to a user who's not logged in */}
        {!user?.isLoggedIn && <RegisterNotification />}
      </div>
    </>
  )
}

export default ForumTopicPage
