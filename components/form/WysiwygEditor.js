import React from "react"
import dynamic from "next/dynamic"
import { Controller } from "react-hook-form"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: true,
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

const WysiwygEditor = ({ control, inputError }) => {
  return (
    <Controller
      name="description"
      control={control}
      rules={{ required: "Description is required" }}
      render={(props) => {
        return (
          <QuillNoSSRWrapper
            modules={modules}
            value={props.value}
            onChange={props.onChange}
            formats={formats}
            theme="snow"
            className={`mt-1 form-input border ${
              !inputError.description
                ? "border-gray-300 focus:border-blue-300"
                : "border-red-300 focus:border-red-300"
            }  rounded-md shadow-sm`}
          />
        )
      }}
    />
  )
}

export default WysiwygEditor
