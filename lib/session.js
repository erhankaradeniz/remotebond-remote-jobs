import { withIronSession } from "next-iron-session"

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SESSION_SECRET,
    cookieName: "RBSESSID",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  })
}
