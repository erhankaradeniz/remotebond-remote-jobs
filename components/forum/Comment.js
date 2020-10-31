import React, { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"

import TimeAgoWrapper from "../forum/TimeAgo"
import CommentEditor from "../forum/CommentEditor"

const Comment = ({ author, comment }) => {
  const defaultValues = { topic_comment: "" }
  const [isReplyBoxOpen, setIsReplyBoxOpen] = useState(false)
  const { handleSubmit, register, errors, watch, control, setValue } = useForm({
    defaultValues,
  })
  const isCommentEmpty = watch("topic_comment")

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

  const toggleCommentBox = () => {
    setIsReplyBoxOpen(!isReplyBoxOpen)
  }

  const onSubmit = (values, e) => {
    e.preventDefault()
  }

  return (
    <div className="border-rb-gray-2 border-l-3 pl-6">
      <span className="text-sm">
        {<Link href={`/u/${author.username}`}>{author.username}</Link>} ·{" "}
        {
          <span className="text-rb-gray-4">
            {comment && <TimeAgoWrapper date={comment.created_at} />}
          </span>
        }
      </span>
      <div
        className="mb-2"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      ></div>
      <div className="flex space-x-6">
        <div>
          <button
            onClick={toggleCommentBox}
            className="flex items-center text-sm leading-5 text-rb-gray-5 hover:text-blue-600 group"
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
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            {`Reply`}
          </button>
        </div>
        <div>
          <button className="flex items-center text-sm leading-5 text-rb-gray-5 hover:text-red-600 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4 group-hover:text-red-600`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {`Report`}
          </button>
        </div>
      </div>
      {isReplyBoxOpen && (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4">
          <CommentEditor
            control={control}
            inputError={errors}
            modules={modules}
            formats={formats}
            inputName={"topic_comment"}
          />
          <div className="mt-2 flex flex-col items-end">
            <button
              disabled={!isCommentEmpty || isCommentEmpty == "<p><br></p>"}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150 disabled:bg-rb-gray-4 disabled:cursor-not-allowed"
            >
              Comment
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Comment
