import { Bell, Settings } from "lucide-react"
import Image from "next/image"


const Header = () => {
    return (
        <div className="flex justify-between">
            {/* image and name */}
            <div className="flex gap-4 items-center  ">
                <div className="w-12 h-12 border border-[#5FDA78] rounded-full overflow-hidden">
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
                    <p className="text-xl ">Name</p>
                    <p className="text-lg font-light">02,Nov 2026</p>
                </div>
                </div>
                {/* icons */}
                <div className="flex gap-2">

                    <div className="border  relative w-10 h-10 border-white  rounded-full flex items-center justify-center p-2">
<div className="absolute -top-2.5 -right-1 bg-red-500 p-2 rounded-full flex justify-center text-white text-center items-center w-5 h-5">1</div>
                       <Bell className="text-white"/>
                    </div>
                    <div className="border w-10 h-10 border-white  rounded-full flex items-center justify-center p-2">
                          <Settings className="text-white" />

                    </div>
                </div>
            

        </div>
    )
}

export default Header