import Link from "next/link"
import Button from "../elements/Button"
import Input from "../elements/Input"


interface selectCardProps{

    openModal:()=>void
}

const WishForm = ({openModal}:selectCardProps) => {
  return (
    <div className="flex flex-col gap-6">

        <Input type="text" placeholder="Enter your name" className="text-white outline-none " label="FullName"/>
<Input type="number " placeholder="Enter your name" className="text-white outline-none " label="Card Number"/>
{/* card expiry cvc */}
<div className="flex gap-4 border">

    <Input type="date" placeholder="MM/YY" className="text-white outline-none flex-1 w-full" label="Card Expiry"/>
    
    
<Input type="number" placeholder="Enter your cvc" className="text-white outline-none w-full " label="CVC "/>
    
    
</div>
{/*  */}


<Input type="text " placeholder="Card Holder Name" className="text-white outline-none " label="Enter your name"/>


<Input type="number " placeholder="Contact Number" className="text-white outline-none " label="Enter your contact number"/>
<Input type="email " placeholder="Enter your email" className="text-white outline-none " label="Enter your email"/>
<p className="text-white text-sm px-2">By continuing, you agree to the Shagun Direct Payments <Link href="/">Terms of Service.</Link> The Privacy Notice describes how your data is handled.</p>
<Button className="bg-[#5FDA78] rounded-2xl py-4" onClick={() => openModal()}> Next</Button>

    </div>
  )
}

export default WishForm