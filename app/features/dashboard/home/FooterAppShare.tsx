"use client"
import React from "react"
import { Blocks, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardIcon, DashboardGiftsICon } from "../../../components/icons/Icons"
import type { Invite } from "@/app/features/dashboard/types/coupleDashboard"

interface FooterAppShareProps {
  inviteData?: Invite
  isLoading?: boolean
}

const FooterAppShare = ({ inviteData, isLoading }: FooterAppShareProps) => {
  const pathname = usePathname();

  const navLinks = [
    {
      id: 1,
      href: "/dashboard",
      icon: <DashboardIcon className="w-5 h-5" />,
      alt: "home-footer-icon",
      isActive: pathname === "/dashboard"
    },
    {
      id: 2,
      href: "/dashboard/gifts",
      icon: <DashboardGiftsICon className="w-5 h-5" />,
      alt: "gifts-footer-icon",
      isActive: pathname === "/dashboard/gifts"
    },
    {
      id: 3,
      href: "/dashboard/invite",
      icon: <Blocks className="w-5 h-5" />,
      alt: "app-share-icon",
      isActive: pathname === "/dashboard/invite"
    },
    {
      id: 4,
      href: "/dashboard/statistic",
      icon: <Wallet className="w-5 h-5" />,
      alt: "wallet-icon",
      isActive: pathname === "/dashboard/statistic"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-100 " >
      <div className="flex py-2 gap-2 justify-center w-full    max-w-200 bg-[#3401660d] backdrop-blur-[10px] shadow-[0_10px_25px_0_rgba(0,0,0,0.45)]">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`p-3 w-12 h-12 group md:w-14 md:h-14 hover:text-[#330065]  border border-[#5FDA78] flex items-center justify-center rounded-full transition-colors ${
              link.isActive ? "bg-[#5FDA78]   w-20 md:w-24 h-8 md:h-14 rounded-2xl" : "glass-card hover:bg-[#5FDA78]! hover:text-[#330065]"
            }`}
          >
            <div className={link.isActive ? "text-[#330065]" : "text-white group-hover:text-[#330065]"}>
              {link.isActive ? 
                React.cloneElement(link.icon, { className: "w-6 h-6" }) : 
                link.icon
              }
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FooterAppShare