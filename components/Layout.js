import React from "react"

import Header from "./Header"
import HeaderNew from "./HeaderNew"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <HeaderNew />
      <main className="flex flex-col flex-grow">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
