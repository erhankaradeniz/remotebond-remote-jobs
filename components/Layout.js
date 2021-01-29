import React from "react"

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col flex-grow">{children}</main>
    </>
  )
}

export default Layout
