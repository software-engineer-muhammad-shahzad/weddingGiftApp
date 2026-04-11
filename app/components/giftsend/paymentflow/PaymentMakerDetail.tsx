import { Download, Share2 } from "lucide-react"
import Button from "../../elements/Button"


const PaymentMakerDetail = () => {
  return (

    <>
    <div  className="mt-6 p-4  border border-[#5FDA78] rounded-[20px]" style={{
                    background: `
                    radial-gradient(38.46% 38.46% at 11.54% 19.23%, rgba(255, 255, 255, 0.05) 0%, rgba(95, 250, 120, 0.1) 70%, rgba(240, 240, 255, 0.05) 100%),
                    linear-gradient(316.97deg, rgba(255, 255, 255, 0.1) 17.24%, rgba(255, 255, 255, 0) 58.62%, rgba(217, 235, 255, 0) 86.21%)
                  `,
                    boxShadow: `
                    0px 1.5px 3.33px rgba(255, 255, 255, 0.1) inset,
                    0px 0px 8px rgba(209, 229, 255, 0.2) inset,
                    0px 3px 12px -3px rgba(0, 0, 0, 0.15),
                    0px 10px 28px -6px rgba(0, 0, 0, 0.25)
                  `,
                    backdropFilter: 'blur(15px)',
                }}>

                    <div className="relative">
                    <div className="flex justify-between">
                        <p className="text-[#B5B5B5] font-medium text-sm">Sender Name</p>
                        <p className="text-white font-medium text-sm">Ali Khan</p>
                    </div>
                <div className="flex justify-between pb-4">

                       <p className="text-[#B5B5B5] font-medium text-sm">Account Number</p>
                        <p className="text-white font-medium text-sm">0333 3565432</p>
                </div>
                      <div className="absolute bottom-0 left-0 w-full h-px 
       bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />

       
                </div>
                <div className="pt-4">
                       <div className="flex justify-between">
                        <p className="text-[#B5B5B5] font-medium text-sm">Sender Name</p>
                        <p className="text-white font-medium text-sm">Ali Khan</p>
                    </div>
                <div className="flex justify-between pb-4">

                       <p className="text-[#B5B5B5] font-medium text-sm">Account Number</p>
                        <p className="text-white font-medium text-sm">0333 3565432</p>
                </div>
                </div>
               
                
                </div>

                 {/* download and share button */}
                <div className="flex mt-4 gap-4 overflow-hidden">
                    <Button type="download" className="border border-[#5FDA78] py-4 w-6 rounded-full h-6 flex items-center justify-center">
                       <Share2 className="text-white" />
                    </Button>
                    <Button type="download" className="border border-[#5FDA78] py-4 w-6 h-6 rounded-full flex items-center justify-center">
                         <Download  className="text-white "/>
                    </Button>
                </div>
                {/* done button */}
                <Button className="bg-[#5FDA78] mt-5 py-3 rounded-full w-full">Done</Button>
                </>
  )
}

export default PaymentMakerDetail