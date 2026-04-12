"use client"
import { Minus } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { contributorsListData } from '../../data';

const ContributorList = () => {
    const [showAll, setShowAll] = useState(false);
    const contributorListRef = useRef<HTMLDivElement>(null);

    const handleViewAllToggle = () => {
        setShowAll(!showAll);
        // Scroll slightly downward when expanding to show user it opened
        if (!showAll) {
            setTimeout(() => {
                const element = contributorListRef.current;
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const targetScroll = window.scrollY + rect.top + 100;
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    const handleScrollToBottom = () => {
        contributorListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    return (
        <div className={`w-full glass-card mt-6 rounded-t-[40px] transition-all duration-300`}
        >
            <div className='flex justify-center w-full'>
                <Minus className='text-white mt-1 text-center text-3xl ' />
            </div>
            {/* Fixed header - no scroll */}
            <div className='font-medium px-6 flex text-white justify-between sticky top-0 bg-transparent z-10'>
                <p className=' text-[14px]'>List of Contributors</p>
                <p 
                    onClick={handleViewAllToggle} 
                    className='text-[12px] cursor-pointer hover:text-[#5FDA78] transition-colors'
                >
                    {showAll ? 'Show Less' : 'View All'}
                </p>
            </div>
            {/* Content area */}
            <div ref={contributorListRef} className={`flex flex-col gap-5 mt-3 px-6`}>
                {/* Show first 2 contributors when not expanded */}
                {!showAll && (
                    <>
                        {contributorsListData.slice(0, 2).map((contributor) => (
                            <div key={contributor.id} className='flex justify-between w-full'>
                                <div className='flex  gap-4'>
                                    {/* image */}
                                    <div className='border border-[#5FDA78] w-10 h-10 rounded-full flex justify-center'>
                                        <Image src={contributor.avatar} alt={contributor.name} width={10} height={10}/>
                                    </div>
                                    {/* username && date */}
                                    <div className='text-white flex flex-col gap-1'>
                                        <p className='font-semibold text-[12px]'>{contributor.name}</p>
                                        <p className='font-light text-[11px] '>{contributor.date}</p>
                                    </div>
                                </div>
                                {/* price */}
                                <p className='font-medium text-md text-white'>{contributor.amount}</p>
                            </div>
                        ))}
                    </>
                )}
                
                {/* Show all contributors when expanded */}
                {showAll && (
                    <>
                        {contributorsListData.map((contributor) => (
                            <div key={contributor.id} className='flex justify-between w-full'>
                                <div className='flex  gap-4'>
                                    {/* image */}
                                    <div className='border border-[#5FDA78] w-10 h-10 rounded-full flex justify-center'>
                                        <Image src={contributor.avatar} alt={contributor.name} width={10} height={10}/>
                                    </div>
                                    {/* username && date */}
                                    <div className='text-white flex flex-col gap-1'>
                                        <p className='font-semibold text-[12px]'>{contributor.name}</p>
                                        <p className='font-light text-[11px] '>{contributor.date}</p>
                                    </div>
                                </div>
                                {/* price */}
                                <p className='font-medium text-md text-white'>{contributor.amount}</p>
                            </div>
                        ))}
                    </>
                )}

            </div>

        </div>
    )
}

export default ContributorList