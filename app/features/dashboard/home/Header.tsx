"use client"

import { Bell, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import type { CoupleDashboardData } from "@/app/features/dashboard/types/coupleDashboard"
import { useCoupleNotification } from "@/app/features/dashboard/hooks/useCoupleNotification"

interface HeaderProps {
    data: CoupleDashboardData | null
    isLoading: boolean
}

const Header = ({ data, isLoading }: HeaderProps) => {
    const { items, fetchNotifications } = useCoupleNotification()

    useEffect(() => {
        fetchNotifications(1)
    }, [])

    const hasUnread = items.some((item) => !item.isRead)

    return (
        <div className="flex justify-between items-center">
            {/* image and name */}
            <div className="flex gap-2 sm:gap-4 items-center  ">
                <div className=" w-12   h-12 border border-[#5FDA78] rounded-full overflow-hidden">
                    <Image
                        src="/profileDelete.png"
                        alt="error"
                        width={84}
                        height={84}
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* name date */}
                <div className="flex flex-col text-white ">
                    <p className="text-sm sm:text-xl ">
                        {isLoading ? "..." : `${data?.fullName} & ${data?.partnerName}`}
                    </p>
                    <p className="text-sm md:text-md font-light text-[#E6E6E6]">
                        {isLoading ? "..." : new Date(data?.eventDate || "").toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                </div>
            </div>
            {/* icons */}
            <div className="flex gap-2">

                <Link href="/dashboard/notification" className="border glass-card  relative w-10 h-10 border-[#5FDA78]  rounded-full flex items-center justify-center p-2">
                    {hasUnread && (
                        <div className="absolute top-1.5 right-1.5 bg-red-500 rounded-full w-2.5 h-2.5" />
                    )}
                    <Bell className="text-white" />
                </Link>
                <Link href="/dashboard/setting" className="border glass-card w-10 h-10 border-[#5FDA78]  rounded-full flex items-center justify-center p-2">
                    <Settings className="text-white" />

                </Link>
            </div>


        </div>
    )
}

export default Header