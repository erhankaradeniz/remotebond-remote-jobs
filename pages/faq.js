import React from "react"

const FaqPage = () => {
  return (
    <>
      <div className="relative overflow-hidden bg-black mb-12">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <h2 className="text-4xl leading-10 font-display font-semibold text-white text-center md:text-5xl md:leading-none">
            Frequently asked questions
          </h2>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mt-6">
          <dl className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Why are you calling it "early access"?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    We're really happy with the components we've put together so
                    far, but we've still got a ton more we're planning to build.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Every component you see in the preview is available to use
                    today, but that's only about 25% of what we have planned.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Instead of waiting until we've completely exhausted our own
                    ideas before releasing the product, we decided to open it up
                    as soon as we had enough to be useful so you can start
                    getting value from it right away.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    We'll be adding new components on a regular basis, based on
                    our own ideas and on suggestions from early access
                    customers.
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What JS framework does Tailwind UI use?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    In order to be as universal as possible, Tailwind UI is an
                    HTML-only component library and{" "}
                    <strong className="font-semibold text-gray-900">
                      does not include any JavaScript
                    </strong>
                    .
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Most of the components do not rely on JS at all, but for the
                    ones that do (dropdowns, modals, etc.) we've provided some
                    simple comments in the HTML to explain things like what
                    classNamees you need use for different states (like a toggle
                    switch being on or off), or what classNamees we recommend
                    for transitioning elements on to or off of the screen (like
                    a modal opening).
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    To get a better idea of how this looks in practice,
                    <a
                      href="/documentation#integrating-with-javascript-frameworks"
                      className="text-gray-700 font-medium"
                    >
                      check out our documentation
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What version of Tailwind CSS is used?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    The components in Tailwind UI are authored using Tailwind
                    CSS v1.8. They also depend on some extensions to Tailwind's
                    default config that we've bundled up in @tailwindcss/ui as a
                    simple plugin.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Learn more about this in our
                    <a
                      href="/documentation"
                      className="text-gray-700 font-medium"
                    >
                      getting started documentation
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What browsers does Tailwind UI support?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    The components in Tailwind UI are designed to work in the
                    latest, stable releases of all major browsers, including
                    Chrome, Firefox, Safari, and Edge.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    We don't support Internet Explorer 11.
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What does "free updates" include?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    We're planning to add new Marketing and Application UI
                    components regularly over time and all new components added
                    to those categories will be totally free for existing
                    customers.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    We may work on new component kits in the future that would
                    be sold separately (email templates and e-commerce are ideas
                    we've tossed around), but any components we design and build
                    that belong in an existing kit will always be added as a
                    free update.
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What does "community access" mean?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Any purchase of Tailwind UI includes access to our private
                    Discord server where you can suggest new component ideas,
                    ask your peers for help with any problems you run into, and
                    talk with other users about building things with Tailwind
                    UI.
                  </p>
                </dd>
              </div>
            </div>
            <div className="mt-12 sm:mt-0">
              <div id="team-pricing">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  How do I purchase a license for my entire team?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    You can purchase a license that you can share with your
                    entire team for $599 USD here:
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    <a
                      href="https://gum.co/NJFeyW"
                      className="text-teal-500 font-semibold"
                    >
                      Buy a team license for $599 →
                    </a>
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    Team licenses are still just
                    <strong>a single user account</strong>
                    (at least for now), so use an email address like
                    "team@yourcompany.com" when creating an account, and share
                    those credentials with your team.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    For more information on team licensing specifics,
                    <a href="/license" className="text-gray-700 font-medium">
                      read through our license
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What does "unlimited projects" mean?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Unlike most other templates/themes, you don't have to buy a
                    new Tailwind UI license every time you want to use it on a
                    new project.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    As long as what you're building will be owned by the
                    Tailwind UI license holder, you can build as many sites as
                    you want without ever having to buy an additional license.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    For more information and examples,
                    <a href="/license" className="text-gray-700 font-medium">
                      read through our license
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div>
                <dt className="mt-12 text-lg leading-6 font-medium text-gray-900">
                  Can I use Tailwind UI for client projects?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Yes! You can use Tailwind UI for basically anything — the
                    only thing we disallow is using it to create derivative
                    competing products.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    For more information and examples,
                    <a href="/license" className="text-gray-700 font-medium">
                      read through our license
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can I use Tailwind UI for my own commercial projects?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Absolutely! Your license gives you permission to build as
                    many of your own projects as you like, whether those are
                    simple public websites or SaaS applications that end users
                    need to pay to access.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    For more information and examples,
                    <a href="/license" className="text-gray-700 font-medium">
                      read through our license
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can I use Tailwind UI in open source projects?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    Yep! As long as what you're building is some sort of actual
                    website and not a derivative component library, theme
                    builder, or other product where the primary purpose is
                    clearly to repackage and redistribute our components, it's
                    totally okay for that project to be open source.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    For more information and examples of what is and isn't okay,
                    <a href="/license" className="text-gray-700 font-medium">
                      read through our license
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can I sell templates/themes I build with Tailwind UI?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    No, you cannot use Tailwind UI to create derivative products
                    like themes, UI kits, page builders, or anything else where
                    you would be repackaging and redistributing our components
                    for someone else to use to build their own sites.
                  </p>
                  <p className="mt-4 text-base leading-6 text-gray-500">
                    For more information and examples of what is and isn't okay,
                    <a href="/license" className="text-gray-700 font-medium">
                      read through our license
                    </a>
                    .
                  </p>
                </dd>
              </div>
              <div className="mt-12">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What is your refund policy?
                </dt>
                <dd className="mt-2">
                  <p className="text-base leading-6 text-gray-500">
                    If you're unhappy with your purchase for any reason, email
                    us at
                    <a
                      href="mailto:support@tailwindui.com"
                      className="text-gray-700 font-medium"
                    >
                      support@tailwindui.com
                    </a>
                    within 90 days and we'll refund you in full, no questions
                    asked.
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
