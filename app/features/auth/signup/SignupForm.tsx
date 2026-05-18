"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"
import { signup } from "@/app/features/auth/types/signup"
import { signupSchema, type SignupFormValues } from "@/app/features/auth/validations/signupSchema"

const SignupForm = () => {
  const router = useRouter()
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      name: "",
      partnerName: "",
      eventDate: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: SignupFormValues) => {
    setApiError(null)
    setIsSubmitting(true)

    try {
      await signup({
        name: values.name,
        partnerName: values.partnerName,
        eventDate: values.eventDate,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
      })

      router.push("/verify-otp")
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Signup failed. Please try again."
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form className="flex flex-col gap-4 font-figtree" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your Name"
          type="text"
          id="name"
          placeholder="Enter your name"
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}

        <Input
          label="Partner Name"
          type="text"
          placeholder="Enter your partner name"
          {...register("partnerName")}
        />
        {errors.partnerName && <p className="text-sm text-red-400">{errors.partnerName.message}</p>}

        <Input
          label="Event Date"
          type="text"
          placeholder="00-00-00"
          {...register("eventDate")}
        />
        {errors.eventDate && <p className="text-sm text-red-400">{errors.eventDate.message}</p>}

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber.message}</p>}

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}

        {apiError && <p className="text-sm text-red-400">{apiError}</p>}

        <div className="mt-5 w-full">
          <Button type="submit" className="py-3! md:py-4!" disabled={isSubmitting}>
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
