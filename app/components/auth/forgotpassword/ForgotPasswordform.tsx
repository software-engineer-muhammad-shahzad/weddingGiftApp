"use client"
import { useRouter } from "next/navigation"
import Button from "../../elements/Button"
import Input from "../../elements/Input"


const ForgotPasswordform = () => {
    const router=useRouter()
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
router.push("set-password");

    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
     <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
            />
   <div className="mt-5 w-full">
                <Button type="submit" >
                    Sign Up
                </Button>
            </div>
        </form>
    )
}

export default ForgotPasswordform