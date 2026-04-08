import { Minus } from 'lucide-react';
import Image from 'next/image';
const ContributorList = () => {
    return (
        <div className="  w-full mt-6   overflow-hidden  "
         style={{
 
     
        borderRadius: '1rem',
        
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
            <div className='flex justify-center w-full'>
                <Minus className='text-white mt-1 text-center text-3xl ' />
            </div>
            {/* view all */}
            <div className='font-medium px-6 flex text-white justify-between'>
                <p className=' text-[14px]'>List of Contributors</p>
                <p className='text-[12px]'>View All</p>

            </div>
            {/* user list */}
            <div className='flex flex-col gap-5  mt-3 max-h-50 h-full px-6'>
                <div className='flex justify-between w-full'>
                <div className='flex  gap-4'>
                    {/* image */}
                    <div className='border border-[#5FDA78] w-10 h-10 rounded-full flex justify-center'>
                        <Image src="" alt="error" width={10} height={10}/>
                    </div>
                    {/* username && date */}
                    <div className='text-white flex flex-col gap-1'>
                        <p className='font-semibold text-[12px]'>M.Ali Raza</p>
                        <p className='font-light text-[11px] '>Monday, 10 June</p>
                    </div>
                </div>
                {/* price */}
                <p className='font-medium text-md text-white'>10,00000</p>
                </div>
                <div className='flex justify-between w-full'>
                <div className='flex  gap-4'>
                    {/* image */}
                    <div className='border border-[#5FDA78] w-10 h-10 rounded-full flex justify-center'>
                        <Image src="" alt="error" width={10} height={10}/>
                    </div>
                    {/* username && date */}
                    <div className='text-white flex flex-col gap-1'>
                        <p className='font-semibold text-[12px]'>M.Ali Raza</p>
                        <p className='font-light text-[11px] '>Monday, 10 June</p>
                    </div>
                </div>
                {/* price */}
                <p className='font-medium text-md text-white'>10,00000</p>
                </div>

            </div>


        </div>
    )
}

export default ContributorList