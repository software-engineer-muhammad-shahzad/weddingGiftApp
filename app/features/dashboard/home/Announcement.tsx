"use client"

import { useState } from "react"
import { X } from "lucide-react"

const DUMMY_ANNOUNCEMENT = "New features on the way — stay tuned!"

interface AnnouncementProps {
  latestAnnouncement?: string
}

const Announcement = ({ latestAnnouncement }: AnnouncementProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="glass-card border border-[#5FDA78] text-white rounded-full pl-4 pr-3 py-2.5 mt-4 text-sm font-medium w-full flex items-center justify-between gap-2">
      <span className="truncate">Announcements: {latestAnnouncement || DUMMY_ANNOUNCEMENT}</span>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss announcement"
        className="shrink-0 cursor-pointer text-[#5FDA78] hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Announcement
