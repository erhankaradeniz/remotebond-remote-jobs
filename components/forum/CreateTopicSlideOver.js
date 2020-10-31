import React from "react"
import { Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"

import CreateTopicEditor from "./CreateTopicEditor"

const CreateTopicSliderOver = ({ isOpen, handleClose, categories }) => {
  const defaultValues = {
    topic_content: "",
    topic_title: "",
    topic_category: "",
  }
  const { handleSubmit, register, errors, watch, control } = useForm({
    defaultValues,
  })
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

  const onSubmit = async (values, e) => {
    const commentResponse = await fetch(
      `${window.location.origin}/api/forum/topic/new`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic_title: values.topic_title,
          topic_category: values.topic_category,
          topic_content: values.topic_content,
        }),
      }
    )
    handleClose()
    // commentResponse.ok && router.reload()
  }

  return (
    <div className={`fixed inset-0 overflow-hidden ${isOpen ? "z-30" : "z-0"}`}>
      <div className={`absolute inset-0 ${isOpen ? "z-20" : "z-0 hidden"}`}>
        <Transition
          show={isOpen}
          enter="ease-in-out duration-500 sm:duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500 sm:duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-screen h-screen bg-rb-gray-9 opacity-75"></div>
        </Transition>
      </div>
      <div
        className={`absolute inset-0 overflow-hidden ${
          isOpen ? "z-30" : "z-0 hidden"
        }`}
      >
        <section className="absolute inset-y-0 pl-0 sm:pl-16 max-w-full right-0 flex">
          <Transition
            show={isOpen}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="w-screen max-w-screen sm:max-w-md h-full">
              <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                <div className="flex-1 h-0 overflow-y-auto">
                  <header className="space-y-1 py-6 px-4 bg-blue-700 sm:px-6">
                    <div className="flex items-center justify-between space-x-3">
                      <h2 className="text-lg leading-7 font-medium text-white">
                        New Topic
                      </h2>
                      <div className="h-7 flex items-center">
                        <button
                          onClick={handleClose}
                          aria-label="Close panel"
                          className="text-blue-200 hover:text-white transition ease-in-out duration-150"
                        >
                          {/* <!-- Heroicon name: x --> */}
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm leading-5 text-blue-300">
                        Get started by filling in the information below to
                        create your new topic.
                      </p>
                    </div>
                  </header>
                  <div className="flex-1 flex flex-col justify-between">
                    <form>
                      <div className="px-4 divide-y divide-gra</form>y-200 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div className="space-y-1">
                            <label
                              for="topic_title"
                              className="block text-sm font-medium leading-5 text-gray-900"
                            >
                              Topic title
                            </label>
                            <div className="relative rounded-md shadow-sm">
                              <input
                                id="topic_title"
                                name="topic_title"
                                className="form-input block w-full sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                                ref={register({
                                  pattern: /^([a-zA-Z0-9 ]+)$/,
                                })}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label
                              htmlFor="topic_content"
                              className="block text-sm font-medium leading-5 text-gray-900"
                            >
                              Text
                            </label>
                            <div className="relative rounded-md shadow-sm">
                              <CreateTopicEditor
                                control={control}
                                inputError={errors}
                                modules={modules}
                                formats={formats}
                                inputName={"topic_content"}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="topic_category">Category</label>
                            <select
                              defaultValue={`/`}
                              // onChange={onDropdownChange}
                              id="topic_category"
                              name="topic_category"
                              ref={register}
                              className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            >
                              <option disabled>Select a category</option>
                              {categories.map((category, idx) => {
                                const {
                                  category: { data: categoryData, ref },
                                } = category
                                return (
                                  <option key={idx} value={ref["@ref"].id}>
                                    {categoryData.title}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="space-y-4 pt-4 pb-6">
                          <div className="flex text-sm leading-5">
                            <a
                              href="#"
                              className="group space-x-2 inline-flex items-center text-gray-500 hover:text-gray-900 transition ease-in-out duration-150"
                            >
                              {/* <!-- Heroicon name: question-mark-circle --> */}
                              <svg
                                className="h-5 w-5 text-gray-400 group-hover:text-gray-500 transition ease-in-out duration-150"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span>Community guidelines</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex-shrink-0 px-4 py-4 space-x-4 flex justify-end">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      Cancel
                    </button>
                  </span>
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    >
                      Save
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </section>
      </div>
    </div>
  )
}

export default CreateTopicSliderOver
