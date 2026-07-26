"use client"

import { Bell, ChevronLeft, Settings } from "lucide-react"
import Link from "next/link"
import { markAllNotificationsRead } from "@/app/features/dashboard/services/dashboardService"

interface HeaderProps {
  title?: string
  unReadNotificationCount?: number
}

const Header = ({ title = "Greetings", unReadNotificationCount = 0 }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard" className="flex w-fit items-center gap-2">
        <ChevronLeft className="text-white" />
        <p className="text-white text-2xl border-b border-transparent hover:border-white transition-all duration-300">
          {title}
        </p>
      </Link>

      <div className="flex gap-2">
        <Link
          href="/dashboard/notification"
          onClick={() =>
            markAllNotificationsRead().catch((err) =>
              console.error("Failed to mark notifications read:", err)
            )
          }
          className="border glass-card relative w-10 h-10 border-white rounded-full flex items-center justify-center p-2"
        >
          {unReadNotificationCount > 0 && (
            <div className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 flex items-center justify-center bg-red-500 rounded-full text-white text-[10px] font-medium leading-none">
              {unReadNotificationCount > 99 ? "99+" : unReadNotificationCount}
            </div>
          )}
          <Bell className="text-white" />
        </Link>

        <Link
          href="/dashboard/setting"
          className="border glass-card w-10 h-10 border-white rounded-full flex items-center justify-center p-2"
        >
          <Settings className="text-white" />
        </Link>
      </div>
    </div>
  )
}

export default Header
