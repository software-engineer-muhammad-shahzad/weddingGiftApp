import Link from "next/link"
import Button from "../elements/Button"
import Input from "../elements/Input"


interface selectCardProps {

  openModal: () => void
}

const WishForm = ({ openModal }: selectCardProps) => {
  return (
    <div className="flex flex-col gap-6">

      <Input type="text" placeholder="Enter your name"   label="FullName"
      />
      <Input type="number " placeholder="Enter your name"  label="Card Number" />
      {/* card expiry cvc */}
      <div className="grid grid-cols-2 gap-4 ">

        <Input type="date" placeholder="MM/YY"  label="Card Expiry" />


        <Input type="number" placeholder="Enter your cvc"  label="CVC " />


      </div>
      {/*  */}


      <Input type="text " placeholder="Card Holder Name"  label="Enter your name" />


      <Input type="number " placeholder="Contact Number"  label="Enter your contact number" />
      <Input type="email " placeholder="Enter your email"  label="Enter your email" />
      <p className="text-white text-[11px] md:text-md px-2">By continuing, you agree to the Shagun Direct Payments <Link href="/" className="border-b">Terms of Service.</Link> The <Link href="" className="border-b"> Privacy Notice</Link> describes how your data is handled.</p>
      <Button className="bg-[#5FDA78] rounded-2xl py-3! md:py-4" onClick={() => openModal()}> Next</Button>

    </div>
  )
}

export default WishForm