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
          Shagun Direct Privacy Notice
        </h1>
        <p className="mb-8 text-sm text-white/70">Last Updated: 26 July 2026</p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-white/90 sm:text-base">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">1. Welcome</h2>
            <p>
              At Shagun Direct Limited (Shagun Direct, we, our, or
              us), we are committed to protecting your privacy and handling
              your personal information responsibly.
            </p>
            <p>
              This Privacy Notice explains how we collect, use, store, share and
              protect your personal information when you use our platform.
            </p>
            <p>
              Whether you are creating a wedding or event page as a couple, or
              sending a monetary gift as a guest, we want you to understand
              exactly what information we collect, why we collect it, and how
              your information is protected.
            </p>
            <p>
              We have written this Privacy Notice in clear, straightforward
              language to help you understand how your personal information is
              handled.
            </p>
            <p>
              By using Shagun Direct, you acknowledge that your personal
              information may be processed in accordance with this Privacy
              Notice.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              2. About Shagun Direct
            </h2>
            <p>
              Shagun Direct Limited is a digital gifting platform that enables
              couples to create personalised event pages and receive monetary
              gifts from family and friends.
            </p>
            <p>
              Couples can create a personalised page, share it using a secure
              link or QR code, and receive gifts directly into their nominated
              bank account through our payment partner, Stripe Connect.
            </p>
            <p>
              Guests are not required to create an account. They simply access
              the couple&apos;s page, personalise their gift by selecting a
              greeting card or uploading a video message if they wish, add a
              personal message, enter the gift amount and complete payment
              securely.
            </p>
            <p>
              Shagun Direct acts solely as the technology platform facilitating
              these services. We do not operate as a bank, hold customer funds or
              provide financial services.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">3. Who We Are</h2>
            <p>
              For the purposes of UK data protection law, including the UK
              General Data Protection Regulation (UK GDPR) and the Data
              Protection Act 2018, the Data Controller is:
            </p>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-white/90">
              <p className="font-semibold text-white">Shagun Direct Limited</p>
              <p>Company Number: 16753269</p>
              <p className="mt-2">Registered Office:</p>
              <p>167–169 Great Portland Street</p>
              <p>London</p>
              <p>England</p>
              <p>W1W 5PF</p>
              <p className="mt-2">
                Support Email:{" "}
                <a
                  href="mailto:info@shagundirect.com"
                  className="border-b border-white/60 hover:border-white"
                >
                  info@shagundirect.com
                </a>
              </p>
            </div>
            <p>
              If you have any questions about this Privacy Notice or how we
              process your personal information, you can contact us using the
              support options available within your account or by emailing us at
              the address above.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              4. Scope of this Privacy Notice
            </h2>
            <p>
              This Privacy Notice applies whenever you interact with Shagun
              Direct, including when you:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>create a couple account</li>
              <li>create or manage an event page</li>
              <li>upload a profile picture</li>
              <li>add payout bank details</li>
              <li>generate or share a gift link or QR code</li>
              <li>send a monetary gift</li>
              <li>upload a greeting video</li>
              <li>choose a digital greeting card</li>
              <li>contact our support team</li>
              <li>visit or use our website</li>
              <li>communicate with us regarding our services</li>
            </ul>
            <p>This Privacy Notice applies only to Shagun Direct.</p>
            <p>
              It does not apply to third-party websites or services that may be
              linked from our platform, including Stripe or other external
              providers. Those organisations have their own privacy notices and
              terms.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              5. Who This Privacy Notice Applies To
            </h2>
            <p>
              This Privacy Notice applies to all users of Shagun Direct,
              including:
            </p>
            <p>
              <span className="font-semibold text-white">Couples</span>
              <br />
              Individuals who create an account, set up an event page and receive
              gifts.
            </p>
            <p>
              <span className="font-semibold text-white">Guests</span>
              <br />
              Individuals who visit a couple&apos;s event page and send gifts
              without creating an account.
            </p>
            <p>
              <span className="font-semibold text-white">Website Visitors</span>
              <br />
              People who browse our website or contact us before creating an
              account.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              6. Personal Information We Collect
            </h2>
            <p>
              The information we collect depends on how you use Shagun Direct.
            </p>
            <p>
              We only collect information that is necessary to provide our
              services, improve the security of the platform and comply with our
              legal obligations.
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Information Couples Provide
              </h3>
              <p>When creating an account, we collect:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Full name</li>
                <li>Partner&apos;s name</li>
                <li>Event date</li>
                <li>Email address</li>
                <li>Mobile number</li>
                <li>Password</li>
              </ul>
              <p>
                During account verification we also process your email
                verification code (OTP).
              </p>
              <p>Within your profile you may choose to upload:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Profile photograph</li>
              </ul>
              <p>To enable gift payouts, we collect:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Account holder name</li>
                <li>Account number</li>
                <li>IBAN</li>
                <li>Address</li>
                <li>Currency</li>
              </ul>
              <p>
                This information is required so that monetary gifts can be
                transferred securely to your nominated account.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Information Guests Provide
              </h3>
              <p>Guests are not required to register for an account.</p>
              <p>When sending a gift, we may collect:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Full name</li>
                <li>Email address</li>
                <li>Mobile number</li>
                <li>Personal message</li>
                <li>Greeting card selection</li>
                <li>Optional uploaded video greeting</li>
                <li>Gift amount</li>
              </ul>
              <p>
                This information allows us to process the gift, deliver
                personalised content to the couple and provide transaction
                records.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Payment Information
              </h3>
              <p>Payments are securely processed using Stripe Connect.</p>
              <p>
                When making a payment, guests enter their payment card details
                directly into Stripe&apos;s secure payment environment.
              </p>
              <p>Shagun Direct does not store:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Debit card numbers</li>
                <li>Credit card numbers</li>
                <li>Card verification values (CVV/CVC)</li>
                <li>Expiry dates</li>
              </ul>
              <p>
                These details are processed directly by Stripe in accordance with
                Stripe&apos;s own Privacy Policy and security standards.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Information Collected Automatically
              </h3>
              <p>
                Whenever you access our platform, we may automatically collect
                limited technical information, including:
              </p>
              <ul className="list-disc space-y-1 ps-5">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Date and time of access</li>
                <li>Security logs</li>
                <li>Error logs</li>
              </ul>
              <p>
                This information helps us maintain the security, reliability and
                performance of the platform.
              </p>
              <p>
                We do not currently use advertising cookies, behavioural tracking
                technologies or website analytics tools.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              7. How We Collect Your Information
            </h2>
            <p>We collect personal information in several ways.</p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Information You Provide
              </h3>
              <p>
                Most personal information is provided directly by you when you:
              </p>
              <ul className="list-disc space-y-1 ps-5">
                <li>register an account</li>
                <li>complete your profile</li>
                <li>upload a profile picture</li>
                <li>add bank details</li>
                <li>send a gift</li>
                <li>upload a greeting video</li>
                <li>write a personal message</li>
                <li>contact customer support</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Information Generated Through Your Use
              </h3>
              <p>
                Some information is created automatically when you use the
                platform, including:
              </p>
              <ul className="list-disc space-y-1 ps-5">
                <li>transaction records</li>
                <li>download history</li>
                <li>support conversations</li>
                <li>account activity</li>
                <li>fraud prevention records</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Information From Third Parties
              </h3>
              <p>
                We also receive limited information from trusted third parties
                where necessary.
              </p>
              <p>For example:</p>
              <p className="font-semibold text-white">Stripe Connect</p>
              <p>
                To confirm successful payments, transaction status and
                payment-related identifiers.
              </p>
              <p>
                We do not receive or store your full payment card details.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              8. Why We Collect Your Information
            </h2>
            <p>We collect and use your personal information to:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>create and manage your account</li>
              <li>verify your identity</li>
              <li>provide personalised event pages</li>
              <li>process monetary gifts</li>
              <li>facilitate real-time payouts</li>
              <li>communicate with you</li>
              <li>provide customer support</li>
              <li>investigate fraud or suspicious activity</li>
              <li>maintain platform security</li>
              <li>comply with legal obligations</li>
              <li>improve the reliability of our services</li>
              <li>maintain accurate transaction records</li>
            </ul>
            <p>
              We only collect information that is relevant and necessary for
              these purposes.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              9. Our Lawful Basis for Processing Your Information
            </h2>
            <p>
              Under the UK General Data Protection Regulation (UK GDPR),
              organisations must have a valid legal reason for collecting and
              using personal information.
            </p>
            <p>
              Depending on how you use Shagun Direct, we rely on one or more of
              the following lawful bases.
            </p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Performance of a Contract
              </h3>
              <p>
                Most of the information we process is necessary to provide the
                services you have requested.
              </p>
              <p>This includes:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Creating and managing couple accounts</li>
                <li>Creating personalised event pages</li>
                <li>Allowing guests to send gifts</li>
                <li>Processing transactions</li>
                <li>Sending confirmations and notifications</li>
                <li>Providing customer support</li>
              </ul>
              <p>
                Without this information, we would be unable to provide the
                services offered by Shagun Direct.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Legal Obligation
              </h3>
              <p>
                In certain circumstances, we are required to process and retain
                information to comply with applicable laws and regulatory
                requirements.
              </p>
              <p>This may include:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Financial record keeping</li>
                <li>Fraud prevention</li>
                <li>Tax and accounting obligations</li>
                <li>
                  Responding to lawful requests from regulators or public
                  authorities
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Legitimate Interests
              </h3>
              <p>
                We also process certain information where it is necessary for our
                legitimate business interests, provided these interests do not
                override your rights and freedoms.
              </p>
              <p>Examples include:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Protecting the platform from fraud</li>
                <li>Detecting suspicious activity</li>
                <li>Improving platform security</li>
                <li>Resolving customer support enquiries</li>
                <li>Investigating misuse of the platform</li>
                <li>Maintaining reliable platform performance</li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">Consent</h3>
              <p>
                Where required by law, we will ask for your consent before
                processing certain types of information.
              </p>
              <p>Examples may include:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Uploading an optional greeting video</li>
                <li>Future marketing communications (if introduced)</li>
              </ul>
              <p>
                You may withdraw your consent at any time where processing is
                based on consent. Withdrawal will not affect any processing
                carried out before consent was withdrawn.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              10. How We Use Your Personal Information
            </h2>
            <p>
              Your information is used only for purposes connected with providing
              and improving Shagun Direct.
            </p>
            <p>These purposes include:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Creating your account</li>
              <li>Authenticating your identity</li>
              <li>Verifying your email address</li>
              <li>Managing your event page</li>
              <li>Displaying guest messages</li>
              <li>Processing monetary gifts</li>
              <li>Facilitating secure payouts</li>
              <li>Managing customer support requests</li>
              <li>Providing receipts and transaction records</li>
              <li>Preventing fraud</li>
              <li>Protecting users</li>
              <li>Meeting legal obligations</li>
            </ul>
            <p>We will never sell your personal information to third parties.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              11. Payment Processing
            </h2>
            <p>
              Payments made through Shagun Direct are processed securely by
              Stripe Connect.
            </p>
            <p>
              When a guest submits payment, card information is entered directly
              into Stripe&apos;s secure payment environment.
            </p>
            <p>Shagun Direct does not have access to or store:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Full card numbers</li>
              <li>CVV or CVC codes</li>
              <li>Card expiry dates</li>
              <li>Sensitive payment authentication data</li>
            </ul>
            <p>
              Stripe processes payment information in accordance with its own
              Privacy Policy, Terms of Service and applicable financial
              regulations.
            </p>
            <p>
              Once payment has been successfully authorised, Stripe notifies
              Shagun Direct that the payment has been completed, allowing us to
              update the transaction history and facilitate the transfer of funds
              to the couple&apos;s nominated account.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              12. Bank Account Information
            </h2>
            <p>
              Couples provide bank account information so monetary gifts can be
              transferred securely.
            </p>
            <p>This information may include:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Account holder name</li>
              <li>Account number</li>
              <li>IBAN</li>
              <li>Currency</li>
              <li>Billing address</li>
            </ul>
            <p>
              Bank information is stored securely and is accessible only where
              necessary to support payouts, customer support or legal obligations.
            </p>
            <p>
              Access to this information is restricted to authorised personnel.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              13. Greeting Cards and Video Greetings
            </h2>
            <p>
              Guests may personalise their gift by selecting a digital greeting
              card or uploading a video greeting.
            </p>
            <p>
              Where a video greeting is uploaded, it will be securely stored for
              up to 60 days, after which it is automatically deleted from our
              systems unless a longer retention period is required by law.
            </p>
            <p>
              Greeting messages and selected greeting cards are retained only for
              the period necessary to provide the service and allow the couple to
              access their gifts.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              14. Transaction History
            </h2>
            <p>
              To provide an accurate record of gifts received and sent, we
              maintain transaction records.
            </p>
            <p>These records may include:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Guest name</li>
              <li>Gift amount</li>
              <li>Date and time</li>
              <li>Greeting message</li>
              <li>Transaction reference</li>
              <li>Payment status</li>
            </ul>
            <p>
              Couples can download their transaction history directly from their
              dashboard in Excel format.
            </p>
            <p>
              They may also download payment receipts and other eligible
              transaction-related documents made available within the platform.
            </p>
            <p>
              Transaction records may be retained for several years where
              required to comply with legal, financial or accounting obligations.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              15. Fraud Prevention
            </h2>
            <p>
              Protecting our users is one of our highest priorities.
            </p>
            <p>
              We use reasonable measures to identify and prevent fraudulent,
              abusive or unlawful activity.
            </p>
            <p>This may include monitoring for:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Suspicious payment activity</li>
              <li>Unusual account behaviour</li>
              <li>Repeated failed payment attempts</li>
              <li>Abuse of platform features</li>
              <li>False or misleading information</li>
              <li>Activity that may breach our Terms and Conditions</li>
            </ul>
            <p>
              Where appropriate, we may investigate suspicious activity.
            </p>
            <p>
              If fraudulent or unlawful behaviour is identified, Shagun Direct
              may suspend, restrict or permanently remove access to the platform
              without prior notice where reasonably necessary.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              16. Customer Support
            </h2>
            <p>
              Couples can contact our support team directly through the support
              feature available within their dashboard.
            </p>
            <p>
              Support enquiries are generally responded to within one business
              day.
            </p>
            <p>When you contact us, we may collect information such as:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Your account details</li>
              <li>Messages exchanged with our support team</li>
              <li>Attachments you provide</li>
              <li>Technical information relevant to your enquiry</li>
            </ul>
            <p>
              We use this information solely to investigate and resolve your
              request and to improve the quality of our customer support.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              17. Communications
            </h2>
            <p>We may contact you regarding:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Account verification</li>
              <li>Password resets</li>
              <li>Payment confirmations</li>
              <li>Transaction receipts</li>
              <li>Platform updates</li>
              <li>Security alerts</li>
              <li>Customer support enquiries</li>
            </ul>
            <p>
              These communications are necessary to provide the services you use
              and cannot generally be opted out of while your account remains
              active.
            </p>
            <p>
              At present, Shagun Direct does not send promotional newsletters or
              marketing emails.
            </p>
            <p>
              Should this change in the future, we will obtain your consent where
              required by law and provide a clear option to unsubscribe.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              18. Who We Share Your Information With
            </h2>
            <p>
              We only share your personal information where it is necessary to
              operate Shagun Direct or where we are legally required to do so.
            </p>
            <p>This may include:</p>
            <p>
              <span className="font-semibold text-white">Stripe</span>
              <br />
              To securely process payments and facilitate payouts.
            </p>
            <p>
              <span className="font-semibold text-white">IONOS</span>
              <br />
              To provide secure hosting infrastructure within Europe.
            </p>
            <p>
              <span className="font-semibold text-white">
                Professional Advisers
              </span>
              <br />
              Where necessary, we may share information with accountants,
              auditors, legal advisers or other professional advisers acting on
              behalf of Shagun Direct.
            </p>
            <p>
              <span className="font-semibold text-white">
                Regulators and Public Authorities
              </span>
              <br />
              Where required by law, court order or regulatory obligation.
            </p>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              19. International Transfers
            </h2>
            <p>
              Shagun Direct is currently intended for users located within the
              United Kingdom.
            </p>
            <p>
              Our primary hosting infrastructure is located within Europe.
            </p>
            <p>
              Where personal information is transferred outside the United
              Kingdom, we will ensure that appropriate safeguards are in place,
              including recognised contractual protections or other lawful
              transfer mechanisms required under UK data protection law.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              20. Keeping Your Information Secure
            </h2>
            <p>
              We take appropriate technical and organisational measures to help
              protect your personal information.
            </p>
            <p>These measures include:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>HTTPS encryption</li>
              <li>Encrypted data storage where appropriate</li>
              <li>Secure authentication</li>
              <li>Password protection</li>
              <li>Restricted administrator access</li>
              <li>Secure Stripe-hosted payment pages</li>
              <li>Monitoring for suspicious activity</li>
            </ul>
            <p>
              Although we work hard to protect your information, no online
              platform can guarantee absolute security.
            </p>
            <p>
              Users should also take reasonable steps to protect their passwords
              and devices.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              21. How Long We Keep Your Information
            </h2>
            <p>
              We only keep personal information for as long as it is necessary to
              provide our services, meet our legal obligations, resolve disputes,
              prevent fraud and protect our business.
            </p>
            <p>
              Where possible, information is securely deleted or anonymised once
              it is no longer required.
            </p>
            <h3 className="text-lg font-semibold text-white">
              Data Retention Schedule
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-white/20">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/10 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Information</th>
                    <th className="px-4 py-3 font-semibold">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Couple account information
                    </td>
                    <td className="px-4 py-3 align-top">
                      Automatically deleted by the system after 60 days unless we
                      are legally required to retain certain information for
                      longer.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Guest contact details</td>
                    <td className="px-4 py-3 align-top">
                      Up to 60 days unless required for an active transaction or
                      legal obligation.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Greeting messages</td>
                    <td className="px-4 py-3 align-top">Up to 60 days.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Uploaded video greetings
                    </td>
                    <td className="px-4 py-3 align-top">
                      Automatically deleted after 60 days.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Profile photographs</td>
                    <td className="px-4 py-3 align-top">
                      Deleted when the associated account is removed.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Bank account information
                    </td>
                    <td className="px-4 py-3 align-top">
                      Retained while the account remains active and where required
                      to facilitate payouts or comply with legal obligations.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Payment receipts</td>
                    <td className="px-4 py-3 align-top">
                      Retained in accordance with applicable financial and
                      accounting requirements.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Transaction history</td>
                    <td className="px-4 py-3 align-top">
                      Retained for several years where required by UK tax,
                      accounting and legal obligations.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Fraud investigation records
                    </td>
                    <td className="px-4 py-3 align-top">
                      Retained for as long as reasonably necessary to investigate
                      or prevent fraud and to comply with legal obligations.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Customer support conversations
                    </td>
                    <td className="px-4 py-3 align-top">
                      Retained only for as long as necessary to resolve enquiries,
                      improve our services and meet legal obligations.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Security and system logs
                    </td>
                    <td className="px-4 py-3 align-top">
                      Retained for a limited period for security, troubleshooting
                      and fraud prevention purposes.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Where the law requires us to keep information for longer than the
              periods listed above, we will retain only the information necessary
              to meet those legal requirements.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-white">
              22. Your Rights Under UK GDPR
            </h2>
            <p>
              Under the UK General Data Protection Regulation (UK GDPR), you have
              a number of rights regarding your personal information.
            </p>
            <p>
              These rights may apply in different ways depending on the
              circumstances and the legal basis for processing your information.
            </p>
            <p>You have the right to:</p>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Access Your Information
              </h3>
              <p>
                You may request a copy of the personal information we hold about
                you.
              </p>
              <p>
                Where possible, couples can also access much of their account
                information directly through their dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Correct Inaccurate Information
              </h3>
              <p>
                If you believe any information we hold about you is inaccurate or
                incomplete, you can request that it be corrected.
              </p>
              <p>
                Certain information can be updated directly within your account,
                while other changes may require assistance from our support team.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Request Deletion
              </h3>
              <p>
                You may request that we delete your personal information where
                applicable.
              </p>
              <p>Please note that this right is not absolute.</p>
              <p>
                In some circumstances we may be legally required to retain certain
                information, including transaction records, fraud prevention
                information or financial records.
              </p>
              <p>
                Couple accounts cannot currently be deleted directly by users
                through the platform.
              </p>
              <p>
                Instead, accounts are automatically removed by our system after 60
                days unless we are required to retain certain information by law.
              </p>
              <p>
                Users may also contact our support team to request deletion, and
                each request will be considered in accordance with applicable UK
                data protection laws.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Restrict Processing
              </h3>
              <p>
                You may ask us to temporarily restrict how we use your personal
                information in certain situations, for example while a correction
                request is being investigated.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Object to Processing
              </h3>
              <p>
                Where we rely on legitimate interests as the lawful basis for
                processing, you may object to that processing.
              </p>
              <p>
                We will carefully consider your request and respond in accordance
                with UK GDPR requirements.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Data Portability
              </h3>
              <p>
                Where applicable, you may request a copy of certain information in
                a commonly used electronic format.
              </p>
              <p>Shagun Direct already allows couples to download:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>Transaction history</li>
                <li>Payment receipts</li>
                <li>Excel reports of gifts received</li>
                <li>
                  Other eligible downloadable records available through the
                  dashboard
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Withdraw Consent
              </h3>
              <p>
                Where we rely on your consent, you may withdraw that consent at
                any time.
              </p>
              <p>
                Withdrawal of consent will not affect processing carried out
                before consent was withdrawn.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">
                Exercising Your Rights
              </h3>
              <p>To exercise any of your rights, you can:</p>
              <ul className="list-disc space-y-1 ps-5">
                <li>
                  Contact us using the support feature within your dashboard.
                </li>
                <li>
                  Email us at{" "}
                  <a
                    href="mailto:info@shagundirect.com"
                    className="border-b border-white/60 hover:border-white"
                  >
                    info@shagundirect.com
                  </a>
                </li>
              </ul>
              <p>
                We aim to respond to requests without undue delay and, where
                applicable, within one calendar month.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              23. Account Suspension and Removal
            </h2>
            <p>
              To help protect all users of the platform, Shagun Direct reserves
              the right to suspend, restrict or permanently remove accounts where
              there is reasonable evidence of:
            </p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Fraudulent activity</li>
              <li>Suspicious payment behaviour</li>
              <li>Abuse of the platform</li>
              <li>False information</li>
              <li>Illegal activity</li>
              <li>Breach of our Terms and Conditions</li>
            </ul>
            <p>
              Where appropriate, we may investigate suspicious activity before
              taking action.
            </p>
            <p>
              In some situations, immediate suspension or deletion may be
              necessary to protect users, comply with legal obligations or prevent
              further misuse of the platform.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              24. Children&apos;s Privacy
            </h2>
            <p>
              Shagun Direct is intended for individuals aged 18 years or over.
            </p>
            <p>
              We do not knowingly collect personal information from children under
              the age of 18.
            </p>
            <p>
              If we become aware that personal information has been collected from
              a child under 18 without appropriate authorisation, we will take
              reasonable steps to delete that information as soon as practicable.
            </p>
            <p>
              Parents or guardians who believe that a child has provided personal
              information should contact us immediately.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">25. Cookies</h2>
            <p>Shagun Direct currently uses essential cookies only.</p>
            <p>
              These cookies are necessary for the platform to function correctly
              and cannot be disabled through our website.
            </p>
            <p>Examples include cookies used to:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Maintain secure user sessions</li>
              <li>Authenticate signed-in users</li>
              <li>Protect against fraudulent activity</li>
              <li>Improve platform security</li>
              <li>
                Remember basic user preferences necessary for platform
                functionality
              </li>
            </ul>
            <p>We do not currently use:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Advertising cookies</li>
              <li>Marketing cookies</li>
              <li>Social media tracking cookies</li>
              <li>Analytics cookies</li>
            </ul>
            <p>
              A separate Cookie Notice is available, which explains our use of
              cookies in more detail.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              26. Third-Party Services
            </h2>
            <p>
              Our platform relies on trusted third-party providers to deliver
              certain services.
            </p>
            <p>These providers include:</p>
            <ul className="list-disc space-y-1 ps-5">
              <li>Stripe Connect for secure payment processing</li>
              <li>IONOS for secure hosting infrastructure within Europe</li>
            </ul>
            <p>
              Each provider processes personal information in accordance with its
              own privacy practices and applicable legal requirements.
            </p>
            <p>
              We encourage users to review the privacy notices of these providers
              where appropriate.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              27. Links to Other Websites
            </h2>
            <p>
              Our platform may contain links to external websites or services.
            </p>
            <p>
              Once you leave the Shagun Direct website, we are not responsible for
              the privacy practices, content or security of third-party websites.
            </p>
            <p>
              We encourage you to read the privacy notice of any external website
              you visit.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              28. Changes to This Privacy Notice
            </h2>
            <p>
              We may update this Privacy Notice from time to time to reflect
              changes in our services, legal obligations or business practices.
            </p>
            <p>
              Where changes are significant, we will take reasonable steps to
              notify users through the platform or by email where appropriate.
            </p>
            <p>
              The latest version of this Privacy Notice will always be available
              on our website.
            </p>
            <p>
              The &quot;Last Updated&quot; date shown at the top of this document
              indicates when this Privacy Notice was most recently revised.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">29. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Notice or how we
              process your personal information, please contact us.
            </p>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-4 text-white/90">
              <p className="font-semibold text-white">Shagun Direct Limited</p>
              <p>Company Number: 16753269</p>
              <p className="mt-2">Registered Office:</p>
              <p>167–169 Great Portland Street</p>
              <p>London</p>
              <p>England</p>
              <p>W1W 5PF</p>
              <p className="mt-2">
                Email:{" "}
                <a
                  href="mailto:info@shagundirect.com"
                  className="border-b border-white/60 hover:border-white"
                >
                  info@shagundirect.com
                </a>
              </p>
              <p className="mt-2">
                Support: Available through your Shagun Direct dashboard.
              </p>
            </div>
            <p>
              We aim to respond to support enquiries within one business day,
              although response times may vary depending on the complexity of
              your request.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">30. Complaints</h2>
            <p>
              If you are unhappy with how we have handled your personal
              information, we encourage you to contact us first so that we have
              the opportunity to resolve your concerns.
            </p>
            <p>
              If you remain dissatisfied, you have the right to lodge a complaint
              with the Information Commissioner&apos;s Office (ICO), the UK&apos;s
              independent authority responsible for data protection and privacy.
            </p>
            <p>
              Information about making a complaint is available on the ICO&apos;s
              official website.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">
              31. Final Statement
            </h2>
            <p>Your trust is important to us.</p>
            <p>
              Shagun Direct is committed to handling your personal information
              responsibly, securely and transparently.
            </p>
            <p>
              We continually review our privacy and security practices to help
              ensure your information is protected while providing a safe,
              reliable and enjoyable gifting experience for couples and guests.
            </p>
            <p>Thank you for choosing Shagun Direct.</p>
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
