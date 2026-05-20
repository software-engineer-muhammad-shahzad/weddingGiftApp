"use client"
import Image from "next/image"
import { useState } from "react"
import Support from "./support/Support"
import Balance from "@/app/features/dashboard/home/Balance"
import Banner from "@/app/features/dashboard/home/Banner"
import ContributorList from "@/app/features/dashboard/home/ContributorList"
import FooterAppShare from "@/app/features/dashboard/home/FooterAppShare"
import Header from "@/app/features/dashboard/home/Header"
import StatisticChart from "@/app/features/dashboard/home/StatisticChart"
import { useDashboard } from "@/app/features/dashboard/hooks/useDashboard"

const page = () => {
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const { data, isLoading, error } = useDashboard()

  return (
    <div className="flex  justify-center  bg-[#330065] min-h-screen overflow-y-auto w-full mx-auto py-10 md:px-10 md:max-w-382.5">
      <div className=" relative w-full max-w-200 h-full ">
        <div className="px-4 md:px-0 h-full">
          <Header data={data} isLoading={isLoading} />
          <Balance data={data} isLoading={isLoading} />
          <Banner inviteData={data?.invite} />
          <StatisticChart data={data?.weeklyStats} isLoading={isLoading} />
        </div>
        <ContributorList />
        <FooterAppShare inviteData={data?.invite} isLoading={isLoading} />
        <div className="absolute right-10 bottom-6 cursor-pointer" onClick={()=>setIsSupportOpen(true)}>
          <Image src="/images/support-icon.svg" alt="" width={46} height={46} />
        </div>
      </div>
      {/* support modal */}
      <Support isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
    </div>
  )
}

export default page