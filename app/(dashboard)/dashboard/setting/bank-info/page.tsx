"use client"

import { ChevronLeft, Pencil } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { getStripeOnboardingLink } from "@/app/features/dashboard/services/dashboardService"
import { useCoupleBankDetails } from "@/app/features/dashboard/hooks/useCoupleBankDetails"
import { useStripeConnectStatus } from "@/app/features/dashboard/hooks/useStripeConnectStatus"
import UpdateBankInfo from "@/app/features/dashboard/bankinformation/UpdateBankInfo"
import StripeConnectStatusCard from "@/app/features/dashboard/bankinformation/StripeConnectStatusCard"
import Skeleton from "@/app/components/ui/Skeleton"
import { UpdateBankDetailsData } from "@/app/features/dashboard/types/UpdateBankDetails"

const toDateInputValue = (value?: string | null) => {
  if (!value) return ""
  const trimmed = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10)

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return ""

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, "0")
  const day = String(parsed.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getTodayDateInputValue = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const dobDateInputClassName =
  "mt-1 w-full max-w-xs rounded-lg bg-transparent border-0 px-0 py-1 font-medium text-white [color-scheme:dark] cursor-default [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert"

const Page = () => {
  const { data, isLoading, error, refetch } = useCoupleBankDetails()
  const {
    data: connectStatus,
    isLoading: isStatusLoading,
    refetch: refetchStatus,
  } = useStripeConnectStatus()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isResumingOnboarding, setIsResumingOnboarding] = useState(false)

  // Mint a fresh single-use Stripe account link and send the couple into onboarding.
  const resumeOnboarding = async () => {
    setIsResumingOnboarding(true)
    try {
      const url = await getStripeOnboardingLink()
      if (url) {
        window.location.href = url
        return
      }
    } catch {
      // fall through to clear the loading state
    }
    setIsResumingOnboarding(false)
  }

  // Stripe bounces the couple back to ?stripe=refresh when the account link was
  // already used or has expired (they are single-use and short-lived). Mint a new
  // link and send them straight back in, otherwise onboarding dead-ends here and
  // the connected account stays "restricted". ?stripe=return means they finished
  // (or dismissed) the flow, so re-pull the details and account status.
  useEffect(() => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    const stage = params.get("stripe")
    if (!stage) return

    // Drop the marker so a manual reload doesn't retrigger this.
    window.history.replaceState(null, "", window.location.pathname)

    if (stage === "return") {
      refetch()
      refetchStatus()
      return
    }

    if (stage === "refresh") {
      // Link expired/consumed before completion — bounce straight into a fresh one.
      getStripeOnboardingLink()
        .then((url) => {
          if (url) window.location.href = url
        })
        .catch(() => {})
    }
  }, [refetch, refetchStatus])

  if (isLoading || isResumingOnboarding) {
    return (
      <div className="min-h-screen w-full flex justify-center mx-auto bg-[#330065]">
        <div className="w-full max-w-200 py-8 px-5">
          <Link href="/dashboard/setting" className="flex items-center gap-2">
            <ChevronLeft className="text-white" />
            <p className="text-white text-2xl">Bank Information</p>
          </Link>

          <div className="border border-[#5FDA78] rounded-[30px] mt-10 glass-card">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i, index, rows) => (
              <div
                key={i}
                className={`flex flex-col gap-2 py-3 px-5 ${index < rows.length - 1 ? "border-b border-[#F1F1F11A]" : ""}`}
              >
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex justify-center mx-auto bg-[#330065]">
        <div className="w-full max-w-200 py-8 px-5">
          <Link href="/dashboard/setting" className="flex items-center gap-2">
            <ChevronLeft className="text-white" />
            <p className="text-white text-2xl">Bank Information</p>
          </Link>

          <p className="text-red-400 mt-8">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex justify-center mx-auto bg-[#330065]">
      <div className="w-full max-w-200 py-8 px-5">

        {/* BACK NAV */}
        <Link href="/dashboard/setting" className="flex items-center gap-2">
          <ChevronLeft className="text-white" />
          <p className="text-white text-2xl">Bank Information</p>
        </Link>

        {/* EDIT ICON */}
        {!isEditMode && (
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setIsEditMode(true)}
              className="text-white hover:text-[#5FDA78] cursor-pointer transition"
            >
              <Pencil />
            </button>
          </div>
        )}

        {/* VIEW MODE */}
        {!isEditMode ? (
          <>
          <div className="border border-[#5FDA78] rounded-[30px] mt-10 glass-card">

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Account Holder Name</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.accountHolderName || "N/A"}
              </p>
            </div>            

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Account Number</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.accountNumber || "N/A"}
              </p>
            </div>

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">IBAN</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.iban || "N/A"}
              </p>
            </div>

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Address</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.address || "N/A"}
              </p>
            </div>

            {/* Commented out: city, postcode and phone number fields.
            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">City</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.city || "N/A"}
              </p>
            </div>

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Postcode</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.postalCode || "N/A"}
              </p>
            </div>

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Phone Number</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.phoneNumber || "N/A"}
              </p>
            </div>
            */}

            <div className="flex flex-col border-b border-[#F1F1F11A] py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">DOB</p>
              <input
                type="date"
                value={toDateInputValue(data?.dob)}
                max={getTodayDateInputValue()}
                readOnly
                className={dobDateInputClassName}
              />
            </div>

            <div className="flex flex-col py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Currency</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.currency || "N/A"}
              </p>
            </div>

          </div>

          {/* STRIPE CONNECTED ACCOUNT STATUS */}
          {connectStatus && (
            <StripeConnectStatusCard
              status={connectStatus}
              isLoading={isStatusLoading}
              onResumeOnboarding={resumeOnboarding}
              isResuming={isResumingOnboarding}
            />
          )}
          </>
        ) : (
          /* EDIT MODE */
          <UpdateBankInfo
            data={data as unknown as UpdateBankDetailsData | undefined}
            onCancel={() => setIsEditMode(false)}
            onSuccess={() => {
              setIsEditMode(false)
              refetch()   // ✅ IMPORTANT
            }}
          />
        )}

      </div>
    </div>
  )
}

export default Page