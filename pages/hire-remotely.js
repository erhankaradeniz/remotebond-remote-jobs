import React from "react"
import Stripe from "stripe"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { setCookie } from "nookies"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

// Page components
import Banner from "../components/Banner"
import JobPostForm from "../components/form/JobPostForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export const getServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let paymentIntent

  paymentIntent = await stripe.paymentIntents.create({
    amount: 2500,
    currency: "usd",
  })

  setCookie(ctx, "paymentIntentId", paymentIntent.id)

  return {
    props: {
      paymentIntent,
    },
  }
}

const NewJobPage = ({ paymentIntent }) => {
  return (
    <Elements stripe={stripePromise}>
      <>
        <NextSeo
          title={`Create a new remote job post`}
          description="Start hiring remotely, post a new remote job and find the most qualified people for your next remote position."
          canonical={`https://remotebond.com/hire-remotely`}
          openGraph={{
            url: `https://remotebond.com/hire-remotely`,
            title: `Create a new remote job post`,
            description: `Start hiring remotely, post a new remote job and find the most qualified people for your next remote position.`,
          }}
        />
        <BreadcrumbJsonLd
          itemListElements={[
            {
              position: 1,
              name: "remotebond.com",
              item: "https://remotebond.com",
            },
            {
              position: 2,
              name: "Hire Remotely",
            },
          ]}
        />
        <Banner message={`Launch deal! Base job ad is now priced at $25`} />
        <div className="relative overflow-hidden bg-black">
          <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-12 lg:px-8">
            <div>
              <h1 className="text-center text-3xl leading-9 font-extrabold text-white">
                Hire remotely
              </h1>
              <h2 className="text-rb-gray-4 text-center w-full">
                Create your remote job post and reach remote workers all around
                the world.
              </h2>
            </div>
          </div>
        </div>
        <JobPostForm paymentIntentSSR={paymentIntent} />
      </>
    </Elements>
  )
}

export default NewJobPage
