import Link from "next/link"
import Image from "next/image"

const PrivacyNoticePage = () => {
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
            <p className="text-sm text-white/70">Privacy Notice</p>
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-semibold">
          Shagun Direct – Privacy Notice
        </h1>
        <p className="mb-8 text-sm text-white/70">Last updated: 2 October 2026</p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-white/90 sm:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">1. Welcome</h2>
            <p>
              This Privacy Notice explains how Shagun Direct collects, uses,
              stores, shares and protects personal information when you use our
              website, event pages and related services (the &quot;Platform&quot;).
              It should be read together with our 
           <span> <Link
            href="/terms-of-service"
            className="border-b border-white/60 hover:border-white"
          >
            Terms & Conditions
          </Link></span>
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              2. About Shagun Direct
            </h2>
            <p>
              Shagun Direct is a digital gifting platform. Couples create event
              pages, and Guests use them to send monetary gifts, greeting
              messages and optional wishing cards or video greetings.
            </p>
            <p>
              Payments are processed by our payment partner, Stripe. Each
              Couple has their own Stripe account, in which Stripe holds the
              Couple&apos;s gifts until they are paid out to the Couple&apos;s
              bank account. Shagun Direct is a technology platform only. We do
              not hold or receive gift funds, operate bank accounts or provide
              financial services.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">3. Who We Are</h2>
            <p>
              Shagun Direct Limited is the data controller for the personal
              information described in this notice, except where we say that
              Stripe acts as a separate controller (see section 10).
            </p>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-white/90">
              <p>Company number: 16753269</p>
              <p>Registered office: 167–169 Great Portland Street, London, England W1W 5PF</p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:info@shagundirect.com"
                  className="border-b border-white/60 hover:border-white"
                >
                  info@shagundirect.com
                </a>
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              4. Who This Notice Applies To
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                <span className="font-semibold text-white">Couples:</span>{" "}
                people who create an account and event page to receive gifts.
              </li>
              <li>
                <span className="font-semibold text-white">Guests:</span>{" "}
                people who open a Couple&apos;s event link or QR code and send a
                gift, without creating an account.
              </li>
              <li>
                <span className="font-semibold text-white">Website visitors:</span>{" "}
                people who browse our website or contact us.
              </li>
            </ul>
            <p>
              Our authorised staff (&quot;Admins&quot;) manage and support the
              Platform. Their access is described in section 12.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              5. Information We Collect
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">5.1 Couples</h3>
              <ul className="list-disc space-y-1 ps-5">
                <li>
                  Account details: full name, partner&apos;s name, event date,
                  email address, mobile number, password (stored in protected
                  form) and email verification codes.
                </li>
                <li>Profile photograph, if uploaded.</li>
                <li>
                  Stripe account information that Stripe shares with us: Stripe
                  account ID, verification and onboarding status, whether
                  payouts are enabled, and payout status.
                </li>
                <li>
                  Records of gifts received, payouts, support conversations and
                  account activity.
                </li>
              </ul>
              <p>
                We do not collect or store Couples&apos; identity documents,
                dates of birth or full bank account details. These are given
                directly to Stripe during onboarding (see section 10).
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">5.2 Guests</h3>
              <ul className="list-disc space-y-1 ps-5">
                <li>Full name, email address and mobile number, entered on the guest details screen.</li>
                <li>Gift amount and greeting message.</li>
                <li>Wishing card selection, or an uploaded video greeting (optional).</li>
                <li>
                  Payment confirmation and transaction details from Stripe,
                  such as the payment ID, status, amounts and fees.
                </li>
              </ul>
              <p>
                We never receive or store Guests&apos; card details. Card
                numbers, expiry dates and CVC codes are entered directly into
                Stripe&apos;s secure card form and go only to Stripe.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                5.3 Automatically collected information
              </h3>
              <p>
                IP address, browser type, device type, operating system, date
                and time of access, security logs and error logs.
              </p>
              <p>
                We do not use advertising cookies, behavioural tracking or
                website analytics.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              6. How We Collect Information
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                <span className="font-semibold text-white">Directly from you:</span>{" "}
                when you register, complete your profile, upload a photo, enter
                your details as a Guest, send a gift, upload a video, write a
                message or contact us.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Through your use of the Platform:
                </span>{" "}
                transaction records, download history, account activity,
                security logs and fraud-prevention records.
              </li>
              <li>
                <span className="font-semibold text-white">From Stripe:</span>{" "}
                onboarding and verification status for Couples, and payment,
                payout, refund and dispute status for transactions.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              7. Why We Use Your Information and Our Lawful Bases
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                <span className="font-semibold text-white">
                  Performance of a contract:
                </span>{" "}
                creating and managing accounts and event pages; processing
                gifts, fees, wishing cards and video greetings through Stripe;
                showing Guests&apos; names, messages and gifts to the Couple;
                sending receipts and confirmations; handling refund requests;
                and providing support.
              </li>
              <li>
                <span className="font-semibold text-white">Legal obligation:</span>{" "}
                keeping financial and tax records, and responding to lawful
                requests from authorities.
              </li>
              <li>
                <span className="font-semibold text-white">Legitimate interests:</span>{" "}
                preventing fraud and misuse, keeping the Platform secure,
                investigating suspicious activity, handling disputes and
                improving reliability. We balance these interests against your
                rights.
              </li>
              <li>
                <span className="font-semibold text-white">Consent:</span> any
                future marketing. You would be able to withdraw consent at any
                time.
              </li>
            </ul>
            <p>
              Guests&apos; mobile numbers are used to help prevent fraud (they
              are shared with Stripe for this purpose) and to contact the Guest
              about their gift or a refund. They are not used for marketing. We
              will never sell your personal information.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              8. What the Couple Can See About Guests
            </h2>
            <p>
              The Couple can see each Guest&apos;s name, greeting message, gift
              amount, date and time, and any wishing card or video greeting.
              Couples can download this as a transaction history and receipts.
            </p>
            <p>The Couple cannot see a Guest&apos;s email address or mobile number.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              9. Wishing Cards and Video Greetings
            </h2>
            <p>
              Video greetings are shared only with the Couple. They are stored
              securely for up to 60 days and then automatically deleted, unless
              the law requires us to keep them longer. Couples should download
              any videos they wish to keep within that period.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              10. Payments and Stripe
            </h2>
            <p>
              Payments are processed by Stripe. Guests enter their card details
              directly into Stripe&apos;s secure card form on our payment
              screen.
            </p>
            <p>
              When a Couple connects a Stripe account, Stripe collects identity
              and bank information, such as legal name, date of birth, address,
              identity documents and bank account details, directly from the
              Couple. Stripe uses this information to verify identity, meet its
              legal obligations (including anti-money-laundering rules) and
              make payouts.
            </p>
            <p>
              For this processing, Stripe acts as an independent data
              controller, and its use of your information is governed by the
              Stripe Privacy Policy. Couples&apos; use of Stripe is also
              governed by the Stripe Services Agreement and the Stripe
              Connected Account Agreement.
            </p>
            <p>
              We share with Stripe the information needed to process each
              payment and to help prevent fraud: the amounts and fees, the
              Guest&apos;s name, email address and mobile number, and the
              Couple&apos;s Stripe account ID. Stripe also uses its own
              fraud-prevention tools when processing payments.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              11. Who We Share Information With
            </h2>
            <p>
              We share information only where necessary to run the Platform or
              where required by law:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                <span className="font-semibold text-white">Stripe:</span>{" "}
                payment processing, fraud prevention, Couple onboarding and
                verification, payouts, refunds and disputes.
              </li>
              <li>
                <span className="font-semibold text-white">IONOS:</span>{" "}
                website and data hosting in Europe.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Email service providers:
                </span>{" "}
                sending verification codes, receipts and service messages on
                our behalf.
              </li>
              <li>
                <span className="font-semibold text-white">The Couple:</span>{" "}
                Guest information as described in section 8.
              </li>
              <li>
                <span className="font-semibold text-white">Professional advisers:</span>{" "}
                accountants, auditors and legal advisers.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Regulators, law enforcement and public authorities:
                </span>{" "}
                where required by law or a court order.
              </li>
            </ul>
            <p>
              Our service providers act on our instructions and must keep your
              information secure.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">12. Admin Access</h2>
            <p>
              Only authorised Shagun Direct staff can use admin tools. Admins
              can view account, event and transaction information, including
              Guests&apos; contact details, where needed for support, refunds,
              security, fraud prevention and legal compliance.
            </p>
            <p>
              Admins cannot see card details or Couples&apos; identity
              documents or full bank details. They cannot withdraw or redirect
              funds held in Stripe accounts. They can only trigger payouts to
              the Couple&apos;s own bank account and process refunds under our
              Terms & Conditions.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              13. International Transfers
            </h2>
            <p>
              The Platform is intended for users in the United Kingdom, and our
              main hosting is in Europe. Stripe and some service providers may
              process information outside the UK, including in the United
              States. Where this happens, we make sure appropriate safeguards
              are in place as required by UK data protection law, such as UK
              adequacy regulations, the UK International Data Transfer
              Agreement or Addendum, or the UK Extension to the EU–US Data
              Privacy Framework.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              14. Keeping Your Information Secure
            </h2>
            <p>
              We use technical and organisational measures including HTTPS
              encryption, protected storage where appropriate, secure
              authentication, restricted admin access, Stripe&apos;s secure
              card form and monitoring for suspicious activity. No online
              platform can guarantee complete security, so please keep your
              password and devices secure.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              15. Account Deactivation and Deletion
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                A Couple account is automatically deactivated 60 days after it
                was created. If a payout is made in the 7 days before
                deactivation is due, the account stays active until 7 days
                after that payout.
              </li>
              <li>
                We notify the Couple before deactivation. The Couple can email
                us to extend the account by 7 days.
              </li>
              <li>
                When an account is deactivated, the event link stops working
                and the Couple can no longer log in. The data is kept so that
                the Couple can ask us to reactivate the account.
              </li>
              <li>
                12 months after deactivation, the account and its data are
                permanently deleted, except transaction records, which we must
                keep for 6 years.
              </li>
              <li>
                A Couple can ask us to delete their account earlier (see
                section 17).
              </li>
            </ul>
            <p>
              Deactivating or deleting a Shagun Direct account does not close
              the Couple&apos;s Stripe account or delete the information Stripe
              holds.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              16. How Long We Keep Information
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/20">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/10 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Retention period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Couple account details and profile photograph
                    </td>
                    <td className="px-4 py-3 align-top">
                      Until the account is permanently deleted (12 months after
                      deactivation), or earlier on request
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Guest names, greeting messages and card selections
                    </td>
                    <td className="px-4 py-3 align-top">
                      Kept with the Couple&apos;s account and deleted when it is
                      permanently deleted
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Guest email addresses and mobile numbers
                    </td>
                    <td className="px-4 py-3 align-top">
                      Kept with the Couple&apos;s account and deleted when it is
                      permanently deleted, unless needed for an open dispute or
                      legal obligation
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Video greetings</td>
                    <td className="px-4 py-3 align-top">
                      Automatically deleted 60 days after upload
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Stripe reference data (account ID, status)
                    </td>
                    <td className="px-4 py-3 align-top">
                      While the account exists, then as part of transaction
                      records
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Transaction records and receipts (including Guest name
                      and amounts)
                    </td>
                    <td className="px-4 py-3 align-top">
                      6 years, as required by UK tax and accounting law
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Dispute and fraud investigation records
                    </td>
                    <td className="px-4 py-3 align-top">
                      As long as reasonably necessary to resolve the matter
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Support conversations</td>
                    <td className="px-4 py-3 align-top">
                      As long as needed to resolve the request, then up to 12
                      months
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Security and system logs</td>
                    <td className="px-4 py-3 align-top">Up to 12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Stripe keeps the information it collects in line with the Stripe
              Privacy Policy.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              17. Your Rights Under UK GDPR
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>access a copy of your personal information;</li>
              <li>correct inaccurate or incomplete information;</li>
              <li>
                delete your information, where applicable. This right is not
                absolute: we must keep transaction records for 6 years and may
                need to keep fraud-prevention records;
              </li>
              <li>restrict how we use your information in certain situations;</li>
              <li>object to processing based on our legitimate interests;</li>
              <li>
                data portability: receive your information in a common
                electronic format. Couples can already download transaction
                history and receipts from the dashboard; and
              </li>
              <li>withdraw consent at any time, where we rely on consent.</li>
            </ul>
            <p>
              To exercise your rights, email info@shagundirect.com. Couples can
              also use the dashboard support feature. We will respond within
              one month. For information held by Stripe, please contact Stripe
              directly.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              18. Account Suspension and Removal
            </h2>
            <p>
              We may suspend, restrict or remove accounts where there is
              reasonable evidence of fraud, suspicious payment behaviour,
              platform abuse, false information, illegal activity or a breach
              of our Terms & Conditions.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">19. Communications</h2>
            <p>
              We send service messages such as verification codes, password
              resets, payment confirmations, receipts, deactivation notices,
              security alerts and support replies. These cannot be switched off
              while an account is active. We do not send marketing emails or
              texts. If we do in future, we will only do so with your consent
              and will always include a way to unsubscribe.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">20. Children</h2>
            <p>
              The Platform is only for people aged 18 and over. We do not
              knowingly collect information from anyone under 18. If we find
              that we have, we will delete it as soon as practicable. Parents
              or guardians who have concerns should contact us.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">21. Cookies</h2>
            <p>
              We use only essential cookies, which are needed to keep sessions
              secure, authenticate signed-in users, protect against fraud and
              remember basic preferences. These cannot be disabled through the
              website. Stripe&apos;s card form may set its own cookies for
              fraud prevention, as described in the Stripe Privacy Policy. We
              do not use advertising, marketing, social media or analytics
              cookies. If this changes, we will ask for your consent first.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              22. Links to Other Websites
            </h2>
            <p>
              The Platform contains links to other websites, including Stripe.
              We are not responsible for their privacy practices, so please
              read their privacy notices.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              23. Changes to This Notice
            </h2>
            <p>
              We may update this notice to reflect changes to our services or
              legal requirements. The &quot;Last updated&quot; date shows the
              latest version. We will notify you of significant changes by
              email or through the Platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">24. Contact Us</h2>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-white/90">
              <p>Shagun Direct Limited</p>
              <p>167–169 Great Portland Street, London, England W1W 5PF</p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:info@shagundirect.com"
                  className="border-b border-white/60 hover:border-white"
                >
                  info@shagundirect.com
                </a>
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">25. Complaints</h2>
            <p>
              Please contact us first so we can try to help. You also have the
              right to complain to the Information Commissioner&apos;s Office
              (ICO), the UK data protection regulator, at ico.org.uk.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link
            href="/terms-of-service"
            className="border-b border-white/60 hover:border-white"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PrivacyNoticePage
