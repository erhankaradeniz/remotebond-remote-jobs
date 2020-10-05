import React, { useState } from "react"
import { useForm } from "react-hook-form"

// Page components
import WysiwygEditor from "../components/form/WysiwygEditor"
import Alert from "../components/dialog/Alert"

const NewJobPage = () => {
  const { handleSubmit, register, errors, watch } = useForm()
  const onSubmit = (values) => console.log(values)
  console.log(errors)
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-rb-gray-1">
          <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6">
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
                        {errors.job_position && (
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
                              class="h-5 w-5 text-red-500"
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
                        Please specify as single job position like "Marketing
                        Manager" or "Node JS Developer", not a sentence like
                        "Looking for PM / Biz Dev / Manager". If posting
                        multiple roles, please create multiple job posts. A job
                        post is limited to a single job. We only allow real
                        jobs, absolutely no MLM-type courses "learn how to work
                        online" please.
                      </p>
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="company_name"
                        className={`flex justify-between text-sm font-medium leading-5 ${
                          !errors.company_name
                            ? "text-gray-700"
                            : "text-red-500"
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
                              class="h-5 w-5 text-red-500"
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
                              value: /^[a-zA-Z,]*$/i,
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
                              class="h-5 w-5 text-red-500"
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
                        first 3 tags are shown on the site, the other tags
                        aren't but the job will be shown on each tag specific
                        page (like /remote-react-jobs). We also generate tags
                        automatically after you post/edit.
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
                              class="h-5 w-5 text-red-500"
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
                        restricted, leave it as "Remote". The less restricted
                        this is, the more applicants you will get.
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
                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm leading-5 font-medium text-gray-700">
                        Company logo
                      </label>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block h-24 w-24 rounded-sm overflow-hidden bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <span className="ml-5 rounded-md shadow-sm">
                          <button
                            type="button"
                            className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                          >
                            Upload
                          </button>
                        </span>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        for="email_address"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Annual salary
                      </label>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-2">
                          <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span class="text-gray-500 sm:text-sm sm:leading-5">
                                $
                              </span>
                            </div>
                            <input
                              id="job_salary_low"
                              class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                              placeholder="0.00"
                              aria-describedby="currency"
                            />
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span
                                class="text-gray-500 sm:text-sm sm:leading-5"
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
                          <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span class="text-gray-500 sm:text-sm sm:leading-5">
                                $
                              </span>
                            </div>
                            <input
                              id="job_salary_high"
                              class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
                              placeholder="0.00"
                              aria-describedby="currency"
                            />
                            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span
                                class="text-gray-500 sm:text-sm sm:leading-5"
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
                      <WysiwygEditor />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Notifications
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Decide which communications you'd like to receive and how.
                  </p>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <form action="#" method="POST">
                    <fieldset>
                      <legend className="text-base leading-6 font-medium text-gray-900">
                        By Email
                      </legend>
                      <div className="mt-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="comments"
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-5">
                            <label
                              for="comments"
                              className="font-medium text-gray-700"
                            >
                              Comments
                            </label>
                            <p className="text-gray-500">
                              Get notified when someones posts a comment on a
                              posting.
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="candidates"
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                              />
                            </div>
                            <div className="ml-3 text-sm leading-5">
                              <label
                                for="candidates"
                                className="font-medium text-gray-700"
                              >
                                Candidates
                              </label>
                              <p className="text-gray-500">
                                Get notified when a candidate applies for a job.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="offers"
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                              />
                            </div>
                            <div className="ml-3 text-sm leading-5">
                              <label
                                for="offers"
                                className="font-medium text-gray-700"
                              >
                                Offers
                              </label>
                              <p className="text-gray-500">
                                Get notified when a candidate accepts or rejects
                                an offer.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset className="mt-6">
                      <legend className="text-base leading-6 font-medium text-gray-900">
                        Push Notifications
                      </legend>
                      <p className="text-sm leading-5 text-gray-500">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <input
                            id="push_everything"
                            name="push_notifications"
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                          />
                          <label for="push_everything" className="ml-3">
                            <span className="block text-sm leading-5 font-medium text-gray-700">
                              Everything
                            </span>
                          </label>
                        </div>
                        <div className="mt-4 flex items-center">
                          <input
                            id="push_email"
                            name="push_notifications"
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                          />
                          <label for="push_email" className="ml-3">
                            <span className="block text-sm leading-5 font-medium text-gray-700">
                              Same as email
                            </span>
                          </label>
                        </div>
                        <div className="mt-4 flex items-center">
                          <input
                            id="push_nothing"
                            name="push_notifications"
                            type="radio"
                            className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                          />
                          <label for="push_nothing" className="ml-3">
                            <span className="block text-sm leading-5 font-medium text-gray-700">
                              No push notifications
                            </span>
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 bg-white py-4">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-5 font-medium text-blue-600 truncate">
                      {!watch("position") ? "Position" : watch("position")}
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="mr-6 flex items-center text-sm leading-5 text-rb-gray-5">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4"
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
                      <div className="mt-2 flex items-center text-sm leading-5 text-rb-gray-5 sm:mt-0">
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-rb-gray-4"
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
                    {/* <div className="mt-2 flex items-center text-sm leading-5 text-rb-gray-5 sm:mt-0">
                      {tags.length && (
                        <ul className="flex space-x-3">
                          {tags.map((tag, i) => {
                            if (i > 2) return
                            return (
                              <li
                                key={i}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-rb-gray-5 hover:bg-rb-gray-8 hover:text-white"
                              >
                                <span
                                  data-tip="React-tooltip"
                                  onClick={() => onTagClick()}
                                >
                                  {tag}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div> */}
                  </div>
                </div>
                <div></div>
                <span class="inline-flex rounded-md shadow-sm">
                  <button
                    type="submit"
                    class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 focus:outline-none focus:border-rb-green-7 focus:shadow-outline-green active:bg-rb-green-7 transition ease-in-out duration-150"
                  >
                    Post your job $25
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default NewJobPage
