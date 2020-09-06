import Document, { Html, Head, Main, NextScript } from "next/document"

import Footer from "../components/Footer"

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="antialiased">
          <Main />
          <NextScript />
          <Footer />
        </body>
      </Html>
    )
  }
}

export default AppDocument
