import { MoveRight } from "lucide-react"
import Image from "next/image"

const Banner = () => {
    return (
        <div className="flex justify-between items-stretch gap-2 mt-10 md:mt-16">

            {/* LEFT IMAGE */}
            <div className="flex-shrink-0 flex items-stretch">
                <div className="h-full">
                    <Image
                        src="/images/qr-download-button.png"
                        alt="qr-button"
                        width={120}
                        height={150}
                        className="h-full w-auto object-contain"
                    />
                </div>
            </div>

            {/* RIGHT BANNER */}
            <div className="flex-1 relative max-w-[240px] sm:max-w-[280px] md:max-w-[315px] aspect-[305/198] bg-[url('/images/shagun-logo-banner.svg')] bg-contain bg-center bg-no-repeat">

                <div className="absolute bottom-4 left-4">
                    <p className="text-sm text-[#330065] font-normal ">Invite Now</p>
                    <p className="text-sm  text-[#330065]  font-normal">Invite<br />
                        Guest</p>
                </div>
                {/* share image */}
              <div className="w-10 h-10 absolute top-4 left-2 relative">
  <Image
    src="/images/arrange-square.png"
    alt="share"
    fill
    className="object-contain"
    quality={100}
  />
</div>


                <button
                    className="group absolute right-3 sm:right-5 border cursor-pointer border-white gap-1 text-white px-2 py-1 flex justify-center items-center rounded-[30px] text-sm font-light bottom-5  backdrop-blur-[25px] transition-all duration-300"
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