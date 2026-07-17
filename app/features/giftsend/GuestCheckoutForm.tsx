"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Button from "../../components/elements/Button"
import Input from "../../components/elements/Input"
import { guestCheckoutSchema, type GuestCheckoutFormValues } from "./validations/guestCheckoutSchema"

interface GuestCheckoutFormProps {
  isLoading: boolean
  onSubmit: (values: GuestCheckoutFormValues) => void
}

const GuestCheckoutForm = ({ isLoading, onSubmit }: GuestCheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestCheckoutFormValues>({
    resolver: zodResolver(guestCheckoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { fullName: "", contactNumber: "", email: "" },
  })

  return (
    <form
      className="flex flex-col gap-6 px-4 md:px-8 py-8 glass-card border border-[#5FDA78] rounded-[20px]"
      onSubmit={handleSubmit(onSubmit)}
    >

      <Input
        type="text"
        placeholder="Enter your name"
        label="FullName"
        {...register("fullName")}
      />
      {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}

      <Input
        type="number "
        placeholder="Contact Number"
        label="Enter your contact number"
        {...register("contactNumber")}
      />
      {errors.contactNumber && <p className="text-sm text-red-400">{errors.contactNumber.message}</p>}

      <Input
        type="email "
        placeholder="Enter your email"
        label="Enter your email"
        {...register("email")}
      />
      {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}

      <p className="text-white text-[11px] md:text-md px-2">By continuing, you agree to the Shagun Direct Payments <Link href="/" className="border-b">Terms of Service.</Link> The <Link href="" className="border-b"> Privacy Notice</Link> describes how your data is handled.</p>

      <Button
        type="submit"
        className="bg-[#5FDA78] rounded-2xl py-3! md:py-4"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Next"}
      </Button>

    </form>
  )
}

export default GuestCheckoutForm
