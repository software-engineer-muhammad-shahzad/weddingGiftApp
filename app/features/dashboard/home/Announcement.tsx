"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { getData, saveData } from "@/app/utils/storage/storageHelper"

const DUMMY_ANNOUNCEMENT = "New features on the way — stay tuned!"
const ANNOUNCEMENT_DISMISSED_KEY = "dashboard-announcement-dismissed"

interface AnnouncementProps {
  latestAnnouncement?: string
}

const Announcement = ({ latestAnnouncement }: AnnouncementProps) => {
  const announcementText = latestAnnouncement || DUMMY_ANNOUNCEMENT
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed = getData<boolean>(ANNOUNCEMENT_DISMISSED_KEY, "session") === true
    setIsVisible(!isDismissed)
  }, [])

  const handleDismiss = () => {
    saveData(ANNOUNCEMENT_DISMISSED_KEY, true, "session")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="glass-card border border-[#5FDA78] text-white rounded-full pl-4 pr-3 py-2.5 mt-4 text-sm font-medium w-full flex items-center justify-between gap-2">
      <span className="truncate">Announcements: {announcementText}</span>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="shrink-0 cursor-pointer text-[#5FDA78] hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Announcement
