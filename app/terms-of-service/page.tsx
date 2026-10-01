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
        <p className="mb-8 text-sm text-white/70">Last updated: 2 October 2026</p>

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
              5PF. You can contact us at info@shagundirect.com.
            </p>
            <p>
              By creating an account, or by continuing past a screen that links to
              these Terms (for example, the guest details screen or the payment
              screen), you confirm that you have read, understood and agree to these
              Terms. If you do not agree, you must not use the Platform.
            </p>
            <p>
              These Terms should be read together with our Privacy Notice, which
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
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">5. Couple Accounts</h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                5.1 Creating an account
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
                5.2 Stripe onboarding and verification
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
              <h3 className="text-lg font-semibold text-white">5.3 Account security</h3>
              <p>
                Couples must keep their login details confidential and tell us
                promptly at info@shagundirect.com if they suspect unauthorised access.
                Couples are responsible for activity on their account.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">5.4 Updating information</h3>
              <p>
                Some details can be updated in the dashboard. Others may require our
                support team. Details held by Stripe must be updated with Stripe.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              6. Stripe Payment Services
            </h2>
            <p>
              Payment processing and payouts are provided by Stripe. By connecting a
              Stripe account to Shagun Direct, the Couple agrees to be bound by the
              Stripe Services Agreement and the Stripe Connected Account Agreement, as
              updated by Stripe from time to time (together, the &quot;Stripe
              Terms&quot;). Stripe processes personal information in accordance with
              the Stripe Privacy Policy.
            </p>
            <p>
              As a condition of Shagun Direct enabling payments through Stripe, the
              Couple agrees to provide accurate and complete information, and
              authorises Shagun Direct to share it, and transaction information
              related to their use of Stripe&apos;s services, with Stripe.
            </p>
            <p>
              Guests enter their card details directly into Stripe&apos;s secure card
              form. Card details are sent only to Stripe. Shagun Direct never receives
              or stores full card numbers, CVC codes or expiry dates.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">7. Fees</h2>
            <p>
              All fees are paid by the Guest, on top of the Gift. The Couple receives
              the full Gift amount.
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">7.1 Platform fee</h3>
              <p>
                3% of the Gift amount. The platform fee is not charged on Attachment
                fees.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                7.2 Attachment fees (optional)
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
                7.3 Payment processing fee
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
              <h3 className="text-lg font-semibold text-white">7.4 Price display</h3>
              <p>
                All prices are in pounds sterling (GBP). The amount first shown on the
                gift screen is a subtotal of the Gift and any Attachment. The platform
                fee, the payment processing fee and the grand total are shown on the
                payment summary before the Guest confirms payment. The Guest is not
                charged until they press Pay.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">7.5 Worked example</h3>
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
              <h3 className="text-lg font-semibold text-white">7.6 Changes to fees</h3>
              <p>
                We may change our fees for future transactions by updating these Terms
                and the Platform. Changes do not affect Gifts already made.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">8. Payouts to Couples</h2>
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
                can no longer be refunded to the Guest under section 10.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">9. Guests</h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Guests are responsible for making sure they are on the correct
                Couple&apos;s page and for entering the correct Gift amount before
                paying.
              </li>
              <li>
                By continuing past the guest details screen, the Guest agrees to
                these Terms. Our Privacy Notice explains how we use the Guest&apos;s
                information.
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
            <h2 className="text-xl font-semibold text-white">10. Refunds</h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                10.1 How to request a refund
              </h3>
              <p>
                A Guest who wants a Gift refunded must email
                info@shagundirect.com within 48 hours of the payment, giving their
                name, the Couple&apos;s name, the amount and the date of the Gift. We
                will review the request within 2 working days.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                10.2 When a refund is possible
              </h3>
              <p>
                A refund can only be made if the Gift has not yet been paid out to the
                Couple&apos;s bank account. Once a Gift has been paid out (see section
                8), we cannot refund it. The Guest may contact the Couple directly.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                10.3 What is refunded
              </h3>
              <p>
                If a refund is approved, the Gift amount is refunded to the
                Guest&apos;s original payment card. The platform fee, any Attachment
                fee and the payment processing fee are not refunded.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">10.4 Full refunds</h3>
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
                10.5 Couple&apos;s authorisation
              </h3>
              <p>
                Gifts are held in the Couple&apos;s Stripe account. The Couple
                authorises Shagun Direct to refund, from the Couple&apos;s Stripe
                balance, any Gift that qualifies for a refund under this section.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">10.6 Your legal rights</h3>
              <p>Nothing in this section affects a consumer&apos;s legal rights.</p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              11. Chargebacks and Payment Disputes
            </h2>
            <p>
              If a Guest disputes a payment with their bank or card issuer (a
              &quot;chargeback&quot;), the dispute is handled by Stripe under the
              Stripe Terms.
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Each Gift is paid into the Couple&apos;s own Stripe account. The
                Couple is responsible for chargebacks, including the disputed amount
                and any dispute fee charged by Stripe, even if the Gift has already
                been paid out.
              </li>
              <li>Shagun Direct is not responsible for chargebacks.</li>
              <li>
                Shagun Direct may, on request, give the Couple transaction records it
                holds (such as the Guest&apos;s name, the receipt and the time of
                payment) to help the Couple respond to a dispute.
              </li>
            </ul>
            <p>
              We are also not responsible for payments that are declined, delayed,
              reversed or interrupted by Stripe, card issuers or banks, or by outages
              outside our reasonable control.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              12. Wishing Cards and Video Greetings
            </h2>
            <ul className="list-disc space-y-1 ps-5">
              <li>
                Attachments are optional digital content, delivered to the Couple
                immediately after payment.
              </li>
              <li>
                By choosing an Attachment and pressing Pay, the Guest asks for
                immediate delivery and understands that the Attachment cannot be
                cancelled or refunded once delivered, except where it was faulty or
                not delivered (see section 10.4).
              </li>
              <li>
                Guests must only upload videos they have the right to share and which
                comply with section 14. Videos must not exceed 25MB.
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
              13. Account Deactivation and Deletion
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                13.1 Automatic deactivation
              </h3>
              <p>
                A Couple account is automatically deactivated 60 days after the
                account was created. If a payout is made in the 7 days before the
                account is due to be deactivated, the account stays active until 7
                days after that payout. Each further payout in that period keeps the
                account active until 7 days after it.
              </p>
              <p>
                Examples: with no recent payout, the account is deactivated on day 60.
                With a payout on day 59, it is deactivated on day 66. With a further
                payout on day 62, it is deactivated on day 69.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                13.2 Notice and extension
              </h3>
              <p>
                We will notify the Couple before the account is deactivated. To keep
                the account active, the Couple can email info@shagundirect.com before
                the deactivation date, and we will extend it by 7 days.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                13.3 Effect of deactivation
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
              <h3 className="text-lg font-semibold text-white">13.4 Reactivation</h3>
              <p>
                A Couple can ask our support team to reactivate their account at any
                time within 12 months of deactivation.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                13.5 Permanent deletion
              </h3>
              <p>
                12 months after deactivation, the account and its data are
                permanently deleted and cannot be recovered. Transaction records are
                kept for 6 years, as required by UK tax and accounting law. A Couple
                may ask us to delete their account earlier. See our Privacy Notice for
                details.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">14. Acceptable Use</h2>
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
            <p>We may remove content that breaches these Terms.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              15. What Couples and Admins Can See
            </h2>
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
                to the Couple&apos;s own bank account (section 8) and process refunds
                under section 10.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">16. Communications</h2>
            <p>
              We send service messages, including verification codes, password
              resets, payment confirmations, receipts, deactivation notices, security
              alerts and support replies. These are part of the service and cannot be
              switched off while an account is active. We do not send marketing
              messages. If we introduce them in future, we will only send them with
              your consent, and you will be able to unsubscribe at any time.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">17. Tax</h2>
            <p>
              Couples are responsible for any tax obligations that may arise from
              Gifts they receive. Shagun Direct does not provide tax advice.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              18. Intellectual Property
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
              19. Platform Availability
            </h2>
            <p>
              We aim to keep the Platform available but do not guarantee
              uninterrupted or error-free operation. We may modify, restrict or
              discontinue features. Where a change significantly affects Couples, we
              will give reasonable notice where practicable.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              20. Limitation of Liability
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
                We are not liable for losses that were not reasonably foreseeable, for
                loss of profits, revenue or goodwill, or for the acts or omissions of
                Stripe, banks, card issuers or other third parties.
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
              21. Suspension and Termination
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
              Where appropriate, we will tell you the reason. Stripe may separately
              restrict or close a Stripe account under the Stripe Terms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              22. Changes to These Terms
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
            <h2 className="text-xl font-semibold text-white">23. Complaints</h2>
            <p>
              If you have a complaint, please contact us at info@shagundirect.com, or
              through the dashboard support feature if you are a Couple. We aim to
              respond within one business day.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              24. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of England and Wales. The courts
              of England and Wales have jurisdiction, except that if you are a
              consumer living in Scotland or Northern Ireland, you may also bring
              proceedings in your local courts.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">25. Contact</h2>
            <p>Shagun Direct Limited, 167–169 Great Portland Street, London, England W1W 5PF</p>
            <p>Email: info@shagundirect.com</p>
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
