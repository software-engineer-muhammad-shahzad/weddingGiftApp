import Image from "next/image"
import LeftBannerText from "../components/auth/LeftBannerText"
import VerifyOtpForm from "../components/auth/otp/VerifyOtpForm"

const page = () => {
  return (
    <div className="bg-[#350366] min-h-screen w-full py-15.5 px-20  ">
      <div className=" flex justify-between pt-30"> 
      {/* leftbannertext */}
      <div className="p-2">
      <LeftBannerText/>
      </div>
      
{/* verify otp=form */}
<div className="">
  <VerifyOtpForm/>
</div>


      {/* left-center-bottom image at natural size */}
      <div
        className="fixed left-0 top-10"
        
      >
        <Image
          src="/images/bg-images/left-rainbow.png"
          alt="Left Rainbow"
          width={600}   // replace with your image's real width
          height={600}  // replace with your image's real height
          className="object-contain"
        />
      </div>
      </div>
    </div>
  )
}

export default page