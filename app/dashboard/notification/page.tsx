
import { ChevronLeft } from 'lucide-react';
import { Search } from 'lucide-react';
import Link from 'next/link';
const page = () => {
  return (
    <div className="h-screen   w-full max-w-382.5 flex  justify-center mx-auto ">
<div className="w-full h-full bg-[#330065] max-w-200 py-8 border px-3">
{/* notification header */}
    <Link  href="/dashboard"className="flex w-fit items-center gap-2">
        <ChevronLeft  className='text-white'/>
        <p className="text-white text-2xl">Notification</p>

    </Link>
    {/* search input */}
    <div className='border border-[#5FDA78] rounded-[50px] h-14.5 mt-8 px-5 py-3 flex items-center'
    
    style={{
     
    
       
        background: `
          radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 255, 255, 0.05) 0%, rgba(95, 250, 120, 0.1) 70%, rgba(240, 240, 255, 0.05) 100%),
          linear-gradient(316.97deg, rgba(255, 255, 255, 0.1) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%)
        `,
        boxShadow: `
          0px 1.5px 3.33px rgba(255, 255, 255, 0.1) inset,
          0px 0px 8px rgba(209, 229, 255, 0.2) inset,
          0px 3px 12px -3px rgba(0, 0, 0, 0.15),
          0px 10px 28px -6px rgba(0, 0, 0, 0.25)
        `,
        backdropFilter: 'blur(15px)',
      }}
    >
 <Search className='text-white'/>

 <input type='text' placeholder='Search' className='w-full outline-none  border-none ps-4 font-light text-sm text-white placeholder:text-white'></input>
    </div>
{/* user list */}

<div className='flex justify-between mt-14 border border-[#5FDA78] rounded-[40px] px-4 py-6'   
    style={{
     
    
       
        background: `
          radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 255, 255, 0.05) 0%, rgba(95, 250, 120, 0.1) 70%, rgba(240, 240, 255, 0.05) 100%),
          linear-gradient(316.97deg, rgba(255, 255, 255, 0.1) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%)
        `,
        boxShadow: `
          0px 1.5px 3.33px rgba(255, 255, 255, 0.1) inset,
          0px 0px 8px rgba(209, 229, 255, 0.2) inset,
          0px 3px 12px -3px rgba(0, 0, 0, 0.15),
          0px 10px 28px -6px rgba(0, 0, 0, 0.25)
        `,
        backdropFilter: 'blur(15px)',
      }} >
    {/* name&description */}
    <div className='pt-1'>
<p className='text-white font-semibold text-[16px] '>M. Ali Raza <span className='font-light'>sent £12.50</span></p>
    
    <p className='font-semibold text-white text-[16px]'>Message:<span className='text-white font-light'> Congratulations on the special day! The attachment is included. Click to view</span></p>
    </div>
    {/* circle */}
<div className='bg-white w-3 h-3 rounded-full'></div>


</div>

</div>
    </div>
  )
}

export default page