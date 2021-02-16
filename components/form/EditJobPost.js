import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js"
import { destroyCookie } from "nookies"
import Link from "next/link"

// Local Components
import WysiwygEditor from "./WysiwygEditor"
import Alert from "../dialog/Alert"
import originUrl from "../../helpers/url"

const EditJobPost = (props) => {
  const defaultValues = {
    position: props.jobData.title,
    category: props.jobData.primary_category,
    tags: props.jobData.tags,
    location: props.jobData.location,
    description: props.jobData.description,
    minSalary: props.jobData.min_salary,
    maxSalary: props.jobData.max_salary,
    applyLink: props.jobData.apply_url,
    company_name: props.jobData.company_name,
    company_website: props.jobData.company_website,
    company_twitter: props.jobData.company_twitter,
    company_logo: props.jobData.company_logo,
    job_id: props.jobData.job_id,
    // company_is_highlighted:
    //   paymentIntentSSR.amount === 12500 || paymentIntentSSR.amount === 15000
    //     ? true
    //     : false,
    // show_company_logo:
    //   paymentIntentSSR.amount === 5000 || paymentIntentSSR.amount === 15000
    //     ? true
    //     : false,
  }

  let tempTags = []
  // const stripe = useStripe()
  // const elements = useElements()

  // const [paymentRequest, setPaymentRequest] = useState(null)
  // const [payment, setPayment] = useState({ status: "initial" })
  const [checkoutError, setCheckoutError] = useState()
  // const [checkoutSuccess, setCheckoutSuccess] = useState()
  // const [logoImage, setLogoImage] = useState()
  // const [formLogoFile, setFormLogoFile] = useState()
  // const [jobPrice, setJobPrice] = useState(paymentIntentSSR?.amount)
  const { handleSubmit, register, errors, watch, control, setValue } = useForm({
    defaultValues,
  })
  // const isPostHighlighted = watch("company_is_highlighted")

  const onSubmit = async (values, e) => {
    e.preventDefault()
    // Build formdata object
    let formData = new FormData()
    formData.append("position", props.jobData.title)
    formData.append("company_name", values.company_name)
    formData.append("category", values.category)
    formData.append("tags", values.tags)
    formData.append("location", values.location)
    formData.append("show_company_logo", "false")
    // formData.append("company_is_highlighted", values.company_is_highlighted)
    formData.append("minSalary", values.minSalary)
    formData.append("maxSalary", values.maxSalary)
    formData.append("applyLink", values.applyLink)
    formData.append("company_email", values.company_email)
    // formData.append("company_logo", formLogoFile)
    formData.append("company_website", values.company_website)
    formData.append("company_twitter", values.company_twitter)
    formData.append("description", values.description)
    formData.append("job_id", values.job_id)
    const newJobResponse = await fetch(
      `${window.location.origin}/api/jobs/update`,
      {
        method: "post",
        body: formData,
      }
    )
    // setCheckoutSuccess(true)
  }

  // const onSubmit = async (values, e) => {
  //   e.preventDefault()
  //   setPayment({ status: "processing" })
  //   try {
  //     const { error, paymentIntent } = await stripe.confirmCardPayment(
  //       paymentIntentSSR.client_secret,
  //       {
  //         payment_method: {
  //           card: elements.getElement(CardElement),
  //           billing_details: {
  //             email: values.company_email,
  //             name: values.company_name,
  //           },
  //         },
  //       }
  //     )
  //     if (error) throw new Error(error.message)

  //     if (paymentIntent.status === "succeeded") {
  //       setPayment({ status: "succeeded" })
  //       destroyCookie(null, "paymentIntentId")

  //       // Build formdata object
  //       let formData = new FormData()
  //       formData.append("position", values.position)
  //       formData.append("company_name", values.company_name)
  //       formData.append("category", values.category)
  //       formData.append("tags", values.tags)
  //       formData.append("location", values.location)
  //       formData.append("show_company_logo", values.show_company_logo)
  //       formData.append("company_is_highlighted", values.company_is_highlighted)
  //       formData.append("minSalary", values.minSalary)
  //       formData.append("maxSalary", values.maxSalary)
  //       formData.append("applyLink", values.applyLink)
  //       formData.append("company_email", values.company_email)
  //       formData.append("company_logo", formLogoFile)
  //       formData.append("company_website", values.company_website)
  //       formData.append("company_twitter", values.company_twitter)
  //       formData.append("description", values.description)
  //       const newJobResponse = await fetch(
  //         `${window.location.origin}/api/jobs/new`,
  //         {
  //           method: "post",
  //           headers: {
  //             "rb-stripe-id": paymentIntentSSR.id,
  //           },
  //           body: formData,
  //         }
  //       )
  //       setCheckoutSuccess(true)
  //     }
  //   } catch (err) {
  //     setPayment({ status: "error" })
  //     setCheckoutError(err.message)
  //   }
  // }

  // const handleFileInputChange = (event) => {
  //   setLogoImage(URL.createObjectURL(event.target.files[0]))
  //   setFormLogoFile(event.target.files[0])
  //   setValue("show_company_logo", true)
  //   handleShowCompanyLogoChange()
  // }

  // const handleShowCompanyLogoChange = async (event) => {
  //   const isChecked = event?.target?.checked
  //   if (isChecked || watch("show_company_logo")) {
  //     const intentResponse = await fetch(
  //       `${window.location.origin}/api/stripe/intents?package=logo_add`
  //     )
  //     // Intent is OK, continue
  //     intentResponse.status === 200 &&
  //       setJobPrice((prevPrice) => {
  //         if (prevPrice === 2500 || prevPrice === 12500) {
  //           return prevPrice + 2500
  //         } else {
  //           return prevPrice
  //         }
  //       })
  //   } else {
  //     const intentResponse = await fetch(
  //       `${window.location.origin}/api/stripe/intents?package=logo_remove`
  //     )
  //     // Intent is OK, continue
  //     intentResponse.status === 200 &&
  //       setJobPrice((prevPrice) => prevPrice - 2500)
  //     setLogoImage(null)
  //     setFormLogoFile(null)
  //     setValue("company_logo", "")
  //   }
  // }

  // const handleHighlightPostChange = async (event) => {
  //   const isChecked = event?.target?.checked
  //   if (isChecked || watch("company_is_highlighted")) {
  //     const intentResponse = await fetch(
  //       `${window.location.origin}/api/stripe/intents?package=highlight_add`
  //     )
  //     intentResponse.status === 200 &&
  //       setJobPrice((prevPrice) => prevPrice + 10000)
  //   } else {
  //     const intentResponse = await fetch(
  //       `${window.location.origin}/api/stripe/intents?package=highlight_remove`
  //     )
  //     intentResponse.status === 200 &&
  //       setJobPrice((prevPrice) => prevPrice - 10000)
  //   }
  // }

  // useEffect(() => {
  //   if (stripe) {
  //     const pr = stripe.paymentRequest({
  //       country: "US",
  //       currency: "usd",
  //       total: {
  //         label: "Remotebond job post",
  //         amount: 2500,
  //       },
  //       requestPayerName: true,
  //       requestPayerEmail: true,
  //     })

  //     // Check the availability of the Payment Request API.
  //     pr.canMakePayment().then((result) => {
  //       if (result) {
  //         setPaymentRequest(pr)
  //       }
  //     })
  //   }
  // }, [stripe])

  // useEffect(() => {
  //   paymentRequest?.update({
  //     total: {
  //       label: "Remotebond job post",
  //       amount: jobPrice,
  //     },
  //   })
  // }, [jobPrice])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" ref={register("job_id")} />
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
                      Position{" "}
                      <span className="inline-block text-right text-sm text-gray-700">
                        Job title cannot be changed
                      </span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="position"
                        name="position"
                        ref={register({
                          required: "Job position is required",
                        })}
                        disabled
                        className={`${
                          !errors.position
                            ? "mt-1 form-input block disabled:opacity-25 w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            : "form-input block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red sm:text-sm sm:leading-5"
                        }`}
                      />
                    </div>
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
                      multiple tags by comma. Short words are preferred. The
                      first 3 tags are shown on the site, the other tags aren't
                      but the job will be shown on each tag specific page (like
                      /remote-react-jobs). We also generate tags automatically
                      after you post/edit.
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
                      Location or timezone this remote job is restricted to
                      (e.g. Europe, United States or CET Timezone). If not
                      restricted, leave it as "Remote". The less restricted this
                      is, the more applicants you will get.
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
                  Job details
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Now let's get into the details of the listing.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  {/* <div className="col-span-6 sm:col-span-3">
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
                  </div> */}

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
                    <WysiwygEditor control={control} inputError={errors} />
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`sticky bottom-0`}>
          <button
            type="submit"
            className={`flex w-full items-center justify-center px-6 py-3 border border-transparent text-xl leading-6 font-bold focus:outline-none focus:shadow-outline-green  transition ease-in-out duration-150 text-white bg-rb-green-6 hover:bg-rb-green-5 focus:border-rb-green-7  active:bg-rb-green-7`}
          >
            {`Save changes`}
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditJobPost
