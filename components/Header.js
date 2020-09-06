import React from "react"
import Link from "next/link"

const Header = () => {
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto flex py-4 px-4 sm:px-6">
        <Link href={`/`}>
          <a title="Return to RemoteBond homepage" className="flex">
            <span className="flex items-center text-blue-500 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <g transform="matrix(1,0,0,1,0,0)">
                  <path
                    d="M16.6,12.635a.248.248,0,0,0-.08-.237,2.233,2.233,0,0,1-.769-1.68,2.125,2.125,0,0,1,.084-.578.25.25,0,0,0-.09-.267A8.8,8.8,0,0,0,11,8.218a.734.734,0,0,1-.081-.005.25.25,0,0,0-.268.181,2.5,2.5,0,0,1-2.4,1.824.045.045,0,0,0-.045.037,12.255,12.255,0,0,0-.093,3.86.251.251,0,0,0,.208.214,21.285,21.285,0,0,1,6.362,2.118.252.252,0,0,0,.32-.079A10.091,10.091,0,0,0,16.6,12.635Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M13.616,17.968a.249.249,0,0,0-.063-.407A19.694,19.694,0,0,0,8.91,15.98a.25.25,0,0,0-.287.325,10.271,10.271,0,0,0,.548,1.328,10.69,10.69,0,0,0,1.619,2.28.249.249,0,0,0,.32.044A29.115,29.115,0,0,0,13.616,17.968Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M6.3,14.105a.25.25,0,0,0,.265-.274,13.048,13.048,0,0,1,.205-4.045l0,0a.062.062,0,0,0-.022-.07,2.5,2.5,0,0,1-.777-.982A.25.25,0,0,0,5.7,8.585,11,11,0,0,0,.1,11.4a.255.255,0,0,0-.075.163c-.008.135-.02.269-.02.406a11.907,11.907,0,0,0,.246,2.381.256.256,0,0,0,.111.161.249.249,0,0,0,.192.032A19.925,19.925,0,0,1,6.3,14.105Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M9.231,20.914a.25.25,0,0,0,.1-.393,11.528,11.528,0,0,1-1.5-2.219,12.238,12.238,0,0,1-.911-2.466.248.248,0,0,0-.22-.187,18.874,18.874,0,0,0-5.69.331.25.25,0,0,0-.166.126.254.254,0,0,0-.012.209,12.046,12.046,0,0,0,4.132,5.353.253.253,0,0,0,.15.048A11.355,11.355,0,0,0,9.231,20.914Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M18.931,12.956l-.006-.007a.249.249,0,0,0-.268-.083,2.2,2.2,0,0,1-.409.082.251.251,0,0,0-.218.2c-.582,2.66-2.127,5.349-5.749,7.842a.249.249,0,0,0-.026.391A28.684,28.684,0,0,0,14.917,23.5a.247.247,0,0,0,.209.037,12.011,12.011,0,0,0,6.456-4.378.249.249,0,0,0,.048-.188A13.51,13.51,0,0,0,18.931,12.956Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M5.7,7.058a.254.254,0,0,0,.2-.165A2.488,2.488,0,0,1,7.978,5.245a.093.093,0,0,0,.078-.062l0,0A19.735,19.735,0,0,1,11.111.443.25.25,0,0,0,10.9.033,12.009,12.009,0,0,0,.5,8.591a.25.25,0,0,0,.374.281A12.912,12.912,0,0,1,5.7,7.058Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M10.774,22.052a.249.249,0,0,0-.279-.046,12.6,12.6,0,0,1-2.366.833.25.25,0,0,0-.022.479,11.923,11.923,0,0,0,3.893.65c.1,0,.2,0,.3-.007a.25.25,0,0,0,.147-.444C11.921,23.093,11.347,22.6,10.774,22.052Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M18.748,8.436a.249.249,0,0,0,.149.228,2.246,2.246,0,0,1,1.353,2.054,2.194,2.194,0,0,1-.23.972.25.25,0,0,0,.042.281l.007.008a15.017,15.017,0,0,1,2.519,4.6.249.249,0,0,0,.467.018A11.868,11.868,0,0,0,24,11.968,12.005,12.005,0,0,0,18.22,1.709a.25.25,0,0,0-.373.274A28.4,28.4,0,0,1,18.748,8.436Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                  <path
                    d="M9.613,5.38a.25.25,0,0,0,.081.309,2.51,2.51,0,0,1,.8.936.249.249,0,0,0,.3.127A.631.631,0,0,1,11,6.718a10.245,10.245,0,0,1,5.69,1.991.251.251,0,0,0,.267.024c.046-.024.093-.047.141-.067a.251.251,0,0,0,.151-.23A29.982,29.982,0,0,0,15.961.764.251.251,0,0,0,15.8.6,11.925,11.925,0,0,0,13.59.082a.252.252,0,0,0-.214.076A22.455,22.455,0,0,0,9.613,5.38Z"
                    fill="currentColor"
                    stroke="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                  ></path>
                </g>
              </svg>
            </span>
            <span className="flex items-center text-xl text-gray-900 font-semibold tracking-tighter">
              RemoteBond
            </span>
          </a>
        </Link>
        <div className="flex-1">
          <ul className="flex justify-center items-center h-full space-x-3">
            <li>
              <Link href={`/`}>
                <a title="Remote companies on remotebond">Companies</a>
              </Link>
            </li>
            <li>
              <Link href={`/`}>
                <a title="About remotebond">About</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span className="inline-flex mr-4">Log in</span>
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
            >
              Post a job
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header
