import React from "react"
import Link from "next/link"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import { getAllCompaniesOnly, getCompanyBySlug } from "../../lib/company"

export async function getStaticPaths() {
  const companies = await getAllCompaniesOnly()
  console.log(companies)
  if (companies.length) {
    return {
      paths: companies.map((company) => {
        return {
          params: {
            companySlug: company.data.slug,
          },
        }
      }),
      fallback: "blocking",
    }
  } else {
    return {
      paths: [],
      fallback: "blocking",
    }
  }
}

export async function getStaticProps(ctx) {
  const company = await getCompanyBySlug(ctx.parans.companySlug)
  let companyData = JSON.parse(company)
  return {
    props: {
      companies: companyData,
    },
    revalidate: 1,
  }
}

const RemoteCompaniesIndexPage = (props) => {
  const { companies } = props
  let date = new Date()
  let dateOptions = {
    year: "numeric",
    month: "long",
  }
  return (
    <>
      <NextSeo
        title={`Remote Companies Hiring`}
        description={`Remote companies hiring in ${date.toLocaleDateString(
          "en-EN",
          dateOptions
        )} allowing employees to work remotely`}
        canonical={`https://remotebond.com/remote-companies`}
        openGraph={{
          url: `https://remotebond.com/remote-companies`,
          title: `Remote Companies Hiring`,
          description: `Remote companies hiring in ${date.toLocaleDateString(
            "en-EN",
            dateOptions
          )} allowing employees to work remotely`,
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
            name: "Remote Companies",
          },
        ]}
      />
      <div className="relative overflow-hidden bg-black">
        <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
          <h1 className="text-white font-black text-2xl md:text-4xl my-4">
            Remote Companies
          </h1>
          <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
            Browse {`${companies.length}`} Remote Companies in{" "}
            {date.toLocaleDateString("en-EN", dateOptions)} who allow their
            employees to work remotely.
          </h2>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
        <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company, cidx) => {
            return (
              <li key={cidx}>
                <Link href={`/remote-companies/${company.slug}`}>
                  <a
                    title={`View remote company profile of ${company.name}`}
                    className="col-span-1 flex shadow-sm rounded-md group hover:cursor-pointer"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-16 bg-rb-gray-5 text-white text-sm leading-5 font-medium rounded-l-md group-hover:bg-blue-600">
                      {company.name.substring(0, 2)}
                    </div>
                    <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                      <div className="flex-1 px-4 py-2 text-sm leading-5 truncate">
                        <span className="text-gray-900 font-medium hover:text-gray-600 transition ease-in-out duration-150">
                          {company.name}
                        </span>
                        <p className="text-gray-500">
                          {company.jobsCount} Open{" "}
                          {company.jobsCount === 1 ? "position" : "positions"}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default RemoteCompaniesIndexPage
