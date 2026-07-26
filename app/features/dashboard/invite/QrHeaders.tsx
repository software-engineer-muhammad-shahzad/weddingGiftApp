"use client"

import { Bell, ChevronLeft, Settings } from "lucide-react"
import Link from "next/link"
import { markAllNotificationsRead } from "@/app/features/dashboard/services/dashboardService"

interface QrHeadersProps {
  unReadNotificationCount?: number
}

const QrHeaders = ({ unReadNotificationCount = 0 }: QrHeadersProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard" className="flex items-center gap-2">
        <ChevronLeft className="text-white" />
        <p className="text-white text-2xl">QR Code</p>
      </Link>

      <div className="flex gap-2">
        <Link
          href="/dashboard/notification"
          onClick={() =>
            markAllNotificationsRead().catch((err) =>
              console.error("Failed to mark notifications read:", err)
            )
          }
          className="glass-card relative w-10 h-10 rounded-full flex items-center justify-center"
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
          className="glass-card w-10 h-10 rounded-full flex items-center justify-center"
        >
          <Settings className="text-white" />
        </Link>
      </div>
    </div>
  )
}

export default QrHeaders
