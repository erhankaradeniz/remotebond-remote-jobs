import React from "react"
import WysiwygEditor from "../components/form/WysiwygEditor"

const NewJobPage = () => {
  return (
    <>
      <form action="#" method="POST">
        <div className="bg-rb-gray-1">
          <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6">
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
                        for="job_position"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        * Position
                      </label>
                      <input
                        id="job_position"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
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
                        for="company_name"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        * Company name
                      </label>
                      <input
                        id="company_name"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="job_category"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Category
                      </label>
                      <select
                        id="job_category"
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
                        for="job_tags"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        * Tags (Comma seperated)
                      </label>
                      <input
                        id="job_tags"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="Design, Marketing, Javascript, React"
                      />
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
                        for="job_tags"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        * Location
                      </label>
                      <input
                        id="job_location"
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        defaultValue="Remote"
                      />
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
        </div>
      </form>
    </>
  )
}

export default NewJobPage
