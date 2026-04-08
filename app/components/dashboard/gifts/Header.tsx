import { Bell, ChevronLeft, Settings } from "lucide-react"
import Link from "next/link"

const Header = () => {
  return (
    <>
{/* header greetings */}
 <div className="flex justify-between">
           {/* Greetings header */}
    <Link  href="/dashboard"className="flex w-fit items-center gap-2">
        <ChevronLeft  className='text-white'/>
        <p className="text-white text-2xl">Greetings</p>

    </Link>
                {/* icons */}
                <div className="flex gap-2">

                    <Link href="/dashboard/notification" className="border  relative w-10 h-10 border-white  rounded-full flex items-center justify-center p-2">
<div className="absolute -top-2.5 -right-1 bg-red-500 p-2 rounded-full flex justify-center text-white text-center items-center w-5 h-5">1</div>
                       <Bell className="text-white"/>
                    </Link>
                    <Link  href="/dashboard/setting" className="border w-10 h-10 border-white  rounded-full flex items-center justify-center p-2">
                          <Settings className="text-white" />

                    </Link>
                </div>
            

        </div>

    </>
  )
}

export default Header