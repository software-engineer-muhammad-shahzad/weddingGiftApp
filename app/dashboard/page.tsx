"use client"
import Image from "next/image"
import Balance from "../components/dashboard/home/Balance"
import Banner from "../components/dashboard/home/Banner"
import ContributorList from "../components/dashboard/home/ContributorList"
import FooterAppShare from "../components/dashboard/home/FooterAppShare"
import Header from "../components/dashboard/home/Header"
import StatisticChart from "../components/dashboard/home/StatisticChart"
import { useState } from "react"
import Support from "./support/Support"

const page = () => {
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  return (
    <div className="flex  justify-center  bg-[#330065] min-h-screen overflow-y-auto w-full mx-auto py-10 md:px-10 md:max-w-382.5">
      <div className=" relative w-full max-w-200 h-full ">
        <div className="px-4 md:px-0 h-full">
          <Header />
          <Balance />
          <Banner />
          <StatisticChart />
        </div>
        <ContributorList />
        <FooterAppShare />
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