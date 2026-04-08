import Header from '@/app/components/dashboard/gifts/Header'
import Tabs from '@/app/components/dashboard/gifts/Tabs'
import { Bell, ChevronLeft, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


const page = () => {
  return (
     <div className="flex justify-center bg-[#330065] min-h-screen overflow-auto w-full mx-auto pt-10 px-10 max-w-382.5">
<div className="max-w-150 w-full "> 


<Header/>
<Tabs/>


    </div>
    
    
    
    
    </div>
  )
}

export default page