"use client"

import { ChevronLeft } from "lucide-react"
import { useGoBack } from "@/app/hooks/useGoBack"

type Props = {
  isFormOpen: boolean
  setIsFormOpen: (value: boolean) => void
}

const ProfileInfoNavigation = ({
  isFormOpen,
  setIsFormOpen,
}: Props) => {
  const goBack = useGoBack("/dashboard/setting")

  return (
    <>
      {isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(false)}
          className="text-white cursor-pointer flex w-fit items-center gap-2"
        >
          <ChevronLeft className="text-white" />

          <span className="text-white flex w-fit items-center gap-2 text-xl md:text-2xl border-b border-transparent hover:border-white transition-all duration-300">
            My Profile
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={goBack}
          className="flex w-fit items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="text-white" />

          <p className="text-white text-xl md:text-2xl border-b border-transparent hover:border-white transition-all duration-300">
            My Profile
          </p>
        </button>
      )}
    </>
  )
}

export default ProfileInfoNavigation