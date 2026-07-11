import Input from "../../components/elements/Input"

interface WishAmountProps {
  amount: string
  setAmount: (value: string) => void
}

const WishAmount = ({ amount, setAmount }: WishAmountProps) => {
  return (
    <div>

         <div className="flex flex-col    gap-6  px-4 glass-card pt-8 pb-8 md:pb-14 border border-[#5FDA78] rounded-[20px]"
                         >

           {/* amount input */}
                     <div className="relative px-4  ">
                       <p className="text-white text-start text-md pb-2">
                           Enter Amount
                       </p>

                       {/* input */}
                       <div className="relative">
                       <Input  type="text" placeholder="300.50 £ " value={amount} onChange={(e) => setAmount(e.target.value)} containerClassName="border-none" className="text-center   font-semibold text-[50px] py-2  outline-none w-full text-white placeholder:text-white "/>

   {/* <span className="absolute right-58 bottom-5 text-white text-sm "></span> */}
   </div>
                       <div className="absolute bottom-0 left-0 w-full h-px
       bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />
                   </div>
                    </div>

    </div>
  )
}

export default WishAmount
