import Image from "next/image"


interface WishMessageProps {
  greetingText: string;
  setGreetingText: (text: string) => void;
}

const WishMessage = ({ greetingText, setGreetingText }: WishMessageProps) => {
  return (
    <> {/* add greeting text here */}
              <div className="items-center glass-card px-4 md:px-8 flex gap-4 flex-col py-8 border border-[#5FDA78] rounded-[20px]"
                >
    
                <div className="flex items-center gap-4 md:gap-6">
                  <div> 
                    <Image src="/images/shagun-logo.svg" alt="shagun-app" width={23} height={27}/>
                  </div>
                  <p className="text-white text-lg">Add your greeting text for free</p>
                </div>
    
                <div className="flex justify-center w-full  rounded-[20px]">
                  <textarea
                    value={greetingText}
                    onChange={(e) => setGreetingText(e.target.value)}
                    className="w-full h-24 px-4 py-3 bg-[#330065] text-white text-lg rounded-[20px] border border-[#5FDA78] resize-none focus:outline-none focus:border-[#5FDA78] placeholder:text-gray-400"
                    placeholder="Write your greeting message here..."
                    rows={3}
                  />
                </div>
    
              </div></>
  )
}

export default WishMessage