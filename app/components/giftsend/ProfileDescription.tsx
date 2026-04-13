import Image from "next/image"


const ProfileDescription = () => {
    return (
        <> {/* shagun logo */}
            <div className="flex items-center gap-4 justify-center">
                <div className="w-11 h-14">
                    <Image src="/images/shagun-logo.svg" alt="shagun-logo" width={100} height={100} />
                </div>

                <div className="flex flex-col gap-1  md:gap-2 text-white">
                    <p className="font-semibold text-lg sm:text-xl">Ahmad & Sana</p>
                    <p className="font-normal text-sm">Skip the Envelope, Send the Love.</p>
                </div>
            </div>

            {/* profile image && name */}
            <div className="flex gap-6 glass-card items-center px-4 py-4 border border-[#5FDA78] rounded-[20px]"
                >
<div>
                <div className="border border-[#5FDA78] w-13 h-13 rounded-full"></div>
</div>
                {/* name and date */}
                <div className="flex flex-col">
                    <p className="text-white font-semibold text-xl">Ahmad & Sana</p>
                    <p className="text-white font-normal text-[11px]"><span>Event Date:Monday 10 june</span></p>
                </div>
            </div></>
    )
}

export default ProfileDescription