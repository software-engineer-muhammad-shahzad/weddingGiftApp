import Link from "next/link"
import Image from "next/image"

const linkClass = "border-b border-white/60 hover:border-white"

const EmailLink = () => (
  <a href="mailto:info@shagundirect.com" className={linkClass}>
    info@shagundirect.com
  </a>
)

const PrivacyNoticeLink = () => (
  <Link href="/privacy-notice" className={linkClass}>
    Privacy Notice
  </Link>
)

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    {children}
  </a>
)

const StripePrivacyPolicyLink = () => (
  <ExternalLink href="https://stripe.com/gb/privacy">Stripe Privacy Policy</ExternalLink>
)

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
        <p className="mb-8 text-sm text-white/70">Last updated: 7 October 2026</p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-white/90 sm:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
            <p>
              These Terms & Conditions (&quot;Terms&quot;) govern your use of the Shagun
              Direct website, event pages and related services (the &quot;Platform&quot;).
              The Platform is operated by Shagun Direct Limited (&quot;Shagun
              Direct&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;), a company
              registered in England and Wales under company number 16753269, with its
              registered office at 167–169 Great Portland Street, London, England W1W
              5PF. You can contact us at <EmailLink />.
            </p>
            <p>
              By creating an account, or by continuing past a screen that links to
              these Terms (for example, the guest details screen or the payment
              screen), you confirm that you have read, understood and agree to these
              Terms. If you do not agree, you must not use the Platform.
            </p>
            <p>
              These Terms should be read together with our <PrivacyNoticeLink />, which
              explains how we handle personal information.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">2. Definitions</h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                <span className="font-semibold text-white">Couple:</span> the
                person(s) who create an event page to receive gifts. The Couple&apos;s
                Stripe account is held in the name of one individual (the &quot;Account
                Holder&quot;), who is responsible for that Stripe account and for the
                Couple&apos;s use of the Platform.
              </li>
              <li>
                <span className="font-semibold text-white">Guest:</span> a person who
                opens a Couple&apos;s event link or QR code and sends a gift. Guests do
                not need an account.
              </li>
              <li>
                <span className="font-semibold text-white">Gift:</span> a voluntary
                monetary gift sent by a Guest to a Couple through the Platform.
              </li>
              <li>
                <span className="font-semibold text-white">Attachment:</span> an
                optional paid digital wishing card or video greeting sent with a Gift.
              </li>
              <li>
                <span className="font-semibold text-white">Stripe:</span> the
                third-party payment provider that processes payments and payouts for
                the Platform.
              </li>
              <li>
                <span className="font-semibold text-white">Admin:</span> authorised
                Shagun Direct staff who manage and support the Platform.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">3. About the Platform</h2>
            <p>
              Shagun Direct is a digital gifting platform. Couples create event pages
              and share them by link or QR code, and Guests use those pages to send
              Gifts, greeting messages and optional Attachments.
            </p>
            <p>
              Shagun Direct is a technology platform only. We are not a bank, e-money
              institution or regulated payment service provider. We do not hold or
              receive Gift funds. All payments are processed by Stripe, and Gift funds
              are held by Stripe in the Couple&apos;s own Stripe account until they are
              paid out to the Couple&apos;s bank account.
            </p>
            <p>
              Shagun Direct acts solely as a facilitator of the Platform services. The
              Platform does not:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>hold customer funds;</li>
              <li>operate customer bank accounts;</li>
              <li>act as a regulated payment institution; or</li>
              <li>provide financial services.</li>
            </ul>
            <p>
              Nothing in these Terms creates a banking, escrow or financial services
              relationship between Shagun Direct and users of the Platform.
            </p>
            <p>
              A Gift is a transaction between the Guest and the Couple. Shagun Direct
              is not a party to the Gift and does not sell anything to the Guest other
              than optional Attachments and the platform service.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">4. Eligibility</h2>
            <p>To use the Platform you must:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>be at least 18 years old;</li>
              <li>provide accurate, complete and up-to-date information; and</li>
              <li>use the Platform lawfully and in accordance with these Terms.</li>
            </ul>
            <p>
              Couples must also be able to open and maintain a Stripe account in the
              United Kingdom, including a UK bank account for payouts, and must meet
              Stripe&apos;s verification requirements.
            </p>
            <p>
              We may restrict or suspend access where we reasonably believe misuse,
              fraud or unlawful activity may have occurred.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              5. Platform Services & Features
            </h2>
            <p>The Platform may provide features including:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>event and wedding page creation;</li>
              <li>QR code and link invitations;</li>
              <li>digital gifting and payment through Stripe;</li>
              <li>free greeting text messages;</li>
              <li>digital wishing cards;</li>
              <li>video greetings;</li>
              <li>notifications and announcements;</li>
              <li>customer support tools;</li>
              <li>transaction history, receipts and downloads; and</li>
              <li>contributor statistics and rankings.</li>
            </ul>
            <p>
              We may modify, restrict or discontinue features at any time. Where a
              change significantly affects Couples, we will give reasonable notice
              where practicable.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">6. Couple Accounts</h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                6.1 Creating an account
              </h3>
              <p>
                Couples register on the Platform with their names, email address,
                mobile number and password, and verify their email address. Couples
                can then create and manage their event page, view Gifts and messages,
                download transaction records and use other available features.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                6.2 Stripe onboarding and verification
              </h3>
              <p>
                To receive Gifts, the Couple must connect a Stripe account to Shagun
                Direct. During onboarding the Couple is taken to Stripe&apos;s own
                pages, where Stripe collects and verifies information such as legal
                name, date of birth, address, identity documents and bank account
                details.
              </p>
              <ul className="list-disc space-y-1 ps-5">
                <li>
                  This information is given directly to Stripe. Shagun Direct does not
                  receive or store identity documents or full bank account details.
                </li>
                <li>Gifts cannot be received or paid out until Stripe has approved the account.</li>
                <li>
                  Stripe may ask for further information at any time, and may
                  restrict, suspend or close a Stripe account under its own terms.
                  Shagun Direct cannot override Stripe&apos;s decisions.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">6.3 Account security</h3>
              <p>
                Couples must keep their login details confidential and tell us
                promptly at <EmailLink /> if they suspect unauthorised access.
                Couples are responsible for activity on their account.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">6.4 Updating information</h3>
              <p>
                Some details can be updated in the dashboard. Others may require our
                support team. Details held by Stripe must be updated with Stripe.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              7. Stripe Payment Services
            </h2>
            <p>
              Payment processing and payouts are provided by Stripe. By connecting a
              Stripe account to Shagun Direct, the Couple agrees to be bound by the{" "}
              <ExternalLink href="https://stripe.com/legal/ssa">
                Stripe Services Agreement
              </ExternalLink>{" "}
              and the{" "}
              <ExternalLink href="https://stripe.com/legal/connect-account">
                Stripe Connected Account Agreement
              </ExternalLink>
              , as updated by Stripe from time to time (together, the &quot;Stripe
              Terms&quot;). Stripe processes personal information in accordance with
              the <StripePrivacyPolicyLink />.
            </p>
            <p>
              As a condition of Shagun Direct enabling payments through Stripe, the
              Couple agrees to provide accurate and complete information, and
              authorises Shagun Direct to share it, and transaction information
              related to their use of Stripe&apos;s services, with Stripe.
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">7.1 Card details</h3>
              <p>
                Guests enter their card details directly into Stripe&apos;s secure card
                form. Card details are sent only to Stripe. Shagun Direct never
                receives or stores full card numbers, CVC codes, expiry dates or other
                sensitive banking credentials.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">7.2 Payment failures</h3>
              <p>Shagun Direct is not responsible for:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>failed transactions;</li>
                <li>payment processing delays;</li>
                <li>card issuer refusals;</li>
                <li>outages at Stripe or other third-party payment providers; or</li>
                <li>banking interruptions outside our reasonable control.</li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">8. Fees</h2>
            <p>
              All fees are paid by the Guest, on top of the Gift. The Couple receives
              the full Gift amount.
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">8.1 Platform fee</h3>
              <p>
                3% of the Gift amount. The platform fee is not charged on Attachment
                fees.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                8.2 Attachment fees (optional)
              </h3>
              <p>
                Guests may add one Attachment per Gift (a wishing card or a video
                greeting, not both):
              </p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Digital wishing card: £1.00</li>
                <li>
                  Video greeting uploaded from the Guest&apos;s own device (maximum
                  25MB): £2.00
                </li>
              </ul>
              <p>A greeting text message can be added free of charge.</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                8.3 Payment processing fee
              </h3>
              <p>
                Stripe charges a fee for processing each card payment. The fee depends
                on the card used. For standard UK cards it is currently 1.5% + 20p of
                the total paid. Non-UK cards and some commercial or premium cards cost
                more. The exact processing fee for the Guest&apos;s card is calculated
                after the card details are entered and is shown on the payment summary
                before the Guest presses Pay, and on the receipt.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">8.4 Price display</h3>
              <p>
                All prices are in pounds sterling (GBP). The amount first shown on the
                gift screen is a subtotal of the Gift and any Attachment. The platform
                fee, the payment processing fee and the grand total are shown on the
                payment summary before the Guest confirms payment. The Guest is not
                charged until they press Pay.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">8.5 Worked example</h3>
              <p>
                A Guest sends a £100 Gift with a wishing card, using a standard UK
                card:
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/20">
                <table className="w-full min-w-[420px] text-left">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-3 py-2 font-semibold text-white">Item</th>
                      <th className="px-3 py-2 font-semibold text-white">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-3 py-2">Gift</td>
                      <td className="px-3 py-2">£100.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Wishing card</td>
                      <td className="px-3 py-2">£1.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Platform fee (3% of the Gift)</td>
                      <td className="px-3 py-2">£3.00</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Payment processing fee (1.5% + 20p)</td>
                      <td className="px-3 py-2">£1.79</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold text-white">Guest pays</td>
                      <td className="px-3 py-2 font-semibold text-white">£105.79</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-semibold text-white">Couple receives</td>
                      <td className="px-3 py-2 font-semibold text-white">£100.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">8.6 Changes to fees</h3>
              <p>
                We may change our fees for future transactions by updating these Terms
                and the Platform. Changes do not affect Gifts already made.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">9. Payouts to Couples</h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                <span className="font-semibold text-white">Automatic payout:</span>{" "}
                Stripe pays Gifts out to the Couple&apos;s bank account automatically,
                normally within 7 days of the Gift. There is no payout fee.
              </li>
              <li>
                <span className="font-semibold text-white">Early payout:</span> at the
                Couple&apos;s request, Shagun Direct may trigger a standard payout,
                which normally arrives within about 2 days. There is no payout fee.
              </li>
              <li>
                <span className="font-semibold text-white">Instant payout:</span> at
                the Couple&apos;s request, Shagun Direct may trigger an instant
                payout. An instant payout fee of 1% of the payout amount (or
                Stripe&apos;s minimum instant payout fee, if higher) is deducted from
                the payout. For example, an instant payout of a £100 balance pays £99.
              </li>
              <li>Payouts can only be made to the Couple&apos;s own bank account, as verified by Stripe.</li>
              <li>
                Payout times are estimates. They depend on Stripe and the banks
                involved, and may be delayed by weekends, bank holidays or
                Stripe&apos;s checks.
              </li>
              <li>
                Gifts that have been paid out, including by early or instant payout,
                can no longer be refunded to the Guest under section 11.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">10. Guests</h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Guests are not required to create an account. Guests reach a
                Couple&apos;s page through a QR code, a direct link or an event
                invitation.
              </li>
              <li>
                Guests are responsible for making sure they are on the correct
                Couple&apos;s page and for entering the correct Gift amount before
                paying.
              </li>
              <li>
                By continuing past the guest details screen, the Guest agrees to
                these Terms. Our <PrivacyNoticeLink /> explains how we use the
                Guest&apos;s information.
              </li>
              <li>
                The Guest&apos;s name, greeting message, Gift amount and any
                Attachment are shared with the Couple. The Guest&apos;s email address
                and mobile number are not shared with the Couple.
              </li>
              <li>
                Gifts are voluntary personal gifts. They are not payments for goods or
                services and must not be used for any commercial or unlawful purpose.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">11. Refunds</h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                11.1 How to request a refund
              </h3>
              <p>
                A Guest who wants a Gift refunded must email <EmailLink /> within 48
                hours of the payment, giving their name, the Couple&apos;s name, the
                amount and the date of the Gift. We will review the request within 2
                working days.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                11.2 When a refund is possible
              </h3>
              <p>
                A refund can only be made if the Gift has not yet been paid out to the
                Couple&apos;s bank account. Once a Gift has been paid out (see section
                9), we cannot refund it. The Guest may contact the Couple directly.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                11.3 What is refunded
              </h3>
              <p>
                If a refund is approved, the Gift amount is refunded to the
                Guest&apos;s original payment card. The platform fee, any Attachment
                fee and the payment processing fee are not refunded.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">11.4 Full refunds</h3>
              <p>
                The Guest will receive a full refund of everything they paid,
                including all fees, where the payment was:
              </p>
              <ul className="list-disc space-y-1 ps-5">
                <li>a duplicate payment for the same Gift;</li>
                <li>
                  the result of a technical error on the Platform (for example, the
                  wrong amount was charged, or a paid Attachment was not delivered); or
                </li>
                <li>made fraudulently or without the cardholder&apos;s authorisation.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                11.5 Couple&apos;s authorisation
              </h3>
              <p>
                Gifts are held in the Couple&apos;s Stripe account. The Couple
                authorises Shagun Direct to refund, from the Couple&apos;s Stripe
                balance, any Gift that qualifies for a refund under this section.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">11.6 Your legal rights</h3>
              <p>Nothing in this section affects a consumer&apos;s legal rights.</p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              12. Chargebacks and Payment Disputes
            </h2>
            <p>
              If a Guest disputes a payment with their bank or card issuer (a
              &quot;chargeback&quot;), the dispute is handled by Stripe under the
              Stripe Terms.
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Each Gift is paid into the Couple&apos;s own Stripe account.{" "}
                <span className="font-semibold text-white">
                  The Couple is responsible for chargebacks
                </span>
                , including the disputed amount and any dispute fee charged by Stripe,
                even if the Gift has already been paid out.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Shagun Direct is not responsible for chargebacks.
                </span>
              </li>
              <li>
                Shagun Direct may, on request, give the Couple transaction records it
                holds (such as the Guest&apos;s name, the receipt and the time of
                payment) to help the Couple respond to a dispute.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              13. Wishing Cards and Video Greetings
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Attachments are optional digital content, delivered to the Couple
                immediately after payment.
              </li>
              <li>
                <span className="font-semibold text-white">
                  By choosing an Attachment and pressing Pay, the Guest asks for
                  immediate delivery and understands that the Attachment cannot be
                  cancelled or refunded once delivered
                </span>
                , except where it was faulty or not delivered (see section 11.4).
              </li>
              <li>
                Guests must only upload videos they have the right to share and which
                comply with section 15. Videos must not exceed 25MB.
              </li>
              <li>
                Video greetings are shared only with the Couple. They are stored for
                up to 60 days and then automatically deleted. Couples should download
                any videos they wish to keep within that period.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              14. Account Deactivation and Deletion
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                14.1 Deactivation by Shagun Direct
              </h3>
              <p>
                We may suspend or deactivate an account where suspicious, abusive or
                unlawful activity is identified (see section 22).
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                14.2 Automatic deactivation
              </h3>
              <p>
                A Couple account is automatically deactivated{" "}
                <span className="font-semibold text-white">
                  60 days after the account was created
                </span>
                . If a payout is made in the 7 days before the account is due to be
                deactivated, the account stays active until 7 days after that payout.
                Each further payout in that period keeps the account active until 7
                days after it.
              </p>
              <p>
                Examples: with no recent payout, the account is deactivated on day 60.
                With a payout on day 59, it is deactivated on day 66. With a further
                payout on day 62, it is deactivated on day 69.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                14.3 Notice and extension
              </h3>
              <p>
                We will notify the Couple before the account is deactivated. To keep
                the account active, the Couple can email <EmailLink /> before the
                deactivation date, and we will extend it by 7 days.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                14.4 Effect of deactivation
              </h3>
              <p>When an account is deactivated:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>
                  the Couple&apos;s event link and QR code stop working, and Guests
                  can no longer send Gifts;
                </li>
                <li>the Couple can no longer log in; and</li>
                <li>
                  the Couple&apos;s Stripe account is not affected. Any remaining
                  balance will still be paid out by Stripe.
                </li>
              </ul>
              <p>
                Couples should download their transaction history, messages and
                videos before deactivation.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">14.5 Reactivation</h3>
              <p>
                A Couple can ask our support team to reactivate their account at any
                time within 12 months of deactivation.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                14.6 Permanent deletion
              </h3>
              <p>
                12 months after deactivation, the account and its data are
                permanently deleted and cannot be recovered. Transaction records are
                kept for 6 years, as required by UK tax and accounting law. Couples
                cannot delete their account themselves through the Platform. A Couple
                may ask us by email to delete their account earlier. See our Privacy
                Notice for details.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              15. User Content & Conduct
            </h2>
            <p>You must not use the Platform to:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                upload or send content that is unlawful, abusive, threatening,
                misleading, offensive, harmful or defamatory;
              </li>
              <li>infringe anyone&apos;s intellectual property or privacy rights;</li>
              <li>send spam, or commit fraud or money laundering;</li>
              <li>
                receive payment for goods or services, or for any purpose other than
                genuine personal gifts;
              </li>
              <li>create event pages for other people, or impersonate anyone; or</li>
              <li>interfere with, reverse-engineer or attack the Platform.</li>
            </ul>
            <p>Shagun Direct may:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>remove content;</li>
              <li>restrict accounts;</li>
              <li>suspend or terminate users; and</li>
              <li>investigate suspected misuse.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              16. Contributor Visibility & Display Names
            </h2>
            <p>
              Guests (&quot;contributors&quot;) provide a name and may add a greeting
              message. These are visible to the relevant Couple, to authorised Admins,
              and within the Couple&apos;s contributor ranking and statistics features.
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                The Couple can see each Guest&apos;s name, greeting message, Gift
                amount and any Attachment, including in the Couple&apos;s contributor
                ranking and statistics features. The Couple cannot see a Guest&apos;s
                email address or mobile number.
              </li>
              <li>
                Authorised Admins may access account and transaction information to
                operate the Platform, provide support, investigate fraud or misuse,
                and meet legal obligations.
              </li>
              <li>
                Admins cannot see card details and cannot withdraw or redirect funds
                held in a Couple&apos;s Stripe account. They can only trigger payouts
                to the Couple&apos;s own bank account (section 9) and process refunds
                under section 11.
              </li>
              <li>
                Card details submitted through Stripe are handled separately by Stripe
                under its own policies and regulatory requirements.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              17. Messaging, Notifications & Communications
            </h2>
            <p>
              The Platform provides transactional notifications, support
              communications and operational announcements. By using the Platform, you
              agree that these may be sent electronically.
            </p>
            <p>
              We send service messages, including verification codes, password
              resets, payment confirmations, receipts, deactivation notices, security
              alerts and support replies. These are part of the service and cannot be
              switched off while an account is active. We do not send marketing
              messages. If we introduce them in future, we will only send them with
              your consent, in line with privacy and marketing laws, and you will be
              able to opt out at any time. Service messages may still be sent where
              needed to run the Platform or your account.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">18. Tax</h2>
            <p>
              Couples are responsible for any tax obligations that may arise from
              Gifts they receive. Shagun Direct does not provide tax advice.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              19. Intellectual Property
            </h2>
            <p>
              All Platform content, branding, logos, wishing card designs, software
              and materials are owned by or licensed to Shagun Direct. You may not
              copy, reproduce, redistribute, modify or exploit them without our
              written permission. You keep ownership of content you upload, such as
              messages, photos and videos. You give us a limited licence to store and
              display it only to provide the Platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              20. Platform Availability
            </h2>
            <p>
              We aim to keep the Platform available but do not guarantee
              uninterrupted or error-free operation. The Platform may occasionally be
              unavailable because of:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>maintenance;</li>
              <li>technical issues;</li>
              <li>third-party provider failures;</li>
              <li>system upgrades; or</li>
              <li>events outside our reasonable control.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              21. Limitation of Liability
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Nothing in these Terms limits or excludes our liability for death or
                personal injury caused by our negligence, for fraud or fraudulent
                misrepresentation, or for any other liability that cannot be limited
                or excluded by law.
              </li>
              <li>
                If you are a consumer, you have legal rights, and nothing in these
                Terms affects them.
              </li>
              <li>
                To the fullest extent permitted by law, we are not liable for:
                indirect or consequential losses; losses that were not reasonably
                foreseeable; loss of profits, revenue or goodwill; payment provider
                failures; delays or interruptions in services; user-generated content;
                unauthorised access caused by third parties; or the acts or omissions
                of Stripe, banks, card issuers or other third parties.
              </li>
              <li>
                Subject to the above, our total liability to you in connection with
                the Platform is limited to the total fees paid to Shagun Direct in
                connection with the transaction or account concerned in the 12 months
                before the claim arose.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              22. Suspension and Termination
            </h2>
            <p>
              We may suspend, restrict or remove access to the Platform, or remove an
              event page, where we reasonably believe that:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>fraud or suspicious activity has occurred;</li>
              <li>these Terms have been breached;</li>
              <li>unlawful conduct is suspected; or</li>
              <li>the Platform is being misused.</li>
            </ul>
            <p>
              Suspension or termination may take place without prior notice where
              reasonably necessary. Where appropriate, we will tell you the reason.
              Stripe may separately restrict or close a Stripe account under the
              Stripe Terms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">23. Privacy</h2>
            <p>
              Use of the Platform is also governed by our <PrivacyNoticeLink />.
              Personal data is processed in connection with Platform functionality,
              support, payment processing and communications. Where Stripe processes
              payment-related information, that processing is also subject to the
              Stripe Terms and the <StripePrivacyPolicyLink />.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              24. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. We will post the updated
              version on the Platform with a new &quot;Last updated&quot; date. For
              material changes, we will notify Couples by email or in the dashboard
              before the changes take effect. If you do not agree to the updated
              Terms, you should stop using the Platform. Changes do not apply to
              Gifts made before they take effect.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">25. Complaints</h2>
            <p>
              If you have a complaint, please contact us at <EmailLink />, or
              through the dashboard support feature if you are a Couple. We aim to
              respond within one business day.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              26. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of England and Wales. The courts
              of England and Wales have jurisdiction, except that if you are a
              consumer living in Scotland or Northern Ireland, you may also bring
              proceedings in your local courts.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">27. Contact</h2>
            <p>Shagun Direct Limited, 167–169 Great Portland Street, London, England W1W 5PF</p>
            <p>Email: <EmailLink /></p>
            <p>Couples can also contact us through the support feature in the dashboard.</p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <PrivacyNoticeLink />
        </div>
      </div>
    </div>
  )
}

export default TermsOfServicePage
