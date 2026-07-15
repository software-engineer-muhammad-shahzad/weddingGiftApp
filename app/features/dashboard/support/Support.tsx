"use client"

import ModalLayer from "@/app/components/ui/ModalLayer"
import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"
import { useSupportTicket } from "../hooks/useSubmitSupportTicket"
import { useForm } from "react-hook-form"
import { CoupleSupportTicketPayload } from "../types/submitSupportTicket"
import { X } from "lucide-react";

interface SupportProps {
  isOpen: boolean
  onClose: () => void
}

const Support = ({ isOpen, onClose }: SupportProps) => {
  const { submitTicket, loading, error } = useSupportTicket()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CoupleSupportTicketPayload>()

  const onSubmit = async (data: CoupleSupportTicketPayload) => {
    const response = await submitTicket(data)

    if (response) {
      reset()
      onClose()
    }
  }

  return (
    isOpen && (
      <ModalLayer
        onClose={onClose}
        modalWidth="w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px]"
        modalHeight="400px"
        position="center"
        className="bg-clip-padding"
        overlayColor="bg-[#171515EB]"
      >
        <div className="relative bg-[#5FDA78] scrollbar-hide w-full rounded-t-md md:rounded-md h-full p-6 md:p-8 overflow-y-auto">
          <Button
            type="button"
            onClick={onClose}
            className="absolute top-4 transition duration-200 group right-4  bg-transparent hover:bg-[#330065] shadow-none p-1 text-[#330065]"
          >
            <X className="w-6 h-6 group-hover:text-white" />
          </Button>
          <h2 className="text-[#330065] text-center text-2xl font-bold mb-4">
            Support
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Subject */}
            <Input
              type="text"
              placeholder="Enter Subject"
              label="Subject"
              {...register("subject", {
                required: "Subject is required"
              })}
              className="w-full bg-[#60DA78] border-none outline-none text-white placeholder:text-white"
              containerClassName="bg-[#60DA78] border-[1.2px] border-[#330065] rounded-[47px]"
              labelColor="text-[#330065]!"
            />

            {errors.subject && (
              <p className="text-red-600 text-sm">
                {errors.subject.message}
              </p>
            )}

            {/* Message */}
            <div className="space-y-2 border-[1.5px] border-[#330065] rounded-[47px] px-8 py-4">

              <label className="text-[#330065] text-sm">
                Message
              </label>

              <textarea
                placeholder="Describe your issue..."
                {...register("message", {
                  required: "Message is required"
                })}
                className="w-full py-2 bg-transparent border border-[#5FDA78] rounded-[20px] text-white placeholder:text-white resize-none focus:outline-none focus:border-[#5FDA78]"
                rows={2}
              />
            </div>

            {errors.message && (
              <p className="text-red-600 text-sm">
                {errors.message.message}
              </p>
            )}

            {/* API Error */}
            {error && (
              <p className="text-red-600 text-sm text-center">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#330065]! text-[#5FDA78]! rounded-[47px] py-3!"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>

          </form>
        </div>
      </ModalLayer>
    )
  )
}

export default Support