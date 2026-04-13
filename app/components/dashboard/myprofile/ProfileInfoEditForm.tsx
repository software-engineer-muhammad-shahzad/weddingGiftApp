
import Link from "next/link"
import Button from "../../elements/Button"
import Input from "../../elements/Input"



const ProfileInfoEditForm = () => {
  
  return (
     <div className="mt-20">
            <form className="flex flex-col gap-4" >
            <Input
                label=" Name"
                type="text"
                id="name"
                placeholder="Sana Khan"
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
                type="date"
                placeholder="00-00-00"
                name="23 Feb, 2026"
                 
            />
            
            <Input
                label="Email"
                type="email"
                placeholder="xyz@xyz.com"
                name="email"
                 
            />
          <Input
                label="Contact Number"
                type="email"
                placeholder="+1-333-9888228"
                name="email"
                 
            />
      
            
         
           
            <div className="mt-5 w-full ">
                <Button type="submit" className='py-3!'>
                    Update
                </Button>
            </div>
          

             </form>
        </div>
  )
}

export default ProfileInfoEditForm