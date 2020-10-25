import React, { useState } from "react"
import Alert from "../../components/dialog/Alert"

const SettingsForm = () => {
  const [postMessage, setPostMessage] = useState()
  const submitEditProfile = (e) => {
    e.preventDefault()
    setPostMessage(
      "Editing of your profile will be available in a few days. sorry for the inconvenience"
    )
  }
  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <form
        className="bg-white px-4 py-5 sm:p-6"
        onSubmit={(e) => submitEditProfile(e)}
      >
        {setPostMessage && <Alert title="Errors" message={postMessage} />}
        <div>
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
              <p class="mt-1 text-sm leading-5 text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label
                  for="username"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Username
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    remotebond.com/
                  </span>
                  <input
                    id="username"
                    class="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="about"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  About
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="about"
                    rows="3"
                    class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>

              {/* <div class="sm:col-span-6">
                <label
                  for="photo"
                  class="block text-sm leading-5 font-medium text-gray-700"
                >
                  Photo
                </label>
                <div class="mt-2 flex items-center">
                  <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      class="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <span class="ml-5 rounded-md shadow-sm">
                    <button
                      type="button"
                      class="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                    >
                      Change
                    </button>
                  </span>
                </div> */}
            </div>

            {/* <div class="sm:col-span-6">
                <label
                  for="cover_photo"
                  class="block text-sm leading-5 font-medium text-gray-700"
                >
                  Cover photo
                </label>
                <div class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div class="text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <p class="mt-1 text-sm text-gray-600">
                      <button
                        type="button"
                        class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
                      >
                        Upload a file
                      </button>
                      or drag and drop
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-200 pt-8">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p class="mt-1 text-sm leading-5 text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="first_name"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  First name
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="first_name"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="last_name"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Last name
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="last_name"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-4">
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email address
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="email"
                    type="email"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="country"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Country / Region
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <select
                    id="country"
                    class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="street_address"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Street address
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="street_address"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="city"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  City
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="city"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="state"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  State / Province
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="state"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="zip"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  ZIP / Postal
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="zip"
                    class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 border-t border-gray-200 pt-8">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Notifications
              </h3>
              <p class="mt-1 text-sm leading-5 text-gray-500">
                We'll always let you know about important changes, but you pick
                what else you want to hear about.
              </p>
            </div>
            <div class="mt-6">
              <fieldset>
                <legend class="text-base font-medium text-gray-900">
                  By Email
                </legend>
                <div class="mt-4">
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="comments"
                        type="checkbox"
                        class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                    </div>
                    <div class="ml-3 text-sm leading-5">
                      <label for="comments" class="font-medium text-gray-700">
                        Comments
                      </label>
                      <p class="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="relative flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="candidates"
                          type="checkbox"
                          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                      </div>
                      <div class="ml-3 text-sm leading-5">
                        <label
                          for="candidates"
                          class="font-medium text-gray-700"
                        >
                          Candidates
                        </label>
                        <p class="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4">
                    <div class="relative flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="offers"
                          type="checkbox"
                          class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                        />
                      </div>
                      <div class="ml-3 text-sm leading-5">
                        <label for="offers" class="font-medium text-gray-700">
                          Offers
                        </label>
                        <p class="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset class="mt-6">
                <legend class="text-base font-medium text-gray-900">
                  Push Notifications
                </legend>
                <p class="text-sm leading-5 text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div class="mt-4">
                  <div class="flex items-center">
                    <input
                      id="push_everything"
                      name="push_notifications"
                      type="radio"
                      class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label for="push_everything" class="ml-3">
                      <span class="block text-sm leading-5 font-medium text-gray-700">
                        Everything
                      </span>
                    </label>
                  </div>
                  <div class="mt-4 flex items-center">
                    <input
                      id="push_email"
                      name="push_notifications"
                      type="radio"
                      class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label for="push_email" class="ml-3">
                      <span class="block text-sm leading-5 font-medium text-gray-700">
                        Same as email
                      </span>
                    </label>
                  </div>
                  <div class="mt-4 flex items-center">
                    <input
                      id="push_nothing"
                      name="push_notifications"
                      type="radio"
                      class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    />
                    <label for="push_nothing" class="ml-3">
                      <span class="block text-sm leading-5 font-medium text-gray-700">
                        No push notifications
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>*/}
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
            </span>
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SettingsForm
