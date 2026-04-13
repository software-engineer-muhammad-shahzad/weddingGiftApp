import Image from "next/image"
import PaymentMakerDetail from "./PaymentMakerDetail"

const PaymentSucessfull = () => {
  

  return (
    <div >

      <div className="flex  gap-4  ">
        <div className="w-14 h-14">
          <Image src="/images/shagun-logo.svg" alt="shagun-logo" width={100} height={100} />
        </div>

        <div className="flex flex-col gap-2 text-white">
          <p className="font-semibold text-xl">Shagun Direct</p>
          <p className="font-normal text-sm">Skip the Envelope, Send the Love.</p>
        </div>
      </div>
      {/* payment successfull logo */}

      <div className="flex  justify-center py-8">
        <Image src="/images/paymentSuccessful.png" alt="" width={100} height={100} />
      </div>
      {/* payment successfull */}
      <div className="flex flex-col gap-2  items-center mb-8">
        <p className="text-white font-semibold text-[26px]">Payment Successful!</p>
        <p className="text-[#5FDA78] font-medium text-sm">2 Feb, 2026 | 10:30 PM | Trx ID: 019282011</p>
      </div>
      {/*  amount*/}

      <div className="flex flex-col  glass-card  gap-6  px-4  py-4 border border-[#5FDA78] rounded-[20px]"


      >

        {/* amount input */}
        <div className="relative px-8">


          {/* input */}
          <input type="text" placeholder="300.50 £" className="text-center  py-2 border-none  outline-none w-full text-white placeholder:text-white " />

          <div className="absolute bottom-0 left-0 w-full h-px 
       bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
        </div>

        <div className="flex justify-between">
          <p className="text-white text-[18px]">Fee</p>
          <p className="text-white text-[18px]">1.00</p>
        </div>
      </div>
      {/* payment maker details */}
      <PaymentMakerDetail />
    </div>
  )
}

export default PaymentSucessfull