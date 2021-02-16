import React from "react"
import Head from "next/head"
import DefaultErrorPage from "next/error"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"
import { useRouter } from "next/router"

import { getAllCompaniesOnly, getCompanyBySlug } from "../../lib/company"
import JobsList from "../../components/JobsList"

export async function getStaticPaths() {
  const companies = await getAllCompaniesOnly()
  if (companies.length) {
    return {
      paths: companies.map((company) => {
        const {
          company: { data: companyData },
        } = company
        return {
          params: {
            companySlug: companyData.slug,
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
  const company = await getCompanyBySlug(ctx.params.companySlug)
  const notFound = !company
  if (!notFound) {
    let companyData = JSON.parse(company)
    return {
      props: {
        company: companyData.company,
        jobs: companyData.jobs,
      },
      revalidate: 1,
    }
  } else {
    return {
      props: {},
      notFound,
    }
  }
}

const RemoteCompaniesIndexPage = (props) => {
  const router = useRouter()
  const {
    company: { data: company },
    jobs: { data: jobs },
  } = props

  let date = new Date()
  let dateOptions = {
    year: "numeric",
    month: "long",
  }

  if (router.isFallback) {
    return (
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
        <h1>Loading...</h1>
      </div>
    )
  }

  if (!company) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  } else {
    return (
      <>
        <NextSeo
          title={`${company.name} hiring remotely`}
          description={`${company.name} is hiring remotely. ${
            jobs.length
          } remote jobs open in ${date.toLocaleDateString(
            "en-EN",
            dateOptions
          )}`}
          canonical={`https://remotebond.com/remote-companies/${company.slug}`}
          openGraph={{
            url: `https://remotebond.com/remote-companies/${company.slug}`,
            title: `${company.name} hiring remotely`,
            description: `${company.name} is hiring remotely. ${
              jobs.length
            } remote jobs open in ${date.toLocaleDateString(
              "en-EN",
              dateOptions
            )}`,
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
              item: "https://remotebond.com/remote-companies",
            },
            {
              position: 3,
              name: `${company.name}`,
            },
          ]}
        />
        <div className="relative overflow-hidden bg-black">
          <div className="max-w-screen-xl mx-auto text-center py-6 md:py-12 px-4 sm:px-6">
            <h1 className="text-white font-black text-2xl md:text-4xl my-4">
              {company.name}
            </h1>
            <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
              {company.name} is hiring remotely and currently has {jobs.length}{" "}
              remote job {jobs.length === 1 ? "position" : "positions"} open in{" "}
              {date.toLocaleDateString("en-EN", dateOptions)}
            </h2>
          </div>
        </div>

        <div className="w-full max-w-screen-xl mx-auto py-10 px-4 sm:px-6">
          {jobs && jobs.length && (
            <JobsList title={`Remote jobs at ${company.name}`} jobs={jobs} />
          )}
        </div>
      </>
    )
  }
}

export default RemoteCompaniesIndexPage
