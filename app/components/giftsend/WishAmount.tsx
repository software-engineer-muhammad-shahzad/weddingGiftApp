import Image from "next/image"


const WishAmount = () => {
  return (
    <div>

         <div className="flex flex-col    gap-6  px-4 bg-[#330065] py-8 border border-[#5FDA78] rounded-[20px]"
                         >
        
           {/* amount input */}
                     <div className="relative px-8">
                       <p className="text-white text-start text-lg pb-6">
                           Enter Amount
                       </p>

                       {/* input */}
                       <input  type="text" placeholder="300.50" className="text-center  py-2 border-none  outline-none w-full text-white placeholder:text-white "/>
   
                       <div className="absolute bottom-0 left-0 w-full h-px 
       bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                   </div>             
                    </div>
                 
    </div>
  )
}

export default WishAmount