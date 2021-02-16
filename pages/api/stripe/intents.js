import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
import { parseCookies } from "nookies"

export default async (req, res) => {
  if (req.method === "GET") {
    const PACKAGE_TYPE = req.query.package
    const paymentIntentId = req.query.token
    const PACKAGE = {
      LOGO: 2500,
      HIGHLIGHT: 10000,
    }
    let paymentIntent

    // const { paymentIntentId } = await parseCookies({ req })
    // const cookie = await parseCookies({ req })
    if (paymentIntentId) {
      const { amount } = await stripe.paymentIntents.retrieve(paymentIntentId)
      switch (PACKAGE_TYPE) {
        case "logo_add":
          if (amount === 2500 || amount === 12500) {
            // Update paymentIntent
            paymentIntent = await stripe.paymentIntents.update(
              paymentIntentId,
              {
                amount: amount + PACKAGE.LOGO,
              }
            )
          }
          break
        case "logo_remove":
          if (amount === 5000 || amount === 15000) {
            // Update paymentIntent
            paymentIntent = await stripe.paymentIntents.update(
              paymentIntentId,
              {
                amount: amount - PACKAGE.LOGO,
              }
            )
          }
          break
        case "highlight_add":
          if (
            amount === 2500 ||
            amount === 5000 ||
            amount === 12500 ||
            amount === 15000
          ) {
            // Update paymentIntent
            paymentIntent = await stripe.paymentIntents.update(
              paymentIntentId,
              {
                amount: amount + PACKAGE.HIGHLIGHT,
              }
            )
          }
          break
        case "highlight_remove":
          if (amount === 12500 || amount === 15000) {
            // Update paymentIntent
            paymentIntent = await stripe.paymentIntents.update(
              paymentIntentId,
              {
                amount: amount - PACKAGE.HIGHLIGHT,
              }
            )
          }
          break
        default:
          console.log("sup")
      }
    }
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ status: "OK" }))
    // Everything is Okay
  } else {
    console.log(`Method not allowed`)
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"])
    res.status(405).end(JSON.stringify({ status: "Bye" }))
  }
}
