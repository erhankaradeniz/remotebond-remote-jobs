import React from "react"
import Stripe from "stripe"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { parseCookies, setCookie } from "nookies"
import { NextSeo } from "next-seo"

// Page components
import Banner from "../components/Banner"
import JobPostForm from "../components/form/JobPostForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export const getServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  let paymentIntent

  const { paymentIntentId } = await parseCookies(ctx)

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      props: {
        paymentIntent,
      },
    }
  }

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
        />
        <Banner message={`Launch deal! Base job ad is now priced at $25`} />
        <JobPostForm paymentIntentSSR={paymentIntent} />
      </>
    </Elements>
  )
}

export default NewJobPage
