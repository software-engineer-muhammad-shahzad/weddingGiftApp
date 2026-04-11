import Image from "next/image"


const ProfileDescription = () => {
    return (
        <> {/* shagun logo */}
            <div className="flex items-center gap-4 justify-center">
                <div className="w-14 h-14">
                    <Image src="/images/shagun-logo.png" alt="shagun-logo" width={100} height={100} />
                </div>

                <div className="flex flex-col gap-2 text-white">
                    <p className="font-semibold text-xl">Ahmad & Sana</p>
                    <p className="font-normal text-sm">Event Date: Monday, 10 June</p>
                </div>
            </div>

            {/* profile image && name */}
            <div className="flex gap-6 items-center px-4 py-4 border border-[#5FDA78] rounded-[20px]"
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
                }}>

                <div className="border border-[#5FDA78] w-14 h-14 rounded-full"></div>

                {/* name and date */}
                <div className="flex flex-col">
                    <p className="text-white font-semibold text-2xl">Ahmad & Sana</p>
                    <p className="text-white font-semibold text-2xl"><span>Event Date:Monday 10 june</span></p>
                </div>
            </div></>
    )
}

export default ProfileDescription