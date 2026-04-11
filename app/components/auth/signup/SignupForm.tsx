"use client"
import Input from '@/app/components/elements/Input'
import Button from '@/app/components/elements/Button'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupForm = () => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push("/verify-otp");
    };

    return (
        <div>
            <form className="flex flex-col gap-4 font-figtree" onSubmit={handleSubmit}>
                <Input
                    label="Your Name"
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    specialGradient={true}
                />



                <Input
                    label="Partner Name"
                    type="text"
                    placeholder="Enter your partner name"
                    name="partnerName"
                    specialGradient={true}
                />

                <Input
                    label="Event Date"
                    type="text"
                    placeholder="00-00-00"
                    name="eventDate"
                    specialGradient={true}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    specialGradient={true}
                />

                <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    specialGradient={true} />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    specialGradient={true} />

                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    specialGradient={true} />

                <div className="mt-5  w-full ">
                    <Button type="submit" className='py-3! md:py-4!'>
                        Sign Up
                    </Button>
                </div>
                <div className='flex gap-2 text-white justify-center  mt-1'>
                    <p className='text-[#C5C5C5] text-sm'>Already have an account?</p>
                    <Link href={"/login"} className='underline text-sm text-white'>
                        Sign In
                    </Link>

                </div>

            </form>
        </div>
    )
}

export default SignupForm
