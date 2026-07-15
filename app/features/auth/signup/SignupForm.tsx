"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"
import { useSignup } from "@/app/features/auth/hooks/useSignup"
import type { SignupPayload } from "@/app/features/auth/types/signup"
import { signupSchema, type SignupFormValues } from "@/app/features/auth/validations/signupSchema"

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    // validation modes: validate on blur, re-validate on change
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      fullName: "",
      partnerName: "",
      eventDate: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { signup, isLoading: isSignupLoading } = useSignup()

  const onSubmit = async (values: SignupFormValues) => {
    setIsSubmitting(true)

    // Send date as YYYY-MM-DD format (e.g., 2026-05-18)
    const payload: SignupPayload = {
      fullName: values.fullName,
      partnerName: values.partnerName,
      eventDate: values.eventDate,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }

    await signup(payload)
    setIsSubmitting(false)
  }

  return (
    <div>
      <form className="flex flex-col gap-4 font-figtree" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your Name"
          type="text"
          id="fullName"
          placeholder="Enter your name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}

        <Input
          label="Partner Name"
          type="text"
          placeholder="Enter your partner name"
          error={errors.partnerName?.message}
          {...register("partnerName")}
        />
        {errors.partnerName && <p className="text-sm text-red-400">{errors.partnerName.message}</p>}

        <Input
          label="Event Date"
          type="date"
          placeholder="Select event date"
          error={errors.eventDate?.message}
          {...register("eventDate")}
        />
        {errors.eventDate && <p className="text-sm text-red-400">{errors.eventDate.message}</p>}

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber.message}</p>}

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          showPassword={showConfirmPassword}
          onTogglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}

        <div className="mt-5 w-full">
          <Button type="submit" className="w-full py-3! md:py-4!" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </div>

        <div className="flex gap-2 text-white justify-center mt-1">
          <p className="text-[#C5C5C5] text-sm">Already have an account?</p>
          <Link href="/login" className="underline text-sm text-white">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
