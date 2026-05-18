"use client"
import AllTab from '@/app/features/dashboard/gifts/AllTab'
import Header from '@/app/features/dashboard/gifts/Header'
import InputSearch from '@/app/features/dashboard/gifts/InputSearch'
import Tabs from '@/app/features/dashboard/gifts/Tabs'
import FooterAppShare from '@/app/features/dashboard/home/FooterAppShare'
import { greetingCards, greetingvideoCards, receivedGiftData } from '@/app/components/data'

import { useState } from 'react'


const page = () => {
    const [activeTab, setActiveTab] = useState("all")
    return (
        <div className="flex justify-center bg-[#330065] min-h-screen overflow-auto w-full mx-auto pt-10 px-5 md:px-10 max-w-382.5">
            <div className="max-w-150 w-full ">


                <Header />
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <InputSearch />
                <div className='mt-8'>

                    <AllTab receivedGiftData={activeTab==="all" ? receivedGiftData : activeTab==="greeting"? greetingCards:activeTab==="video"?greetingvideoCards: []} />
                    <FooterAppShare />
                </div>


            </div>




        </div>
    )
}

export default page