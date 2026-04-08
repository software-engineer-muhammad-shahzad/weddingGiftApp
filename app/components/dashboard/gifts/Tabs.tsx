"use client"
import { useState } from "react"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("all")

  // ✅ Glass style for inactive tabs
  const glassStyle = {
    background: `
      radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 235, 255, 0) 0%, rgba(230, 255, 240, 0) 70%, rgba(240, 240, 255, 0) 100%),
      linear-gradient(316.97deg, rgba(255, 255, 255, 0.044) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.066) 0%, rgba(0, 0, 0, 0.022) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))
    `,
    boxShadow: `
      0px 0px 1.33px 0px #FF264000 inset,
      0px 0px 1.33px 0px #2673FF00 inset,
      0px 1.33px 2.95px 0px #FFFFFF19 inset,
      0px 0px 7.08px 0px #D1E5FF00 inset,
      0px 2.65px 10.62px -2.65px #00000026,
      0px 8.85px 24.77px -5.31px #00000040,
      0px 0px 39.81px 0px #FFFFFF05
    `,
    backdropFilter: "blur(22px)",
  }

  // ✅ Helper for styles
  const getTabStyle = (tab: string) =>
    activeTab === tab ? {} : glassStyle

  // ✅ Helper for classes
  const getTabClass = (tab: string) =>
    `w-40 flex justify-center items-center border border-[#5FDA78] rounded-[30px] font-medium transition-all duration-300 ${
      activeTab === tab
        ? "bg-[#5FDA78] text-[#330065]"
        : "text-[#919191] hover:bg-[#5FDA78] hover:text-[#330065]"
    }`

  return (
    <div className="flex justify-between px-6 h-12 mt-16 gap-3">

      {/* All */}
      <button
        onClick={() => setActiveTab("all")}
        style={getTabStyle("all")}
        className={getTabClass("all")}
      >
        All
      </button>

      {/* Greeting */}
      <button
        onClick={() => setActiveTab("greeting")}
        style={getTabStyle("greeting")}
        className={getTabClass("greeting")}
      >
        Greeting cards
      </button>

      {/* Video */}
      <button
        onClick={() => setActiveTab("video")}
        style={getTabStyle("video")}
        className={getTabClass("video")}
      >
        Video
      </button>
      <p className="text-[#919191]!"> 
hello
</p>

    </div>
  )
}

export default Tabs