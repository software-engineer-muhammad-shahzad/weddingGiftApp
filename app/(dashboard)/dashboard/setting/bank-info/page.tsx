"use client"

import { ChevronLeft, Pencil } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useCoupleBankDetails } from "@/app/features/dashboard/hooks/useCoupleBankDetails"
import UpdateBankInfo from "@/app/features/dashboard/bankinformation/UpdateBankInfo"
import Skeleton from "@/app/components/ui/Skeleton"
import { UpdateBankDetailsData } from "@/app/features/dashboard/types/UpdateBankDetails"


const Page = () => {
  const { data, isLoading, error, refetch } = useCoupleBankDetails()
  const [isEditMode, setIsEditMode] = useState(false)

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center mx-auto bg-[#330065]">
        <div className="w-full max-w-200 py-8 px-5">
          <Link href="/dashboard/setting" className="flex items-center gap-2">
            <ChevronLeft className="text-white" />
            <p className="text-white text-2xl">Bank Information</p>
          </Link>

          <div className="border border-[#5FDA78] rounded-[30px] mt-10 glass-card">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 py-3 px-5 ${i < 4 ? "border-b border-[#F1F1F11A]" : ""}`}
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
      <div className="h-screen w-full flex justify-center mx-auto bg-[#330065]">
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
    <div className="h-screen w-full flex justify-center mx-auto bg-[#330065]">
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

            <div className="flex flex-col py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Address</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.address || "N/A"}
              </p>
            </div>

            <div className="flex flex-col py-3 px-5">
              <p className="text-sm text-[#EEEEEE]">Currency</p>
              <p className="font-medium text-[#EEEEEE]">
                {data?.currency || "N/A"}
              </p>
            </div>

          </div>
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