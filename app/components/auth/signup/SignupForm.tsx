const SignupForm = () => {
    return (
        <div className="flex flex-col gap-4">
            <div
            className="border border-[#5FDA78] rounded-[147px]"

            
 style={{
  background: `radial-gradient(ellipse at center, 
                rgb(48,19,79) 70%,        /* main dark center */
                rgba(48,19,79,0.8) 80%,   /* fade starts */
                rgba(48,19,79,0.4) 90%,   /* softer transition */
                rgba(255,255,255,0.1) 100%), /* light edges */
              linear-gradient(0deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))`
}}>





                <div className="py-3 px-5 flex flex-col">
                <label htmlFor="name" className="text-white text-[14px]">Your Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="border-none outline-none text-[#989898] text-sm bg-transparent"
                />
                </div>
            </div>
            {/* patner name */}
            <div className="flex flex-col border border-[#5FDA78] rounded-[147px] py-3 px-5 ">

                <label typeof="name " className="text-white text-[14px]">Patner Name</label>
                <input type="text" placeholder="Enter your name" name="name" className="border-none outline-none text-[#989898] text-sm" />
            </div>
            {/* Event Date */}
            <div className="flex flex-col border border-[#5FDA78] rounded-[147px] py-3 px-5 ">

                <label typeof="date " className="text-white text-[14px]">Event Date</label>
                <input type="number" placeholder="00-00-00" name="date" className="border-none outline-none text-[#989898] text-sm" />
            </div>
            {/* Email */}
            <div className="flex flex-col border border-[#5FDA78] rounded-[147px] py-3 px-5 ">

                <label typeof="email " className="text-white text-[14px]">Email</label>
                <input type="email" placeholder="Enter your email" name="name" className="border-none outline-none text-[#989898] text-sm" />
            </div>
            {/* Phone Number */}
            <div className="flex flex-col border border-[#5FDA78] rounded-[147px] py-3 px-5 ">

                <label typeof="email " className="text-white text-[14px]">Phone Number</label>
                <input type="email" placeholder="Enter your phone number" name="name" className="border-none outline-none text-[#989898] text-sm" />
            </div>
            {/* Password */}
            <div className="flex flex-col border border-[#5FDA78] rounded-[147px] py-3 px-5 ">

                <label typeof="password " className="text-white text-[14px]">Phone Number</label>
                <input type="email" placeholder="Enter your phone number" name="name" className="border-none outline-none text-[#989898] text-sm" />
            </div>
            {/* Confirm Password */}
            <div className="flex flex-col border border-[#5FDA78] rounded-[147px] py-3 px-5 ">

                <label typeof="password " className="text-white text-[14px]">Confirm Password</label>
                <input type="email" placeholder="Confirm Password" name="name" className="border-none outline-none text-[#989898] text-sm" />
            </div>

        </div>
    )
}

export default SignupForm
