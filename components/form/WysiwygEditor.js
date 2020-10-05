import React, { useState } from "react"
import dynamic from "next/dynamic"
import classNames from "classnames"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
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
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
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

const WysiwygEditor = (props) => {
  const [value, setValue] = useState("")
  return (
    <QuillNoSSRWrapper
      modules={modules}
      value={value}
      onChange={setValue}
      formats={formats}
      theme="snow"
    />
  )
}

export default WysiwygEditor
