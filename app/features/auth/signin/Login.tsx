"use client"

import { useState } from "react"
import Image from "next/image"
import LeftBannerText from "@/app/features/auth/LeftBannerText"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Input from "@/app/components/elements/Input"
import Button from "@/app/components/elements/Button"
import Checkbox from "@/app/components/elements/Checkbox"
import { useLogin } from "@/app/features/auth/hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { handleLogin, isLoading, error } = useLogin()

  const handleLoginResponse = async () => {
    if (!email || !password) {
      return
    }

    const result = await handleLogin({ email, password })

    if (result.success) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#350366] text-white">
      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="bg-[#350366] px-1 py-18   sm:p-6 lg:p-8 flex flex-col sm:flex-row  sm:gap-6 lg:gap-8 rounded-lg">

          {/* Left */}
          <div className="flex-1 flex flex-col justify-center">
            <LeftBannerText />
          </div>

          {/* Right */}
          <form className="flex-1 space-y-5 sm:space-y-6 mt-14">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              onTogglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-200 ">
              <Checkbox label="Remember me" />

              <Link href="/forgot-password" className="hover:text-white cursor-pointer border-b border-transparent transition-all duration-300 hover:border-white">
                Forgot password?
              </Link>
            </div>

            <div className="mt-10 w-full z-50">
              <Button 
                type="button" 
                className="h-12 w-full z-50" 
                onClick={handleLoginResponse}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            {error && (
              <div className="mt-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <p className="text-sm text-center  text-[#C5C5C5] mt-6">
              Don’t have an account?
              <Link href="/signup" className=" ps-1 cursor-pointer border-b border-transparent transition-all duration-300 hover:border-white">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="fixed -top-22.5 right-0 md:top-10 md:left-0 md:right-auto">
        <Image
          src="/images/bg-images/left-rainbow.png"
          alt="Rainbow"
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
