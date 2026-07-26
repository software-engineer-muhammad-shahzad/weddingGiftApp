"use client"
import { Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCoupleContributorList } from '@/app/features/dashboard/hooks/useCoupleContributorList';
import type { ContributorItem } from "@/app/features/dashboard/types/coupleContributorList";
import Skeleton from "@/app/components/ui/Skeleton";

const ContributorRowSkeleton = () => (
    <div className='flex justify-between w-full'>
        <div className='flex gap-4 items-center'>
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className='flex flex-col gap-2'>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-32" />
            </div>
        </div>
        <Skeleton className="h-4 w-14 self-center" />
    </div>
)

const ContributorList = () => {
    const router = useRouter();
    const { items, isLoading, fetchContributors } = useCoupleContributorList();

    useEffect(() => {
        fetchContributors(1);
    }, []);

    const handleViewAll = () => {
        router.push("/dashboard/statistic");
    };

    return (
        <div className={`w-full glass-card mt-6 rounded-t-[40px] transition-all duration-300`} style={{ marginTop: "15px !important" }}>
            <div className='flex justify-center w-full'>
                <Minus className='text-white mt-1 text-center text-3xl ' />
            </div>
            {/* Fixed header - no scroll */}
            <div className='font-medium px-6 flex text-white justify-between sticky top-0 bg-transparent z-10'>
                <p className=' text-[14px]'>List of Contributors</p>
                <p 
                    onClick={handleViewAll} 
                    className='text-[12px] cursor-pointer hover:text-[#5FDA78] transition-colors'
                >
                    View All
                </p>
            </div>
            {/* Content area */}
            <div className="flex flex-col gap-5 mt-3 px-6 pb-24">
                {isLoading && items.length === 0 ? (
                    <>
                        <ContributorRowSkeleton />
                        <ContributorRowSkeleton />
                    </>
                ) : items.length === 0 ? (
                    <p className="text-white text-center">No contributors yet</p>
                ) : (
                    <>
                        {items.slice(0, 2).map((contributor: ContributorItem) => (
                            <div key={contributor.id} className='flex justify-between w-full'>
                                <div className='flex  gap-4'>
                                    {/* image */}
                                    <div className='border border-[#5FDA78] w-10 h-10 rounded-full flex justify-center'>
                                        <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                            {contributor.guestProfilePic ? (
                                                <img src={contributor.guestProfilePic} alt={contributor.guestName ?? 'Guest'} className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                contributor.guestName?.charAt(0)
                                            )}
                                        </div>
                                    </div>
                                    {/* username && date */}
                                    <div className='text-white flex flex-col gap-1'>
                                        <p className='font-semibold text-[12px]'>{contributor.guestName}</p>
                                        <p className='font-light text-[11px] '>
                                            {new Date(contributor.resourceMetadata.createdOn).toLocaleDateString("en-GB", 
                                            {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}</p>
                                    </div>
                                </div>
                                {/* price */}
                                <p className='font-medium text-md text-white'>{contributor.defaultCurrencySymbol} {contributor.amount.toFixed(2)}</p>
                            </div>
                        ))}
                    </>
                )}

            </div>

        </div>
    )
}

export default ContributorList