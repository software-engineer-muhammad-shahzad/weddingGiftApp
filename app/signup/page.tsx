import SignupForm from "@/app/components/auth/signup/SignupForm"
import SignupLeft from "@/app/components/auth/signup/SignupLeft"
import Image from "next/image"

const page = () => {
  return (
    <div className="bg-[#350366] min-h-screen w-full py-15.5 px-20  overflow-auto">
      
      {/* form */}
      <div className="flex w-full h-full">
        <div className="flex-1">
          <SignupLeft />
        </div>
        <div className="flex-1 ps-20">
          <SignupForm />
        </div>
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
  )
}

export default page