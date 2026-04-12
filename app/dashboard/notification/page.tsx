"use client"
import { ChevronLeft } from 'lucide-react';
import { Search } from 'lucide-react';
import Link from 'next/link';

import { notificationData } from '../../components/data';
import { useState } from 'react';
import Input from '@/app/components/elements/Input';


const page = () => {
  const [search, setSearch] = useState("");

  // Filter notifications based on search input (name only)
  const filteredNotifications = notificationData.filter(notification =>
    notification.name.toLowerCase().includes(search.toLowerCase())
  );

  
  return (
    <div className="min-h-screen   w-full max-w-382.5 flex  justify-center mx-auto  ">
      <div className="w-full min-h-screen bg-[#330065] md:max-w-200 py-8 px-4 md:px-3 ">
        {/* notification header */}
        <Link href="/dashboard" className="flex w-fit items-center gap-2 ">
          <ChevronLeft className='text-white' />
        
          <p className="text-white text-2xl border-b border-transparent hover:border-white transition-all duration-300">Notification</p>
        </Link>
        {/* search input */}
        <div className='border-[0.5px] glass-card border-[#5FDA78] rounded-[30px] h-14.5 mt-12 px-5 py-3 flex items-center'>
          <Search className='text-white' />
          <Input 
            type='text' 
            placeholder='Search' 
            paddingClass='px-3!' 
            containerClassName="border-none w-full p-0" 
            className='w-full outline-none  border-none!  font-light text-sm  text-white placeholder:text-white'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></Input>
        </div>
        {/* user list */}
        <div className='flex flex-col gap-8 mt-8    '>
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className='w-full p-4 flex justify-between rounded-[40px] glass-card border-[0.5px] border-[#5FDA78] pb-4'>
              <div className='flex items-start gap-4'>
                
                <div className='flex-1'>
                  <p className='text-white font-semibold text-[16px] '>{notification.name} <span className='font-light'>{notification.amount}</span></p>
                  <p className='font-semibold text-white text-[16px]'>Message:<span className='text-white font-light'> {notification.message}</span></p>
                  <div className='flex items-center gap-2 mt-2'>
                   
                    <p className='text-white/80 text-xs'>{notification.time}</p>
                  </div>
                </div>
              </div>
              {/* cricle white */}
              <div>
             <div className='w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full'></div>
             </div>
            </div>
        
          ))}
        </div>
      </div>
    </div>
  )
}

export default page