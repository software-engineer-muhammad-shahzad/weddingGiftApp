"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { showError } from "@/app/lib/toast"
import { dismissAnnouncement } from "@/app/features/dashboard/services/dashboardService"

interface AnnouncementProps {
  latestAnnouncement?: string
  latestAnnouncementId?: number
}

const Announcement = ({ latestAnnouncement, latestAnnouncementId }: AnnouncementProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isDismissing, setIsDismissing] = useState(false)

  const handleDismiss = async () => {
    if (isDismissing) return

    setIsDismissing(true)

    try {
      if (latestAnnouncementId != null) {
        await dismissAnnouncement(latestAnnouncementId)
      }
      setIsVisible(false)
    } catch (err: any) {
      const message =
        err?.response?.data?.data ||
        err?.response?.data?.statusMessage ||
        err?.message ||
        "Failed to dismiss announcement"
      showError(typeof message === "string" ? message : "Failed to dismiss announcement")
    } finally {
      setIsDismissing(false)
    }
  }

  if (!isVisible || !latestAnnouncement?.trim()) return null

  return (
    <div className="glass-card border border-[#5FDA78] text-white rounded-full pl-4 pr-3 py-2.5 mt-4 text-sm font-medium w-full flex items-center justify-between gap-2">
      <span className="truncate">Announcements: {latestAnnouncement}</span>
      <button
        type="button"
        onClick={handleDismiss}
        disabled={isDismissing}
        aria-label="Dismiss announcement"
        className="shrink-0 cursor-pointer text-[#5FDA78] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Announcement
