import Image from "next/image"
import PaymentMakerDetail from "./PaymentMakerDetail"

const PaymentSucessfull = () => {
  return (
    <div >

          <div className="flex  gap-4  ">
                        <div className="w-14 h-14">
                            <Image src="/images/shagun-logo.png" alt="shagun-logo" width={100} height={100} />
                        </div>
        
                        <div className="flex flex-col gap-2 text-white">
                            <p className="font-semibold text-xl">Shagun Direct</p>
                            <p className="font-normal text-sm">Skip the Envelope, Send the Love.</p>
                        </div>
                    </div>
                    {/* payment successfull logo */}

                    <div className="flex  justify-center py-8">
                        <Image src="/images/paymentSuccessful.png" alt="" width={100} height={100}/>
                    </div>
                    {/* payment successfull */}
                    <div className="flex flex-col gap-2  items-center mb-8">
                        <p className="text-white font-semibold text-[26px]">Payment Successful!</p>
                        <p className="text-[#5FDA78] font-medium text-sm">2 Feb, 2026 | 10:30 PM | Trx ID: 019282011</p>
                    </div>
                    {/*  amount*/}
                    
         <div className="flex flex-col    gap-6  px-4  py-8 border border-[#5FDA78] rounded-[20px]"

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
                }}
                         >
        
           {/* amount input */}
                     <div className="relative px-8">
                      

                       {/* input */}
                       <input  type="text" placeholder="300.50" className="text-center  py-2 border-none  outline-none w-full text-white placeholder:text-white "/>
   
                       <div className="absolute bottom-0 left-0 w-full h-px 
       bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                   </div>      

                   <div className="flex justify-between">
                    <p className="text-white text-[18px]">Fee</p>
                    <p  className="text-white text-[18px]">1.00</p>
                     </div>       
                    </div>
                    {/* payment maker details */}
                     <PaymentMakerDetail/>
    </div>
  )
}

export default PaymentSucessfull