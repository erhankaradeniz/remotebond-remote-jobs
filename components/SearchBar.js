import React from "react"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"

const searchClient = algoliasearch(
  "R402HAORGC",
  "c01a22df8ba63dc54a8f47d228d7531f"
)

const SearchBar = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_JOBS">
      <SearchBox />
      <Hits />
    </InstantSearch>
  )
}

export default SearchBar
