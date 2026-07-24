"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Announcement from "@/app/features/dashboard/home/Announcement"
import Balance from "@/app/features/dashboard/home/Balance"
import Banner from "@/app/features/dashboard/home/Banner"
import ContributorList from "@/app/features/dashboard/home/ContributorList"
import FooterAppShare from "@/app/features/dashboard/home/FooterAppShare"
import Header from "@/app/features/dashboard/home/Header"
import StatisticChart from "@/app/features/dashboard/home/StatisticChart"
import { useDashboard } from "@/app/features/dashboard/hooks/useDashboard"
import Support from "@/app/features/dashboard/support/Support"
import ModalLayer from "@/app/components/ui/ModalLayer"

const page = () => {
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const { data, isLoading, error } = useDashboard()

  const showBankAccountModal = !isLoading && data?.hasBankAccount === false

  return (
    <div className="w-full max-w-400 bg-[#330065] min-h-dvh mx-auto pt-10 md:px-10">
      <div className="relative w-full max-w-200 mx-auto">
        <div className="px-4 md:px-0">
          <Header data={data} isLoading={isLoading} />
          <Balance data={data} isLoading={isLoading} />
          <Announcement latestAnnouncement={data?.latestAnnouncement} />
          <Banner
            inviteData={data?.invite}
            coupleName={data ? `${data.fullName} & ${data.partnerName}`.toUpperCase() : undefined}
            eventDate={data?.eventDate}
          />
          <StatisticChart data={data?.weeklyStats} isLoading={isLoading} />
        </div>
        <ContributorList />
        <FooterAppShare inviteData={data?.invite} isLoading={isLoading} />
      </div>
      <div className="fixed inset-x-0 bottom-20 md:bottom-18 z-110 flex justify-center pointer-events-none">
        <div className="relative w-full max-w-200">
          <div className="absolute right-6 cursor-pointer pointer-events-auto" onClick={() => setIsSupportOpen(true)}>
            <Image src="/images/support-icon.svg" alt="" width={46} height={46} />
          </div>
        </div>
      </div>
      {/* support modal */}
      <Support isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      {showBankAccountModal && (
        <ModalLayer
          modalHeight="auto"
          modalWidth="w-[90%] max-w-[360px]"
          overlayColor="bg-[#171515EB]"
          position="center"
          className="rounded-2xl border border-[#5FDA78]"
        >
          <div className="bg-[#330065] rounded-2xl p-6 flex flex-col gap-4">
            <p className="text-white font-semibold text-xl text-center">
              Bank Account Required
            </p>
            <p className="text-white/80 text-sm text-center">
              Please add bank account details first.
            </p>
            <Link
              href="/dashboard/setting/bank-info"
              className="mt-2 w-full bg-[#5FDA78] text-[#330065] text-center py-3 rounded-full font-semibold hover:bg-[#4ecb68] transition-colors"
            >
              Add Bank Details
            </Link>
          </div>
        </ModalLayer>
      )}
    </div>
  )
}

export default page
