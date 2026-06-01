import { Bell, ChevronLeft, Settings } from "lucide-react"
import Link from "next/link"

const QrHeaders = () => {
  return (
      <div className="flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <ChevronLeft className="text-white" />
                        <p className="text-white text-2xl">QR Code</p>
                    </Link>

                    <div className="flex gap-2">
                        <Link href="/dashboard/notification" className="glass-card w-10 h-10 rounded-full flex items-center justify-center">
                            <Bell className="text-white" />
                        </Link>

                        <Link href="/dashboard/setting" className="glass-card w-10 h-10 rounded-full flex items-center justify-center">
                            <Settings className="text-white" />
                        </Link>
                    </div>
                </div>
  )
}

export default QrHeaders