"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Button from "../../../components/elements/Button"
import Input from "../../../components/elements/Input"
import useResetPassword from "../hooks/useResetPassword"
import {
  setPasswordSchema,
  type SetPasswordFormValues,
} from "../validations/setPasswordSchema"

import { getData } from "@/app/utils/storage/storageHelper"

interface SetPasswordFormProps {
  setIsModalOpen: (value: boolean) => void
  isModalOpen: boolean
  email: string | null
}

const SetPasswordForm = ({ setIsModalOpen }: SetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { handleResetPassword, isLoading } = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })


  const onSubmit = async (values: SetPasswordFormValues) => {
    const email = getData<string>("email", "local")

    if (!email) return

    const success = await handleResetPassword({
      email,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    })

    if (success) {
      setIsModalOpen(true)
    }
  }

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="New Password"
          type="password"
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
          error={errors.password?.message}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}

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
          <Button
            type="submit"
            className="w-full py-3! md:py-4! text-base md:text-[20px]"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SetPasswordForm
