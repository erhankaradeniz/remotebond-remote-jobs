import React from "react"
import Head from "next/head"
import NextNprogress from "nextjs-progressbar"
import { DefaultSeo, NextSeo } from "next-seo"

// import Router from "next/router"
// import withGA from "next-ga"

import SEO from "../next-seo.config"

import Layout from "../components/Layout"

import "../public/css/global.css"

const App = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo {...SEO} />
      <NextSeo
        title="Remote Bond - Remote jobs in Software Development, Sales and more"
        description="Looking for a remote job? Remote Bond has 5,000+ remote jobs as a Developer, Designer, Copywriter, Customer Support Rep, Sales Professional, Project Manager and more! Find a career where you can work remotely from anywhere."
      />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              name: "Remote Bond",
              naics: "5613",
              url: "https://remotebond.com",
              logo: "https://remotebond.com/siteimg/logo.png",
            }),
          }}
        ></script>
      </Head>
      <Layout>
        <Component {...pageProps} />
        <NextNprogress color="#1c64f2" options={{ showSpinner: false }} />
      </Layout>
    </>
  )
}

// export default withGA("UA-165711130-1", Router)(App)
export default App
