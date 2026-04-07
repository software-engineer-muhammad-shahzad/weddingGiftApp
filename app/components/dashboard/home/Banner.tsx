import { MoveRight } from "lucide-react"
import Image from "next/image"

const Banner = () => {
    return (
        <div className="flex gap-1 h-60 justify-between mt-16">
            {/* QR Button */}
            <div className="w-57.5 h-60.25 top-0 relative ">
                <Image
                    src="/images/qr-download-button.png"
                    alt="qr-button"
                    fill
                    className="object-cover"
                />
            </div>
            {/* card */}

            <div className="w-full h-full relative rounded-2xl bg-[#5FDA78]  overflow-hidden">

                <div className="flex flex-col text-[#330065] mt-25 ps-5">
                    <p className="text-[14px] font-normal ">Invite Now</p>
                    <p className="text-[34px] font-normal">Invite<br />
                        Guest</p>
                </div>
                <div className="w-10 h-10 absolute top-4 left-2">
                    <Image src="/images/arrange-square.png" alt="error" width={100} height={100} quality={100} unoptimized />


                </div>



                <Image
                    src="/images/shagunHomeBanner.png"
                    alt="shagunHomeBanner"
                    fill
                    priority
                    unoptimized
                    className="object-contain object-right-top"
                />

                {/* send button */}
                <button
                    className="group border cursor-pointer border-white gap-2 text-white px-4 py-2 flex justify-center items-center rounded-[30px] text-md font-light absolute bottom-5 right-10 backdrop-blur-[25px] transition-all duration-300"
                    style={{
                        background: `
      radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 235, 255, 0) 0%, rgba(230, 255, 240, 0) 70%, rgba(240, 240, 255, 0) 100%),
      linear-gradient(316.97deg, rgba(255, 255, 255, 0.044) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.066) 0%, rgba(0, 0, 0, 0.022) 30%, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))
    `,
                        boxShadow: `
      0px 0px 1.5px 0px #FF264000 inset,
      0px 0px 1.5px 0px #2673FF00 inset,
      0px 0px 8px 0px #D1E5FF00 inset,
      0px 3px 12px -3px #00000026
    `,
                    }}
                >
                    Send
                    <MoveRight className="text-white ml-0 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>

        </div>
    )
}

export default Banner