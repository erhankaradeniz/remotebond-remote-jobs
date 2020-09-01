import React from "react"
import Head from "next/head"
// import Router from "next/router"
// import withGA from "next-ga"

// import { DefaultSeo } from "next-seo"

// import SEO from "../next-seo.config"

import "../public/css/global.css"

const App = ({ Component, pageProps }) => {
  return (
    <>
      {/* <DefaultSeo {...SEO} /> */}
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

// export default withGA("UA-165711130-1", Router)(App)
export default App
