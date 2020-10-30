import React from "react"
import { NextSeo, BreadcrumbJsonLd } from "next-seo"

import PageHeader from "../../../components/PageHeader"

const ForumCategoryIndexPage = () => {
  return (
    <>
      <NextSeo
        title={`Remotebond Forum a hub for everything related to remote work`}
        description="The Remotebond Forum is a how-to content hub for all things remote work."
        canonical={`https://remotebond.com/forum`}
        openGraph={{
          url: `https://remotebond.com/forum`,
          title: `Remotebond Forum a hub for everything related to remote work`,
          description: `The Remotebond Forum is a how-to content hub for all things remote work.`,
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
            name: "Forum",
          },
        ]}
      />
      <PageHeader
        title={`Remotebond Forum`}
        subtitle={`The Remotebond Forum is a how-to content hub for all things remote work. From best practices for job seekers, tools, resources and news to hiring tips and processes, the Remotebond forum is meant to be community-driven documentation on how to get remote work right.`}
      />
    </>
  )
}

export default ForumCategoryIndexPage
