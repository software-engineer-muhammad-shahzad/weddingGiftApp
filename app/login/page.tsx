"use client";
import { useState } from "react";
import Image from "next/image"
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import LeftBannerText from "../components/auth/LeftBannerText";



export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#350366] text-white">
      <div className="w-full  p-20">

        <div className=" bg-[#350366] p-8 flex flex-col md:flex-row gap-8">

          {/* Left */}
          <div className="flex-1 flex flex-col justify-center">

            <LeftBannerText />

          </div>

          {/* Right */}
          <form className="flex-1 space-y-4">


            <Input label="Email"
              type="email"
              placeholder="Enter your email"
              name="email" />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              name="password"
            />


            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm text-gray-200">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" />
                Remember me
              </label>

              <span className="hover:text-white cursor-pointer">
                Forgot password?
              </span>
            </div>


            <div className="mt-5 w-full">
              <Button type="submit">
                Sign Up
              </Button>
            </div>

            <p className="text-sm text-center text-gray-200 ">
              Don’t have an account?{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </form>



        </div>
      </div>
      {/* left-center-bottom image at natural size */}
      <div
        className="fixed left-0 top-10"

      >
        <Image
          src="/images/bg-images/left-rainbow.png"
          alt="Left Rainbow"
          width={600}   // replace with your image's real width
          height={600}  // replace with your image's real height
          className="object-contain"
        />
      </div>
    </div>
  );
}