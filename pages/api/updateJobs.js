import { getAndUpdateAllJobs } from "../../lib/jobs"

export default async (req, res) => {
  const dbs = await getAndUpdateAllJobs()

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.json({ status: "Success" })
}
