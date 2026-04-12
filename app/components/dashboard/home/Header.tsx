import { Bell, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const Header = () => {
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
                    <p className="text-md sm:text-xl ">Ahmed & Sana</p>
                    <p className="text-sm md:text-md font-light text-[#E6E6E6]">02,Nov 2026</p>
                </div>
            </div>
            {/* icons */}
            <div className="flex gap-2">

                <Link href="/dashboard/notification" className="border glass-card  relative w-10 h-10 border-[#5FDA78]  rounded-full flex items-center justify-center p-2">
                    <div className="absolute -top-2.5 -right-1 bg-red-500 p-2 rounded-full flex justify-center text-white text-center items-center w-5 h-5">1</div>
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