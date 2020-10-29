import React from "react"
import ReactTimeAgo from "react-time-ago"

const TimeAgoWrapper = ({ date }) => {
  return <ReactTimeAgo date={date} timeStyle="round" />
}

export default TimeAgoWrapper
