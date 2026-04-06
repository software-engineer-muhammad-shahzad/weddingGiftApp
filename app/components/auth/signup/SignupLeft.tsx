
import Image from "next/image"
const SignupLeft = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div>

        {/* logo */}
        <div className="flex gap-2">
          <div className="w-10 h-10">
            <Image src="/images/shagun-logo.png" alt="shagun-logo" width={100} height={100}/>
            </div>
            <div className="flex flex-col text-white ">
              <h1 className="font-extrabold">Shagun Direct</h1>
              <p className="text-[10px] font-extralight">Skip the Envelope, Send the Love.</p>
            </div>
          

        </div>
        {/* banner text */}
        <div className="mt-6">
          <p className="text-white text-xl ">Secure access to smarter.</p>
          <h1 className="text-6xl font-normal text-white mt-3 leading-tight">Celebrate Love,<br/> Gift Digitally</h1>
        </div>
      </div>
    </div>
  )
}

export default SignupLeft
