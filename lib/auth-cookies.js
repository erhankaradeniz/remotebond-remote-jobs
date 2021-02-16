import { parseCookies, setCookie, destroyCookie } from "nookies"

const TOKEN_NAME = "faunaToken"
const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setAuthCookie(res, token) {
  setCookie({ res }, TOKEN_NAME, token, {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
}

export function removeAuthCookie(res) {
  destroyCookie({ res }, TOKEN_NAME, {
    maxAge: -1,
    path: "/",
  })
}

export function getAuthCookie(req) {
  // for API Routes, we don't need to parse the cookies
  if (req?.cookies) return req.cookies[TOKEN_NAME]

  // for pages, we do need to parse the cookies
  const cookies = parseCookies({ req } || "")
  return cookies[TOKEN_NAME]
}
