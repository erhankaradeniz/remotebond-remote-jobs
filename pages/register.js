import React from "react"
import { NextSeo } from "next-seo"

const RegisterPage = () => {
  return (
    <>
      <NextSeo
        title={`Register for a Remotebond profile and join the future of work.`}
        description="Register now and join the future of work on Remotebond."
      />
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <h2 className="text-4xl leading-10 font-display font-semibold text-white text-center md:text-5xl md:leading-none">
            Register account
          </h2>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mt-6">&nbsp;</div>
      </div>
    </>
  )
}

export default RegisterPage
