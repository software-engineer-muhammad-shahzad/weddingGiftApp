"use client"

import { Bell, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { CoupleDashboardData } from "@/app/features/dashboard/types/coupleDashboard"
import type { LoginData } from "@/app/features/auth/types/login"
import { markAllNotificationsRead } from "@/app/features/dashboard/services/dashboardService"
import Skeleton from "@/app/components/ui/Skeleton"
import { buildContentImageUrl } from "@/app/utils/imageUrl"
import { getData } from "@/app/utils/storage/storageHelper"

interface HeaderProps {
    data: CoupleDashboardData | null
    isLoading: boolean
}

const Header = ({ data, isLoading }: HeaderProps) => {
    const unreadCount = data?.unReadNotificationCount ?? 0
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
    const firstLetter = data?.fullName?.trim().charAt(0).toUpperCase() || "?"

    useEffect(() => {
        if (data?.profileImageUrl) {
            setProfileImageUrl(data?.profileImageUrl)
            return;
        }

        setProfileImageUrl(getData<LoginData>("authData", "local")?.profileImageUrl ?? null);
    }, [data?.profileImageUrl])

    return (
        <div className="flex justify-between items-center">
            {/* image and name */}
            <div className="flex gap-2 sm:gap-4 items-center  ">
                <div className=" w-12   h-12 border border-[#5FDA78] rounded-full overflow-hidden">
                    {profileImageUrl ? (
                        <Image
                            src={profileImageUrl}
                            alt="profile"
                            width={84}
                            height={84}
                            className="w-full h-full object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#5FDA7833] text-white font-medium">
                            {firstLetter}
                        </div>
                    )}
                </div>
                {/* name date */}
                <div className="flex flex-col text-white gap-2">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </>
                    ) : (
                        <>
                            <p className="text-sm sm:text-xl ">
                                {`${data?.fullName} & ${data?.partnerName}`}
                            </p>
                            <p className="text-sm md:text-md font-light text-[#E6E6E6]">
                                {new Date(data?.eventDate || "").toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                        </>
                    )}
                </div>
            </div>
            {/* icons */}
            <div className="flex gap-2">

                <Link
                    href="/dashboard/notification"
                    onClick={() => markAllNotificationsRead().catch((err) => console.error("Failed to mark notifications read:", err))}
                    className="border glass-card  relative w-10 h-10 border-[#5FDA78]  rounded-full flex items-center justify-center p-2"
                >
                    {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-medium leading-none">
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </div>
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
