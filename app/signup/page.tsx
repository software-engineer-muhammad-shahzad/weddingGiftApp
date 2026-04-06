import SignupForm from "@/app/components/auth/signup/SignupForm"
import SignupLeft from "@/app/components/auth/signup/SignupLeft"
const page = () => {
    return (
        <div className="bg-[#350366] min-h-screen overflow-auto w-full max-w-382.5 mx-auto py-15.5 px-25">
            <div className="flex w-full h-full">
            
                <div className=" flex-1 ">
                    <SignupLeft />
                </div>
                <div className="  flex-1">
                    
                    <SignupForm />
                </div>

            
            </div>
        </div>
    )
}

export default page
