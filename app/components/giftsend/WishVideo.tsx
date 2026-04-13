import Image from "next/image"


const WishVideo = () => {
  return (
   <div className="  flex gap-4 glass-card flex-col pt-8 border border-[#5FDA78] rounded-[20px]"
                   >
   
   
   
                   <div className="relative px-8">
                       <p className="text-white text-start text-[16px] pb-6">
                           Add wishing video for just £ 1.00
                       </p>
   
                       <div className="absolute bottom-0 left-0 w-full h-px 
       bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                   </div>
                   {/*wish video div  */}
                   <div className="flex flex-col    gap-6 items-center px-4 glass-card py-8 border border-[#5FDA78] rounded-[20px]"
                 >

                
                <Image 
  src="/images/video-upload.svg" 
  alt="add-video" 
  width={27} 
  height={27} 
  
/>
                <p className="text-white font-light text-sm">Video must not exceed 25MB</p>
            </div>
   
   
   
               </div>
  )
}

export default WishVideo