"use client"
import AllTab from '@/app/components/dashboard/gifts/AllTab'
import Header from '@/app/components/dashboard/gifts/Header'
import InputSearch from '@/app/components/dashboard/gifts/InputSearch'
import Tabs from '@/app/components/dashboard/gifts/Tabs'
import FooterAppShare from '@/app/components/dashboard/home/FooterAppShare'
import { greetingCards, greetingvideoCards, receivedGiftData } from '@/app/components/data'

import { useState } from 'react'


const page = () => {
    const [activeTab, setActiveTab] = useState("all")
    return (
        <div className="flex justify-center bg-[#330065] min-h-screen overflow-auto w-full mx-auto pt-10 px-10 max-w-382.5">
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