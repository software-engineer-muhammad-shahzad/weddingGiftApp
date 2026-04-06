import Input from '@/app/components/elements/Input'
import Button from '@/app/components/elements/Button'

const SignupForm = () => {
    return (
        <div className="flex flex-col gap-4">
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
            
            <div className="mt-5 w-full">
                <Button type="submit">
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default SignupForm
