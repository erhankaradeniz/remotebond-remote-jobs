import React from "react"
import Link from "next/link"
import { FAQPageJsonLd, NextSeo, BreadcrumbJsonLd } from "next-seo"

const FaqPage = () => {
  return (
    <>
      <NextSeo
        title={`Remotebond - Frequently Asked Questions`}
        description="Remotebond - Frequently asked questions about remote work, remote jobs and regular information about Remotebond"
        canonical={`https://remotebond.com/frequently-asked-questions`}
        openGraph={{
          url: `https://remotebond.com/frequently-asked-questions`,
          title: `Remotebond - Frequently Asked Questions`,
          description: `Remotebond - Frequently asked questions about remote work, remote jobs and regular information about Remotebond`,
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
            name: "Frequently Asked Questions",
          },
        ]}
      />
      <FAQPageJsonLd
        mainEntity={[
          {
            questionName: "What is Remotebond?",
            acceptedAnswerText:
              "Remotebond is a global community of remote workers. It is a place where knowledge is shared to shape the future of remote work. Whether you’re a remote company looking to hire or a worker looking for your next remote opportunity, I have created a platform that provides a variety of jobs with new listings added daily. With Remotebond, I aim to bring talented freelancers and remote workers to companies from all over the world, making the world of work barrier-free.",
          },
          {
            questionName: "How do I post a job on Remotebond?",
            acceptedAnswerText:
              "To post a job on Remotebond Click on 'Post a job' in the header. Fill out the required information in the form, and preview your job posting. If everything looks okay, fill out your payment information and press 'Post job'. After a successfull payment, you will receive a receipt containing information about your job posting. Keep this receipt, as it contains information about your posting and how to edit it.",
          },
          {
            questionName: "Can I edit my job post after it's live?",
            acceptedAnswerText:
              "It is possible to edit your post after it's live. However keep in mind that you cannot edit your job title after it's live. Everything else is editable. To edit your post, look for the email receipt you received after posting your job. In this email you will find the link to edit your post.",
          },
          {
            questionName: "How much does it cost to post a job?",
            acceptedAnswerText:
              "The current price to post a base job post is $25. Prices will increase after the initial launch period. You can choose to highlight your post, this will ensure that your post stands out from the rest and gets more attention. The extra price for this is $100. It is also possible to add a company logo to your job post. This makes sure people recognize your company and it also helps to get more attention to your job post. The extra price for this is $25",
          },
          {
            questionName: "How long will my post be live?",
            acceptedAnswerText:
              "Your post will be online for 30 days. After that your post will be archived and visitors will not be able to apply for the position anymore.",
          },
          {
            questionName: "Will my post auto bump after 30 days?",
            acceptedAnswerText:
              "Currently your post will not auto-bump and you are not able to bump it yourself. If you need your post to bump, please contact me, and I can bump it manually for you.",
          },
          {
            questionName: "How can I register a profile on Remotebond?",
            acceptedAnswerText:
              "Click on the 'Register account' button on the homepage or go directly to the register page to create a profile on Remotebond.",
          },
        ]}
      />
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <h1 className="text-4xl leading-10 font-display font-semibold text-white text-center md:text-5xl md:leading-none">
            Frequently Asked Questions
          </h1>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mb-12">
            <h2 className="text-xl leading-7 font-bold text-gray-900">
              What is Remotebond?
            </h2>
            <p className="text-base leading-6 text-gray-500">
              Remotebond is a global community of remote workers. It is a place
              where knowledge is shared to shape the future of remote work.
            </p>
            <p className="mt-4 text-base leading-6 text-gray-500">
              Whether you’re a remote company looking to hire or a worker
              looking for your next remote opportunity, I have created a
              platform that provides a variety of jobs with new listings added
              daily.
            </p>
            <p className="mt-4 text-base leading-6 text-gray-500">
              With Remotebond, I (
              <a
                href="https://www.twitter.com/erhankaradeniz"
                title="Erhan Karadeniz on Twitter"
                className="font-medium"
              >
                Erhan Karadeniz
              </a>
              ) aim to bring talented freelancers and remote workers to
              companies from all over the world, making the world of work
              barrier-free.
            </p>
          </div>
          <dl className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  <h2>How do I post a job on Remotebond?</h2>
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Are you looking for a remote worker? Let Remotebond help
                    you!
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    <strong>To post a job on Remotebond</strong>
                  </p>
                  <ol className="list-decimal pl-4 mt-4 text-base leading-6 text-gray-500">
                    <li>
                      Click on "Post a job" in the header or{" "}
                      <Link as={`/hire-remotely`} href={`/hire-remotely`}>
                        <a
                          className="font-medium"
                          title="Post a remote job on Remotebond"
                        >
                          click here
                        </a>
                      </Link>
                    </li>
                    <li className="mt-1">
                      Fill out the required information in the form, and preview
                      your job posting.
                    </li>
                    <li className="mt-1">
                      If everything looks okay, fill out your payment
                      information and press "Post job".
                    </li>
                    <li className="mt-1">
                      After a successfull payment, you will receive a receipt
                      containing information about your job posting. Keep this
                      receipt, as it contains information about your posting and
                      how to edit it.
                    </li>
                  </ol>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Secure payment guaranteed by{" "}
                    <a
                      href="https://www.stripe.com"
                      title="Remotebond payments by Stripe"
                      className="font-medium"
                    >
                      Stripe
                    </a>{" "}
                    over HTTPS
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  <h2>Can I edit my job post after it's live?</h2>
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    It is possible to edit your post after it's live. However
                    keep in mind that you cannot edit your job title after it's
                    live. Everything else is editable.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    To edit your post, look for the email receipt you received
                    after posting your job. In this email you will find the link
                    to edit your post. If you have not received this email,{" "}
                    <a
                      href="https://www.twitter.com/erhankaradeniz"
                      title="Contact Erhan Karadeniz"
                      className="font-medium"
                    >
                      contact
                    </a>{" "}
                    me and I will be happy to help you out.
                  </p>
                </dd>
              </div>
            </div>
            <div className="mt-12 sm:mt-0">
              <div id="team-pricing">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  <h2>How much does it cost to post a job?</h2>
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    The current price to post a <strong>base</strong> job post
                    is <strong>$25</strong>. Prices will increase after the
                    initial launch period.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    <strong>Make your job stand out!</strong>
                  </p>
                  <p className="text-base leading-6 text-gray-500">
                    You can choose to highlight your post, this will ensure that
                    your post stands out from the rest and gets more attention.
                    The extra price for this is <strong>$100</strong>
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    <strong>Add your logo</strong>
                  </p>
                  <p className="text-base leading-6 text-gray-500">
                    It is also possible to add a company logo to your job post.
                    This makes sure people recognize your company and it also
                    helps to get more attention to your job post. The extra
                    price for this is <strong>$25</strong>
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  <h2>How long will my post be live?</h2>
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Your post will be online for 30 days. After that your post
                    will be archived and visitors will not be able to apply for
                    the position anymore.
                  </p>
                </dd>
              </div>
              <div>
                <dt className="mt-12 text-lg leading-6 font-medium text-gray-900">
                  <h2>Will my post auto bump after 30 days?</h2>
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Currently your post will not auto-bump and you are not able
                    to bump it yourself. If you need your post to bump, please{" "}
                    <a
                      href="https://www.twitter.com/erhankaradeniz"
                      title="Contact Erhan Karadeniz"
                      className="font-medium"
                    >
                      contact
                    </a>{" "}
                    me, and I can bump it manually for you.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Keep in mind that bumping your job post comes with extra
                    costs. In the future you will be able to bump your post by
                    yourself.
                  </p>
                </dd>
              </div>
              <div>
                <dt className="mt-12 text-lg leading-6 font-medium text-gray-900">
                  <h2>How can I register a profile on Remotebond?</h2>
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Click on the "Register account" button on the{" "}
                    <Link as={`/`} href={`/`}>
                      <a title="Remotebond homepage" className="font-medium">
                        homepage
                      </a>
                    </Link>{" "}
                    or go directly to the{" "}
                    <Link as={`/register`} href={`/register`}>
                      <a title="Remotebond homepage" className="font-medium">
                        register
                      </a>
                    </Link>{" "}
                    page to create a profile on Remotebond.
                  </p>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default FaqPage
