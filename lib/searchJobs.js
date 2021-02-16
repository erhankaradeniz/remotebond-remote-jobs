import faunadb from "faunadb"
import { flattenDataKeys } from "../helpers/util"

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const {
  Match,
  Paginate,
  Index,
  Lambda,
  Map,
  Var,
  Get,
  Filter,
  ContainsStr,
  LowerCase,
  Select,
} = q
const client = new faunadb.Client({ secret })

async function searchJobsByTitle(keyword) {
  return client
    .query(
      Map(
        Filter(
          Paginate(Match(Index("all_jobs")), { size: 5000 }),
          Lambda(
            "jobRef",
            ContainsStr(
              LowerCase(Select(["data", "title"], Get(Var("jobRef")))),
              keyword
            )
          )
        ),
        Lambda("jobRef", Get(Var("jobRef")))
      )
    )
    .then((res) => {
      return JSON.stringify({ data: res })
    })
    .catch((err) => {
      console.log(err)
      throw err
    })
}

export { searchJobsByTitle }
