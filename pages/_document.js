import crypto from "crypto"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { GA_TRACKING_ID } from "../lib/gtag"

const cspHashOf = (text) => {
  const hash = crypto.createHash("sha256")
  hash.update(text)
  return `'sha256-${hash.digest("base64")}'`
}
class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    let csp = `style-src 'self' 'unsafe-inline'; default-src 'self' data: vitals.vercel-analytics.com https://js.stripe.com https://www.googletagmanager.com/ www.google-analytics.com https://res.cloudinary.com/remotebond/; script-src 'self' https://www.googletagmanager.com/ https://remotebond.us2.list-manage.com/ https://js.stripe.com www.google-analytics.com ${cspHashOf(
      NextScript.getInlineScriptSource(this.props)
    )}`
    if (process.env.NODE_ENV !== "production") {
      csp = `style-src 'self' 'unsafe-inline'; font-src 'self' data:; default-src 'self' data: vitals.vercel-analytics.com https://www.googletagmanager.com/ https://js.stripe.com www.google-analytics.com https://res.cloudinary.com/remotebond/; script-src 'unsafe-eval' 'self' https://www.googletagmanager.com/ https://remotebond.us2.list-manage.com/ https://js.stripe.com www.google-analytics.com ${cspHashOf(
        NextScript.getInlineScriptSource(this.props)
      )}`
    }

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
          <meta httpEquiv="Content-Security-Policy" content={csp} />
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
