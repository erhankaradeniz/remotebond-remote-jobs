import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { destroyCookie } from "nookies"
import Link from "next/link"

// Local Components
import WysiwygEditor from "../../components/form/WysiwygEditor"
import Alert from "../../components/dialog/Alert"
import originUrl from "../../helpers/url"

const JobPostForm = ({ paymentIntentSSR }) => {
  const defaultValues = {
    position: "",
    category: "Software Development",
    tags: "",
    location: "Remote",
    description: "",
    minSalary: null,
    maxSalary: null,
    applyLink: "",
    company_name: "",
    company_email: "",
    company_website: "",
    company_twitter: "",
    company_logo: "",
    company_is_highlighted:
      paymentIntentSSR.amount === 12500 || paymentIntentSSR.amount === 15000
        ? true
        : false,
    show_company_logo:
      paymentIntentSSR.amount === 5000 || paymentIntentSSR.amount === 15000
        ? true
        : false,
  }

  let tempTags = []
  const stripe = useStripe()
  const elements = useElements()

  const [payment, setPayment] = useState({ status: "initial" })
  const [checkoutError, setCheckoutError] = useState()
  const [checkoutSuccess, setCheckoutSuccess] = useState()
  const [logoImage, setLogoImage] = useState()
  const [formLogoFile, setFormLogoFile] = useState()
  const [jobPrice, setJobPrice] = useState(paymentIntentSSR?.amount)
  const { handleSubmit, register, errors, watch, control, setValue } = useForm({
    defaultValues,
  })

  const isPostHighlighted = watch("company_is_highlighted")

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

  const onSubmit = async (values, e) => {
    e.preventDefault()
    setPayment({ status: "processing" })
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentSSR.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: values.company_email,
              name: values.company_name,
            },
          },
        }
      )
      console.log(error)
      if (error) throw new Error(error.message)

      if (paymentIntent.status === "succeeded") {
        setPayment({ status: "succeeded" })
        destroyCookie(null, "paymentIntentId")

        // Build formdata object
        let formData = new FormData()
        formData.append("position", values.position)
        formData.append("company_name", values.company_name)
        formData.append("category", values.category)
        formData.append("tags", values.tags)
        formData.append("location", values.location)
        formData.append("show_company_logo", values.show_company_logo)
        formData.append("company_is_highlighted", values.company_is_highlighted)
        formData.append("minSalary", values.minSalary)
        formData.append("maxSalary", values.maxSalary)
        formData.append("applyLink", values.applyLink)
        formData.append("company_email", values.company_email)
        formData.append("company_logo", formLogoFile)
        formData.append("company_website", values.company_website)
        formData.append("company_twitter", values.company_twitter)
        formData.append("description", values.description)
        const newJobResponse = await fetch(
          `${window.location.origin}/api/jobs/new`,
          {
            method: "post",
            headers: {
              "rb-stripe-id": paymentIntentSSR.id,
            },
            body: formData,
          }
        )
        setCheckoutSuccess(true)
      }
    } catch (err) {
      setPayment({ status: "error" })
      setCheckoutError(err.message)
    }
  }

  const handleFileInputChange = (event) => {
    setLogoImage(URL.createObjectURL(event.target.files[0]))
    setFormLogoFile(event.target.files[0])
    setValue("show_company_logo", true)
    handleShowCompanyLogoChange()
  }

  const handleShowCompanyLogoChange = async (event) => {
    const isChecked = event?.target?.checked
    if (isChecked || watch("show_company_logo")) {
      const intentResponse = await fetch(
        `${window.location.origin}/api/stripe/intents?package=logo_add&token=${paymentIntentSSR.id}`
      )
      // Intent is OK, continue
      intentResponse.status === 200 &&
        setJobPrice((prevPrice) => {
          if (prevPrice === 2500 || prevPrice === 12500) {
            return prevPrice + 2500
          } else {
            return prevPrice
          }
        })
    } else {
      const intentResponse = await fetch(
        `${window.location.origin}/api/stripe/intents?package=logo_remove&token=${paymentIntentSSR.id}`
      )
      // Intent is OK, continue
      intentResponse.status === 200 &&
        setJobPrice((prevPrice) => prevPrice - 2500)
      setLogoImage(null)
      setFormLogoFile(null)
      setValue("company_logo", "")
    }
  }

  const handleHighlightPostChange = async (event) => {
    const isChecked = event?.target?.checked
    if (isChecked || watch("company_is_highlighted")) {
      const intentResponse = await fetch(
        `${window.location.origin}/api/stripe/intents?package=highlight_add&token=${paymentIntentSSR.id}`
      )
      intentResponse.status === 200 &&
        setJobPrice((prevPrice) => prevPrice + 10000)
    } else {
      const intentResponse = await fetch(
        `${window.location.origin}/api/stripe/intents?package=highlight_remove&token=${paymentIntentSSR.id}`
      )
      intentResponse.status === 200 &&
        setJobPrice((prevPrice) => prevPrice - 10000)
    }
  }

  // Dirty hack to set tags in preview box
  tempTags = !watch("tags")
    ? ["Add tag", "Add tag", "Add tag"]
    : watch("tags").split(",")

  if (checkoutSuccess)
    return (
      <div className="bg-white flex flex-1 justify-center items-center">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6">
          <div className="text-white bg-rb-green-6 rounded-full w-20 h-20 mx-auto sm:w-24 sm:h-24">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="w-full text-center py-6">
            <h2 className="text-rb-green-6 text-2xl font-bold mb-2 sm:text-4xl">
              Job posted
            </h2>
            <p className="mb-2">
              Your job has been posted and will be available soon.
            </p>
            <p>Please check your provided email for further information.</p>
            <Link href={`/`} as={`/`}>
              <a className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150">
                Return to homepage
              </a>
            </Link>
          </div>
        </div>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-6 bg-rb-gray-1">
      <div className="bg-rb-gray-1">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6">
          {Object.keys(errors).length !== 0 && (
            <Alert
              title={`There ${Object.keys(errors).length > 1 ? "are" : "is"} ${
                Object.keys(errors).length
              } ${
                Object.keys(errors).length > 1 ? "errors" : "error"
              } with your submission`}
              message={`Please fix the marked ${
                Object.keys(errors).length > 1 ? "fields" : "field"
              } and try submitting your job post again`}
            />
          )}
          {checkoutError && (
            <Alert title="Payment errors" message={checkoutError} />
          )}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Job information
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Fill in the main information of your listing.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="position"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.position ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Position{" "}
                      {errors.position && (
                        <span className="inline-block text-right">
                          {errors.position.message}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="position"
                        name="position"
                        ref={register({
                          required: "Job position is required",
                        })}
                        className={`${
                          !errors.position
                            ? "mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                      />
                      {errors.position && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Please specify as single job position like "Fullstack
                      developer Manager" or "Social Media manager".
                    </p>
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="company_name"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.company_name ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Company{" "}
                      {errors.company_name && (
                        <span className="inline-block text-right">
                          {errors.company_name.message}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="company_name"
                        name="company_name"
                        ref={register({
                          required: "Company name is required",
                        })}
                        className={`${
                          !errors.company_name
                            ? "mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                      />
                      {errors.company_name && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      * Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      ref={register}
                      className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      <option>Software Development</option>
                      <option>Customer Support</option>
                      <option>Marketing</option>
                      <option>Design</option>
                      <option>Non Tech</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="tags"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.tags ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Tags (Comma seperated)
                      {errors.tags && (
                        <span className="inline-block text-right">
                          {errors.tags.message}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="tags"
                        name="tags"
                        ref={register({
                          required: "Tags are required",
                          pattern: {
                            value: /([a-zA-Z]*[ ]*,[ ]*)*[a-zA-Z]*/gm,
                            message: "Please use comma to seperate tags",
                          },
                        })}
                        className={`${
                          !errors.tags
                            ? "mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                        placeholder="Design, Marketing, Javascript, React"
                      />
                      {errors.tags && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Use tags like industry and tech stack, and separate
                      multiple tags by comma. The first 3 tags are shown on the
                      site, other tags are still used for tag specific pages.
                    </p>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="location"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.location ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Location
                      {errors.location && (
                        <span className="inline-block text-right">
                          {errors.location.message}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="location"
                        name="location"
                        className={`${
                          !errors.location
                            ? "mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                        defaultValue="Remote"
                        ref={register({
                          required: "Job location is required",
                        })}
                      />
                      {errors.location && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Location for this job, leave "Remote" if it's a remote
                      job.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  <span className="text-blue-500">
                    <strong>Help your job stand out</strong>
                  </span>
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Choose a package to get more attention for you job post.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="mt-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="showCompanyLogo"
                        type="checkbox"
                        name="show_company_logo"
                        ref={register}
                        onChange={handleShowCompanyLogoChange}
                        className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-5">
                      <label
                        htmlFor="showCompanyLogo"
                        className="font-medium text-gray-700"
                      >
                        Company logo (+$25)
                      </label>
                      <p className="text-gray-500 flex flex-col md:flex-row">
                        <span className="mr-3 mb-1 md:mb-0">
                          Show your company logo beside your post.
                        </span>
                        <div>
                          <span className="inline-flex mr-3 flex-grow-0 items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-yellow-100 text-yellow-800">
                            More views
                          </span>
                          <span className="inline-flex flex-grow-0 items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-red-100 text-red-800">
                            Recommended
                          </span>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="highlightPost"
                          name="company_is_highlighted"
                          ref={register}
                          type="checkbox"
                          onChange={handleHighlightPostChange}
                          className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-5">
                        <label
                          htmlFor="highlightPost"
                          className="font-medium text-gray-700"
                        >
                          Highlight post (+$100)
                        </label>
                        <p className="text-gray-500 flex flex-col md:flex-row">
                          <span className="mr-3 mb-1 md:mb-0">
                            Highlight your post in yellow for more attention.
                          </span>
                          <div>
                            <span className="inline-flex flex-grow-0 items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-yellow-100 text-yellow-800">
                              More views
                            </span>
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Job details
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Now let's get into the details of the listing.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company_logo"
                      className="block text-sm leading-5 font-medium text-gray-700"
                    >
                      Company logo (.JPG or .PNG)
                    </label>
                    <div className="mt-2 flex items-center">
                      <div className="inline-block h-24 w-24 rounded-sm overflow-hidden bg-gray-100 relative">
                        {logoImage && (
                          <img
                            className="absolute inset-0 object-cover h-full w-full"
                            src={logoImage}
                            alt="Company logo"
                          />
                        )}
                        {!logoImage && (
                          <div className="flex justify-center items-center h-full">
                            <p className="px-2 py-1 text-sm bg-blue-500 text-center rounded-sm text-white hover:bg-blue-100 hover:text-blue-400">
                              Upload
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={register}
                          id="company_logo"
                          name="company_logo"
                          accept="image/png, image/jpeg"
                          className="absolute inset-0 appearance-none h-full w-full opacity-0 cursor-pointer z-10"
                          onChange={handleFileInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="job_salary_min"
                      className="block text-sm font-medium leading-5 text-gray-700"
                    >
                      Annual salary
                    </label>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-2">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm sm:leading-5">
                              $
                            </span>
                          </div>
                          <input
                            id="job_salary_min"
                            name="minSalary"
                            ref={register}
                            className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                            placeholder="Min per year"
                            aria-describedby="currency"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span
                              className="text-gray-500 sm:text-sm sm:leading-5"
                              id="currency"
                            >
                              USD
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-1 text-center pt-2">
                        -
                      </div>
                      <div className="col-span-6 sm:col-span-2">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm sm:leading-5">
                              $
                            </span>
                          </div>
                          <input
                            id="job_salary_max"
                            name="maxSalary"
                            ref={register}
                            className="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                            placeholder="Max per year"
                            aria-describedby="currency"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span
                              className="text-gray-500 sm:text-sm sm:leading-5"
                              id="currency"
                            >
                              USD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Not required but HIGHLY recommended, because Google does
                      NOT index jobs without salary data! Write it preferrably
                      in US DOLLARS PER YEAR, like $25,000 - $75,000.
                    </p>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="email_address"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.description ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Description
                      {errors.description && (
                        <span className="inline-block text-right">
                          {errors.description.message}
                        </span>
                      )}
                    </label>
                    <WysiwygEditor
                      control={control}
                      inputError={errors}
                      modules={modules}
                      formats={formats}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="applyLink"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.applyLink ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Apply link or email
                      {errors.applyLink && (
                        <span className="inline-block text-right">
                          {errors.applyLink.message}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="applyLink"
                        name="applyLink"
                        className={`${
                          !errors.applyLink
                            ? "mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                        ref={register({
                          required: "Apply link / email is required",
                        })}
                      />
                      {errors.applyLink && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Provide a link or email for applicants. If you provide an
                      email, this email will public.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Company information
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  The information here will be used for billing, invoice and
                  your company profile.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="company_email"
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !errors.company_email ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Company email{" "}
                      {errors.company_email && (
                        <span className="inline-block text-right">
                          {errors.company_email.message}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="company_email"
                        name="company_email"
                        ref={register({
                          required: "Company email is required",
                        })}
                        className={`${
                          !errors.company_email
                            ? "mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                      />
                      {errors.company_email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      This email stays private and is used for billing + edit
                      link. Make sure it's accessible by you.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company_website"
                      className={`flex justify-between text-sm font-medium leading-5 text-gray-700`}
                    >
                      Company website{" "}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="company_website"
                        name="company_website"
                        ref={register}
                        className={`${"mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"}`}
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company_twitter"
                      className={`flex justify-between text-sm font-medium leading-5 text-gray-700`}
                    >
                      Company Twitter
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="company_twitter"
                        name="company_twitter"
                        ref={register}
                        className={`mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Used for mentioning you when we tweet your job
                    </p>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      className={`flex justify-between text-sm font-medium leading-5 ${
                        !checkoutError ? "text-gray-700" : "text-red-500"
                      }`}
                    >
                      * Company card
                      {checkoutError && (
                        <span className="inline-block text-right">
                          {checkoutError}
                        </span>
                      )}
                    </label>
                    <CardElement
                      className={`${
                        !checkoutError
                          ? "form-input w-full mt-1 py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          : "form-input block mt-1 w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                      }`}
                    />
                    <p className="mt-2 text-xs text-gray-400">
                      Secure payment by Stripe over HTTPS. You are only charged
                      when you press "Post your job"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sticky bottom-0 ${
            isPostHighlighted ? "bg-yellow-100" : "bg-white"
          }`}
        >
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between">
              <div>
                <div
                  className={`h-12 md:h-full w-12 rounded-sm text-center font-extrabold mr-4 pt-3 relative overflow-hidden ${
                    isPostHighlighted
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {!logoImage ? (
                    <span className="uppercase">
                      {!watch("company_name")
                        ? "RB"
                        : watch("company_name").charAt(0)}
                    </span>
                  ) : (
                    <img
                      className="absolute inset-0 object-cover h-full w-full"
                      src={logoImage}
                      alt="Company logo"
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div
                    className={`text-sm leading-5 font-medium truncate ${
                      isPostHighlighted ? "text-yellow-800" : "text-blue-600"
                    }`}
                  >
                    {!watch("position")
                      ? "Add a job position"
                      : watch("position")}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Preview
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div
                      className={`mr-6 flex items-center text-sm leading-5 ${
                        isPostHighlighted ? "text-yellow-500" : "text-rb-gray-5"
                      }`}
                    >
                      <svg
                        className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                          isPostHighlighted
                            ? "text-yellow-400"
                            : "text-rb-gray-4"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {!watch("company_name")
                        ? "Company name"
                        : watch("company_name")}
                    </div>
                    <div
                      className={`mt-2 flex items-center text-sm leading-5 sm:mt-0 ${
                        isPostHighlighted ? "text-yellow-500" : "text-rb-gray-5"
                      }`}
                    >
                      <svg
                        className={`flex-shrink-0 mr-1.5 h-5 w-5 ${
                          isPostHighlighted
                            ? "text-yellow-400"
                            : "text-rb-gray-4"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {!watch("location") ? "Remote" : watch("location")}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm leading-5 sm:mt-0">
                    {tempTags.length && (
                      <ul className="flex space-x-3">
                        {tempTags.map((tag, i) => {
                          if (i > 2) return
                          return (
                            <li
                              key={i}
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 hover:text-white ${
                                isPostHighlighted
                                  ? "bg-yellow-400 text-white hover:bg-yellow-300"
                                  : "bg-gray-100 text-rb-gray-5 hover:bg-rb-gray-8"
                              }`}
                            >
                              <span>{tag}</span>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`flex w-full items-center justify-center px-6 py-3 border border-transparent text-xl leading-6 font-bold focus:outline-none focus:shadow-outline-green  transition ease-in-out duration-150 ${
              payment.status === "processing"
                ? "bg-rb-gray-2 text-rb-gray-5"
                : "text-white bg-rb-green-6 hover:bg-rb-green-5 focus:border-rb-green-7  active:bg-rb-green-7"
            }`}
            disabled={
              !["initial", "succeeded", "error"].includes(payment.status) ||
              !stripe
            }
          >
            {payment.status === "processing"
              ? "Processing payment..."
              : `Post your job - $${jobPrice / 100}`}
          </button>
        </div>
      </div>
    </form>
  )
}

export default JobPostForm
