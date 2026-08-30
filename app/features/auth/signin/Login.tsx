"use client"

import { useState } from "react"
import Image from "next/image"
import LeftBannerText from "@/app/features/auth/LeftBannerText"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"
import Checkbox from "@/app/components/elements/Checkbox"
import { useLogin } from "@/app/features/auth/hooks/useLogin"
import { useResendOtp } from "@/app/features/auth/hooks/useResendOtp"
import { saveData } from "@/app/utils/storage/storageHelper"
import { loginSchema, type LoginFormValues } from "@/app/features/auth/validations/loginSchema"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { handleLogin, isLoading } = useLogin()
  const { resendOtp, isLoading: isSendingOtp } = useResendOtp()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    const result = await handleLogin(values)

    if (result.success) {
      router.push("/dashboard")
      return
    }

    // Account exists but the email was never verified — send a fresh OTP and
    // drop the user straight into the signup OTP screen.
    if (result.needsVerification) {
      saveData("email", values.email, "local")
      await resendOtp()
      router.push("/verify-otp")
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#350366] text-white">
      <div className="relative z-10 w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className=" px-1 py-18   sm:p-6 lg:p-8 flex flex-col sm:flex-row  sm:gap-6 lg:gap-8 rounded-lg">

          {/* Left */}
          <div className="flex-1 flex flex-col justify-center">
            <LeftBannerText />
          </div>

          {/* Right */}
          <form className="flex-1 space-y-5 sm:space-y-6 mt-14" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                showPassword={showPassword}
                onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
                error={errors.password?.message}
                {...register("password")}
              />
              {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-200 ">
              <Checkbox label="Remember me" />

              <Link href="/forgot-password" className="hover:text-white cursor-pointer border-b border-transparent transition-all duration-300 hover:border-white">
                Forgot password?
              </Link>
            </div>

            <div className="mt-10 w-full z-50">
              <Button
                type="submit"
                className="h-12 w-full z-50"
                disabled={isLoading || isSendingOtp}
              >
                {isLoading || isSendingOtp ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <p className="text-sm text-center  text-[#C5C5C5] mt-6">
              Don’t have an account?
              <Link href="/signup" className=" underline ps-1 cursor-pointer border-b border-transparent transition-all duration-300 hover:border-white">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <span className="font-figtree text-white text-[17px] font-bold leading-5">Powered by :</span>
        <Image src="/images/stripe-step.png" alt="Stripe" width={50} height={20} className="object-contain" />
      </div>
      <div className="pointer-events-none fixed -top-22.5 right-0 z-0 md:top-10 md:left-0 md:right-auto" aria-hidden>
        <Image
          src="/images/bg-images/left-rainbow.png"
          alt=""
          width={700}
          height={700}
          loading="eager"
          style={{ width: 'auto', height: 'auto' }}
          className="object-contain scale-x-[-1] md:scale-x-100"
        />
      </div>
    </div>
  )
}

export default Login
