import Image from "next/image"
import { formatDateWithWeekday } from "@/app/utils/formatDate"
import Skeleton from "@/app/components/ui/Skeleton"
import { GuestInviteData } from "./types"

interface ProfileDescriptionProps {
    data: GuestInviteData | null
    isLoading: boolean
}

const ProfileDescription = ({ data, isLoading }: ProfileDescriptionProps) => {
    const coupleName = data ? `${data.fullName} & ${data.partnerName}` : "Ahmad & Sana"

    const eventDate = data?.eventDate ? formatDateWithWeekday(data.eventDate) : "Event date not set"

    return (
        <> {/* shagun logo */}
            <div className="flex items-center gap-4 justify-center">
                <div className="w-11 h-14">
                    <Image src="/images/shagun-logo.svg" alt="shagun-logo" width={100} height={100} />
                </div>

                <div className="flex flex-col gap-1  md:gap-2 text-white">
                    {isLoading ? (
                        <Skeleton className="h-5 w-40" />
                    ) : (
                        <p className="font-semibold text-lg sm:text-xl">{coupleName}</p>
                    )}
                    <p className="font-normal text-sm">Skip the Envelope, Send the Love.</p>
                </div>
            </div>

            {/* profile image && name */}
            <div className="flex gap-6 glass-card items-center px-4 py-4 border border-[#5FDA78] rounded-[20px]"
                >
                <div>
                    {isLoading ? (
                        <Skeleton className="w-13 h-13 rounded-full" />
                    ) : data?.profileImageUrl ? (
                        <Image
                            src={data.profileImageUrl}
                            alt={coupleName}
                            width={52}
                            height={52}
                            className="w-13 h-13 rounded-full object-cover border border-[#5FDA78]"
                        />
                    ) : (
                        <div className="border border-[#5FDA78] w-13 h-13 rounded-full"></div>
                    )}
                </div>
                {/* name and date */}
                <div className="flex flex-col gap-2">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-5 w-36" />
                            <Skeleton className="h-3 w-28" />
                        </>
                    ) : (
                        <>
                            <p className="text-white font-semibold text-xl">{coupleName}</p>
                            <p className="text-white font-normal text-[11px]"><span>Event Date: {eventDate}</span></p>
                        </>
                    )}
                </div>
            </div></>
    )
}

export default ProfileDescription