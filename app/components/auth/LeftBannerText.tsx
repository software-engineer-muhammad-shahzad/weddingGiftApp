import Image from "next/image"


const LeftBannerText = () => {
  return (
     <div className="flex gap-2">
          <div className="w-10 h-10">
            <Image src="/images/shagun-logo.png" alt="shagun-logo" width={100} height={100}/>
            </div>
            <div className="flex flex-col text-white ">
              <h1 className="font-extrabold">Shagun Direct</h1>
              <p className="text-[10px] font-extralight">Skip the Envelope, Send the Love.</p>
            </div>
          

        </div>
  )
}

export default LeftBannerText