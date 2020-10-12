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
        description="Looking for a remote job? Hire Remote! Remotebond has thousands of remote work jobs as a Developer, Designer, Customer Support Rep, Sales Professional, Marketing Professional, Project Manager and more!"
      />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/siteimg/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/siteimg/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/siteimg/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/siteimg/safari-pinned-tab.svg"
          color="#3c99f7"
        />
        <link rel="shortcut icon" href="/siteimg/favicon.ico" />
        <meta name="msapplication-TileColor" content="#3c99f7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              name: "Remotebond",
              url: "https://remotebond.com",
              logo: "https://remotebond.com/siteimg/logo.png",
              sameAs: ["https://twitter.com/remotebond"],
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
