import Link from "next/link"
import Image from "next/image"

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#330065] text-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 flex items-center gap-3">
          <Image
            src="/images/shagun-logo.svg"
            alt="Shagun Direct"
            width={40}
            height={40}
          />
          <div>
            <p className="text-lg font-semibold">Shagun Direct</p>
            <p className="text-sm text-white/70">Terms & Conditions</p>
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-semibold">
          Shagun Direct – Terms & Conditions
        </h1>
        <p className="mb-8 text-sm text-white/70">Last Updated: 18th May 2026</p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-white/90 sm:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              These Terms & Conditions (Terms) govern the use of the Shagun Direct
              platform (Platform, Shagun Direct, we, our, us).
            </p>
            <p>
              By accessing or using the Platform, you confirm that you have read,
              understood and agreed to comply with these Terms.
            </p>
            <p>
              If you do not agree with these Terms, you must not use the Platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">2. About The Platform</h2>
            <p>
              Shagun Direct is a digital gifting platform which enables couples to
              create event profiles/pages and receive monetary gifts from contributors
              through integrated third-party payment processing services.
            </p>
            <p>
              The Platform may also offer optional digital features including greeting
              cards, video greetings, notifications, announcements and event-related
              communications.
            </p>
            <p>
              Shagun Direct acts solely as a technology platform facilitator and does
              not operate as a bank, financial institution or regulated payment
              service provider.
            </p>
            <p>
              Nothing within these Terms shall be interpreted as creating a banking,
              escrow or financial services relationship between Shagun Direct and
              users of the Platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">3. Eligibility</h2>
            <p>To use the Platform, users must:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Be at least 18 years old;</li>
              <li>Provide accurate and complete information;</li>
              <li>Use the Platform lawfully and in accordance with these Terms.</li>
            </ul>
            <p>
              We reserve the right to restrict or suspend access where we reasonably
              believe misuse, fraud or unlawful activity may have occurred.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">4. Accounts</h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">4.1 Couple Accounts</h3>
              <p>Couples may create accounts in order to:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Create and manage event pages;</li>
                <li>Receive gifts through the Platform;</li>
                <li>Access contributor information;</li>
                <li>Use available Platform features.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">4.2 Guest Users</h3>
              <p>Guests are not required to create accounts.</p>
              <p>
                Guests may access payment pages through QR codes, direct links or
                event invitations.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">4.3 Account Information</h3>
              <p>
                Users are responsible for ensuring account information provided is
                accurate.
              </p>
              <p>
                Certain account information or account amendments may only be updated
                or processed through Shagun Direct administration/support processes.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">4.4 Account Deactivation</h3>
              <p>Accounts may be:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>
                  Suspended or deactivated by Shagun Direct where suspicious, abusive
                  or unlawful activity is identified; or
                </li>
                <li>
                  Automatically deactivated by system processes after a period of
                  inactivity.
                </li>
              </ul>
              <p>
                Users cannot independently delete accounts through the Platform
                interface.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              5. Platform Services & Features
            </h2>
            <p>The Platform may provide features including:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Event/Wedding Page Creation;</li>
              <li>QR Code Invitation Functionality;</li>
              <li>Digital Gifting/Payment Functionality;</li>
              <li>Greeting Card Functionality;</li>
              <li>Video Greeting Functionality;</li>
              <li>Notifications And Announcements;</li>
              <li>Customer Support Communication Tools;</li>
              <li>Contributor Statistics And Rankings.</li>
            </ul>
            <p>
              Certain features may be modified, restricted or discontinued at any time
              without prior notice.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              6. Payments & Third-Party Processing
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">6.1 Payment Processing</h3>
              <p>
                Payments made through the Platform are processed through third-party
                payment providers including Stripe.
              </p>
              <p>
                Shagun Direct does not store or process users’ card details or
                sensitive banking credentials directly.
              </p>
              <p>
                Guests are redirected to Stripe’s payment infrastructure to complete
                payment processing.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">6.2 Platform Role</h3>
              <p>
                Shagun Direct acts solely as a facilitator of the Platform services.
              </p>
              <p>The Platform does not:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Hold customer funds;</li>
                <li>Operate customer bank accounts;</li>
                <li>Act as a regulated payment institution;</li>
                <li>Provide financial services.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">6.3 Platform Fees</h3>
              <p>
                Platform fees and service-related charges may apply to certain
                transactions and optional digital features.
              </p>
              <p>
                Fees may be amended periodically at the discretion of Shagun Direct.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">6.4 Payment Failures</h3>
              <p>Shagun Direct is not responsible for:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Failed transactions;</li>
                <li>Payment processing delays;</li>
                <li>Card issuer refusals;</li>
                <li>Third-party payment provider outages;</li>
                <li>Banking interruptions outside our reasonable control.</li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              7. Greeting Cards & Video Features
            </h2>
            <p>
              The Platform may offer optional paid digital greeting cards and/or video
              greetings.
            </p>
            <p>
              Users may only select one optional feature per transaction where
              applicable.
            </p>
            <p>
              Once a digital greeting card or video greeting has been processed and
              delivered in real time, it becomes non-refundable.
            </p>
            <p>
              All processed services and completed transactions are generally
              non-refundable unless otherwise required by applicable law.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              8. Contributor Visibility & Display Names
            </h2>
            <p>
              Contributors may provide display names/messages through the Platform.
            </p>
            <p>Contributor display names may be visible:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>To the relevant couple account;</li>
              <li>To authorised Shagun Direct administrators;</li>
              <li>
                Within contributor ranking/statistics features where applicable.
              </li>
            </ul>
            <p>
              Sensitive payment details and cardholder information submitted through
              Stripe are handled separately by Stripe in accordance with their own
              policies and regulatory requirements.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              9. User Content & Conduct
            </h2>
            <p>Users must not upload, submit or distribute content which:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Is unlawful, abusive or misleading;</li>
              <li>Infringes intellectual property rights;</li>
              <li>Contains offensive, harmful or defamatory material;</li>
              <li>Constitutes spam or fraudulent activity;</li>
              <li>Violates applicable laws or regulations.</li>
            </ul>
            <p>Shagun Direct reserves the right to:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Remove content;</li>
              <li>Restrict accounts;</li>
              <li>Suspend or terminate users;</li>
              <li>Investigate suspected misuse.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              10. Messaging, Notifications & Communications
            </h2>
            <p>The Platform may provide:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Transactional notifications;</li>
              <li>Support communications;</li>
              <li>Operational announcements;</li>
              <li>Marketing/promotional communications.</li>
            </ul>
            <p>
              By using the Platform, users acknowledge that service-related
              communications may be sent electronically.
            </p>
            <p>
              Marketing communications may be managed in accordance with applicable
              privacy and marketing laws.
            </p>
            <p>
              Users may opt out of marketing communications where applicable, however
              operational or service-related communications may still be sent where
              reasonably necessary for Platform functionality or account
              administration.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              11. Intellectual Property
            </h2>
            <p>
              All Platform content, branding, logos, software, designs and materials
              are owned by or licensed to Shagun Direct.
            </p>
            <p>Users may not:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Copy;</li>
              <li>Reproduce;</li>
              <li>Redistribute;</li>
              <li>Modify; or</li>
              <li>
                Exploit Platform content without prior written permission.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              12. Platform Availability
            </h2>
            <p>
              We do not guarantee uninterrupted or error-free availability of the
              Platform.
            </p>
            <p>The Platform may occasionally be unavailable due to:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Maintenance;</li>
              <li>Technical issues;</li>
              <li>Third-party provider failures;</li>
              <li>System upgrades;</li>
              <li>Events outside our reasonable control.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              13. Limitation Of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Shagun Direct shall not be
              liable for:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Indirect or consequential losses;</li>
              <li>Loss of profits, revenue or goodwill;</li>
              <li>Payment provider failures;</li>
              <li>Delays or interruptions in services;</li>
              <li>User-generated content;</li>
              <li>Unauthorised access caused by third parties.</li>
            </ul>
            <p>
              Nothing in these Terms excludes liability which cannot lawfully be
              excluded under applicable law, including liability for fraud or
              fraudulent misrepresentation.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              14. Suspension & Termination
            </h2>
            <p>
              We reserve the right to suspend, restrict or terminate access to the
              Platform where:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Fraud or suspicious activity is identified;</li>
              <li>These Terms are breached;</li>
              <li>Unlawful conduct is suspected;</li>
              <li>Platform misuse occurs.</li>
            </ul>
            <p>
              Termination or suspension may occur without prior notice where
              reasonably necessary.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">15. Privacy</h2>
            <p>
              Use of the Platform is also governed by our Privacy Policy and related
              privacy notices.
            </p>
            <p>
              Users acknowledge that personal data may be processed in connection with
              Platform functionality, support services, payment processing and
              communications.
            </p>
            <p>
              Where third-party providers including Stripe process payment-related
              information, such processing shall also be subject to the applicable
              third-party provider terms and privacy policies.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              16. Changes To The Terms
            </h2>
            <p>We may update or modify these Terms periodically.</p>
            <p>
              Updated Terms will become effective once published on the Platform.
            </p>
            <p>
              Continued use of the Platform following updates constitutes acceptance
              of the revised Terms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              17. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with the
              laws of England & Wales.
            </p>
            <p>
              Any disputes arising in connection with these Terms shall be subject to
              the exclusive jurisdiction of the courts of England & Wales.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">18. Contact</h2>
            <p>
              For support or enquiries relating to the Platform, users may contact
              Shagun Direct through the communication methods provided within the
              Platform.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link
            href="/privacy-notice"
            className="border-b border-white/60 hover:border-white"
          >
            Privacy Notice
          </Link>          
        </div>
      </div>
    </div>
  )
}

export default TermsOfServicePage
