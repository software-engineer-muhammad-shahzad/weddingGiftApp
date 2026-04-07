"use client"
import Input from '@/app/components/elements/Input'
import Button from '@/app/components/elements/Button'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupForm = () => {
      const router = useRouter();

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
   
    router.push("/verify-otp");
  };

    return (
        <div  >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
                label="Your Name"
                type="text"
                id="name"
                placeholder="Enter your name"
                name="name"
            />
            
            <Input
                label="Patner Name"
                type="text"
                placeholder="Enter your partner name"
                name="partnerName"
            />
            
            <Input
                label="Event Date"
                type="text"
                placeholder="00-00-00"
                name="eventDate"
            />
            
            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                name="email"
            />
            
            <Input
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                name="phoneNumber"
            />
            
            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                name="password"
            />
            
            <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
            />
           
            <div className="mt-5 w-full ">
                <Button type="submit" className=''>
                    Sign Up
                </Button>
            </div>
            <div className='flex gap-2 text-white justify-center'>            <p>Already have an account?</p>
            <Link href={"/login"} className='border-white border-b'>
            Sign In
            </Link>
             
             </div>

             </form>
        </div>
    )
}

export default SignupForm
