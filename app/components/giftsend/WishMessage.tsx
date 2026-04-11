import Image from "next/image"


interface WishMessageProps {
  greetingText: string;
  setGreetingText: (text: string) => void;
}

const WishMessage = ({ greetingText, setGreetingText }: WishMessageProps) => {
  return (
    <> {/* add greeting text here */}
              <div className="items-center px-8 flex gap-4 flex-col py-8 border border-[#5FDA78] rounded-[20px]"
                style={{
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
    
                <div className="flex items-center gap-6">
                  <div> 
                    <Image src="/images/shagun-logo.png" alt="shagun-app" width={50} height={50}/>
                  </div>
                  <p className="text-white text-lg">Add your greeting text for free</p>
                </div>
    
                <div className="flex justify-center w-full py-4 rounded-[20px]">
                  <textarea
                    value={greetingText}
                    onChange={(e) => setGreetingText(e.target.value)}
                    className="w-full h-24 px-4 py-3 bg-[#330065] text-white text-md rounded-[20px] border border-[#5FDA78] resize-none focus:outline-none focus:border-[#5FDA78] placeholder:text-gray-400"
                    placeholder="Write your greeting message here..."
                    rows={3}
                  />
                </div>
    
              </div></>
  )
}

export default WishMessage