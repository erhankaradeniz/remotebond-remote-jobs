import React from "react"
import { NextSeo } from "next-seo"
const AboutPage = () => {
  return (
    <>
      <NextSeo
        title={`Remotebond - About`}
        description="Remotebond - About us, how it started and how Remotebond helps you with remote jobs and your professional career"
        canonical={`https://remotebond.com/about`}
        openGraph={{
          url: `https://remotebond.com/about`,
          title: `Remotebond - About`,
          description: `Remotebond - About us, how it started and how Remotebond helps you with remote jobs and your professional career`,
        }}
      />
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <h1 className="text-4xl leading-10 font-display font-semibold text-white text-center md:text-5xl md:leading-none">
            About
          </h1>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mt-6">About coming soon..</div>
      </div>
    </>
  )
}

export default AboutPage
