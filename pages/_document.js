import Document, { Html, Head, Main, NextScript } from "next/document"
import { GA_TRACKING_ID } from "../lib/gtag"
class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com/" />
          <link
            href={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            rel="preload"
            as="script"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
