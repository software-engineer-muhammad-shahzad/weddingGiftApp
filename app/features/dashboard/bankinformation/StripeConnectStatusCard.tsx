"use client"

import { AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react"

import type { StripeConnectStatusData } from "@/app/features/dashboard/types/stripeConnectStatus"

type Tone = "success" | "warning" | "danger"

const toneStyles: Record<Tone, { border: string; badge: string; icon: string }> = {
  success: {
    border: "border-[#5FDA78]",
    badge: "bg-[#5FDA78]/15 text-[#5FDA78]",
    icon: "text-[#5FDA78]",
  },
  warning: {
    border: "border-[#F5C24B]",
    badge: "bg-[#F5C24B]/15 text-[#F5C24B]",
    icon: "text-[#F5C24B]",
  },
  danger: {
    border: "border-[#F87171]",
    badge: "bg-[#F87171]/15 text-[#F87171]",
    icon: "text-[#F87171]",
  },
}

// "individual.verification.document" -> "Verification document"
const humanizeRequirement = (key: string) => {
  const cleaned = key
    .replace(/^individual\./, "")
    .replace(/^company\./, "")
    .replace(/_/g, " ")
    .replace(/\./g, " ")
    .trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

const resolveOverall = (
  status: StripeConnectStatusData
): { tone: Tone; label: string; description: string } => {
  if (status.chargesEnabled && status.payoutsEnabled) {
    return {
      tone: "success",
      label: "Active",
      description: "Your account is fully verified and can receive payouts.",
    }
  }

  if (status.pastDue.length > 0 || status.errors.length > 0) {
    return {
      tone: "danger",
      label: "Action required",
      description:
        "Stripe needs more information before your account can receive payouts.",
    }
  }

  if (
    status.pendingVerification.length > 0 ||
    status.individualVerificationStatus === "pending"
  ) {
    return {
      tone: "warning",
      label: "Pending verification",
      description: "Stripe is reviewing the details you submitted.",
    }
  }

  if (status.currentlyDue.length > 0 || status.disabledReason) {
    return {
      tone: "warning",
      label: "Restricted",
      description:
        "Finish Stripe onboarding to activate payouts on your account.",
    }
  }

  return {
    tone: "warning",
    label: "In review",
    description: "Your account is being set up with Stripe.",
  }
}

const BoolRow = ({ label, value }: { label: string; value: boolean }) => (
  <div className="flex items-center justify-between py-3 px-5 border-b border-[#F1F1F11A]">
    <p className="text-sm text-[#EEEEEE]">{label}</p>
    <span
      className={`flex items-center gap-1.5 text-sm font-medium ${
        value ? "text-[#5FDA78]" : "text-[#F5C24B]"
      }`}
    >
      {value ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <Clock className="h-4 w-4" />
      )}
      {value ? "Enabled" : "Not yet"}
    </span>
  </div>
)

interface Props {
  status: StripeConnectStatusData
  isLoading?: boolean
  onResumeOnboarding?: () => void
  isResuming?: boolean
}

const StripeConnectStatusCard = ({
  status,
  isLoading,
  onResumeOnboarding,
  isResuming,
}: Props) => {
  const overall = resolveOverall(status)
  const styles = toneStyles[overall.tone]

  const outstanding = Array.from(
    new Set([...status.pastDue, ...status.currentlyDue])
  )

  const showResume =
    !!onResumeOnboarding && !(status.chargesEnabled && status.payoutsEnabled)

  return (
    <div
      style={{ backgroundColor: "#330065" }}
      className={`border ${styles.border} rounded-[30px] mt-6 mb-10 overflow-hidden glass-card [&>*:last-child]:border-b-0`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3 py-4 px-5 border-b border-[#F1F1F11A]">
        <div className="flex items-start gap-2">
          {overall.tone === "success" ? (
            <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${styles.icon}`} />
          ) : overall.tone === "danger" ? (
            <XCircle className={`h-5 w-5 shrink-0 mt-0.5 ${styles.icon}`} />
          ) : (
            <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${styles.icon}`} />
          )}
          <div>
            <p className="text-white font-medium">Payout account status</p>
            <p className="text-xs text-[#C9C9C9] mt-0.5 max-w-xs">
              {overall.description}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${styles.badge} ${
            isLoading ? "opacity-60" : ""
          }`}
        >
          {isLoading ? "Refreshing…" : overall.label}
        </span>
      </div>

      {/* CAPABILITY FLAGS */}
      <BoolRow label="Payments" value={status.chargesEnabled} />
      <BoolRow label="Payouts" value={status.payoutsEnabled} />
      <BoolRow label="Details submitted" value={status.detailsSubmitted} />

      {/* IDENTITY VERIFICATION */}
      {status.individualVerificationStatus && (
        <div className="flex items-center justify-between py-3 px-5 border-b border-[#F1F1F11A]">
          <p className="text-sm text-[#EEEEEE]">Identity verification</p>
          <span className="text-sm font-medium text-[#EEEEEE] capitalize">
            {status.individualVerificationStatus}
          </span>
        </div>
      )}

      {/* OUTSTANDING REQUIREMENTS */}
      {outstanding.length > 0 && (
        <div className="py-3 px-5 border-b border-[#F1F1F11A]">
          <p className="text-sm text-[#EEEEEE] mb-2">Information Stripe still needs</p>
          <ul className="list-disc pl-5 space-y-1">
            {outstanding.map((req) => (
              <li key={req} className="text-sm text-[#F5C24B]">
                {humanizeRequirement(req)}
                {status.pastDue.includes(req) && (
                  <span className="ml-2 text-xs text-[#F87171]">(overdue)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ERRORS */}
      {status.errors.length > 0 && (
        <div className="py-3 px-5 border-b border-[#F1F1F11A]">
          <p className="text-sm text-[#EEEEEE] mb-2">Problems reported by Stripe</p>
          <ul className="space-y-1">
            {status.errors.map((e, i) => (
              <li key={`${e.code ?? "err"}-${i}`} className="text-sm text-[#F87171]">
                {e.reason || e.code || "Verification error"}
                {e.requirement && (
                  <span className="text-[#C9C9C9]">
                    {" "}
                    ({humanizeRequirement(e.requirement)})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* DISABLED REASON (fallback context) */}
      {status.disabledReason && outstanding.length === 0 && status.errors.length === 0 && (
        <div className="py-3 px-5 border-b border-[#F1F1F11A]">
          <p className="text-sm text-[#C9C9C9]">
            Reason: {humanizeRequirement(status.disabledReason)}
          </p>
        </div>
      )}

      {/* RESUME ONBOARDING */}
      {showResume && (
        <div className="py-4 px-5">
          <button
            onClick={onResumeOnboarding}
            disabled={isResuming}
            className="w-full rounded-full bg-[#5FDA78] py-2.5 text-sm font-semibold text-[#0F2417] transition hover:bg-[#54c76c] disabled:opacity-60 cursor-pointer"
          >
            {isResuming ? "Opening Stripe…" : "Continue Stripe verification"}
          </button>
        </div>
      )}
    </div>
  )
}

export default StripeConnectStatusCard
