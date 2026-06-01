import { ChevronLeft } from "lucide-react"
import Link from "next/link"

type Props = {
  isFormOpen: boolean
  setIsFormOpen: (value: boolean) => void
}

const ProfileInfoNavigation = ({
  isFormOpen,
  setIsFormOpen,
}: Props) => {
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
        <Link
          href="/dashboard/setting"
          className="flex w-fit items-center gap-2"
        >
          <ChevronLeft className="text-white" />

          <p className="text-white text-xl md:text-2xl border-b border-transparent hover:border-white transition-all duration-300">
            My Profile
          </p>
        </Link>
      )}
    </>
  )
}

export default ProfileInfoNavigation