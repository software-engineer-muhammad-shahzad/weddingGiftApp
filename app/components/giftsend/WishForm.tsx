import Link from "next/link"
import Button from "../elements/Button"
import Input from "../elements/Input"
import Dropdown from "../elements/Dropdown"
import { CircleAlert } from "lucide-react"


interface selectCardProps {

  openModal: () => void
}

const WishForm = ({ openModal }: selectCardProps) => {
  return (
    <div className="flex flex-col gap-6">

      <Input type="text" placeholder="Enter your name" label="FullName"
      />
      <div className="relative ">
        <Input type="number " placeholder="Enter your name" label="Card Number" />
        <CircleAlert className="absolute right-4 cursor-pointer bottom-6 text-white" />
      </div>
      {/* card expiry cvc */}
      <div className="grid grid-cols-2 gap-4 ">

        <Input type="text" placeholder="MM/YY" label="Card Expiry" />

        <div className="relative ">
          <Input type="text" placeholder="Enter your cvc" label="CVC " />
          <CircleAlert className="absolute right-4 cursor-pointer bottom-6 text-white" />
        </div>



      </div>
      {/*there call   */}
      <Dropdown
        options={["uk", "usa", "australia", "switzerland", "canada"]}
        placeholder="Select an option"
        label="Country / Region"
        // className="glass-card border border-[#5FDA78] rounded-[100px] ps-5 py-5"
        dropdownClassName=" bg-[#330065] border border-[#5FDA78]"
        triggerClassName=" border-0 px-0! py-0!"
        containerClassName="border border-[#5FDA78] glass-card rounded-[100px] px-6 py-2"

      />

      <Input type="text " placeholder="Card Holder Name" label="Enter your name" />

      {/* there call then */}
      <Input type="number " placeholder="Contact Number" label="Enter your contact number" />
      <Input type="email " placeholder="Enter your email" label="Enter your email" />




      <p className="text-white text-[11px] md:text-md px-2">By continuing, you agree to the Shagun Direct Payments <Link href="/" className="border-b">Terms of Service.</Link> The <Link href="" className="border-b"> Privacy Notice</Link> describes how your data is handled.</p>
      <Button className="bg-[#5FDA78] rounded-2xl py-3! md:py-4" onClick={() => openModal()}> Next</Button>

    </div>
  )
}

export default WishForm