"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Button from "../../../components/elements/Button"
import Input from "../../../components/elements/Input"
import { useForgotPassword } from "../hooks/useForgotPassword"
import { saveData } from "@/app/utils/storage/storageHelper"

const ForgotPasswordform = () => {
    const router = useRouter()
    const source = "forgot-password"
    const [email, setEmail] = useState("")
    const { handleForgotPassword, isLoading } = useForgotPassword()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            return
        }

        saveData<string>("email", email, "local");

        const result = await handleForgotPassword({ email })
        if (result.success) {
            // ✅ SAVE EMAIL IN LOCAL STORAGE
            
            router.push(`/verify-otp?source=${source}`)
        }
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-5 w-full">
                <Button
                    type="submit"
                    className='w-full py-2! md:py-4!'
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Next"}
                </Button>
            </div>           
        </form>
    )
}

export default ForgotPasswordform