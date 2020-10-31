import React from "react"
import ReactTimeAgo from "react-time-ago"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"

// Add en locale to timewrapper
TimeAgo.addLocale(en)

const TimeAgoWrapper = ({ date }) => {
  return <ReactTimeAgo date={date} timeStyle="round" />
}

export default TimeAgoWrapper
