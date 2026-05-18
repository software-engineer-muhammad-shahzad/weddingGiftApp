"use client"
import { useState } from "react"
import ModalLayer from "@/app/components/ui/ModalLayer"
import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"

interface SupportProps {
  isOpen: boolean
  onClose: () => void
}

const Support = ({ isOpen, onClose }: SupportProps) => {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Support request:", { subject, message })
    // Reset form
    setSubject("")
    setMessage("")
    onClose()
  }

  return (
    isOpen && (
      <ModalLayer
        onClose={onClose}
        modalWidth="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px]"
        modalHeight="400px"
        position="responsive"
        className="bg-clip-padding"
        overlayColor="bg-[#171515EB]"
      >
        <div className="bg-[#5FDA78] w-full rounded-t-md md:rounded-md h-full p-6 md:p-8 overflow-y-auto"
             style={{
               scrollbarWidth: 'none', /* Firefox */
               msOverflowStyle: 'none', /* Internet Explorer 10+ */
             }}
          >
          <h2 className="text-[#330065] text-center text-2xl font-bold mb-4">Support</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Input */}
            <Input
              type="text"
              placeholder="Enter "
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#60DA78] border-none outline-none text-white placeholder:text-white"
              containerClassName="bg-[#60DA78] border-[1.2px] border-[#330065] rounded-[47px]"
              labelColor="text-[#330065]!"
            />
            
            {/* Message Textarea */}
            <div className="space-y-2 border-[1.5px] border-[#330065] rounded-[47px] px-8 py-4">
              <label className="text-[#330065] text-sm">Message</label>
              <textarea
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full py-2 bg-transparent border border-[#5FDA78] rounded-[20px] text-white placeholder:text-white resize-none focus:outline-none focus:border-[#5FDA78]"
                required
                rows={2}
              />
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#330065]! text-[#5FDA78]! rounded-[47px] py-3! transition-colors"
            >
              Submit
            </Button>
          </form>
        </div>
      </ModalLayer>
    )
  )
}

export default Support