import SignupForm from "@/app/components/auth/signup/SignupForm"
import SignupLeft from "@/app/components/auth/signup/SignupLeft"
import Image from "next/image"

const page = () => {
  return (
    <div className="bg-[#350366] min-h-screen w-full py-6 md:py-17.5 px-4 sm:px-8 md:px-20  overflow-auto">
      
      {/* form */}
      <div className="flex md:flex-row flex-col w-full h-full z-100 relative">
        <div className="flex-1 pt-10 lg:pt-40">
          <SignupLeft />
        </div>
        <div className="flex-1 mt-12 md:mt-0  md:ps-10 lg:ps-25">
          <SignupForm />
        </div>
      </div>

      {/* left-center-bottom image at natural size */}
     <div className="fixed -top-22.5 right-0 md:top-10 md:left-0 md:right-auto">
            <Image
              src="/images/bg-images/left-rainbow.png"
              alt="Rainbow"
              width={700}
              height={700}
              className="object-contain scale-x-[-1] md:scale-x-100"
            />
          </div>
    </div>
  )
}

export default page