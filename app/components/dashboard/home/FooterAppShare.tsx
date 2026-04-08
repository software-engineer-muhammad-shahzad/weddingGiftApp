import Image from "next/image"
import Link from "next/link"


const FooterAppShare = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-100" >

        <div className="flex py-2  gap-2 justify-center bg-[#34016694] w-full max-w-200">
            {/* home icon */}
      <button className="bg-[#5FDA78] p-3 rounded-full hover:bg-[#4BC965] transition-colors">
        <Image src="/images/home-footer-icon.png" alt="home-footer-icon" width={20} height={20}/>
      </button>
      {/*  greeting*/}
      <Link href="/dashboard/gifts" className="bg-[#5FDA78] p-3 rounded-full hover:bg-[#4BC965] transition-colors">
        <Image src="/images/greeting-footer-icon.png" alt="home-footer-icon" width={20} height={20}/>
      </Link>
      {/* app share icon */}
      
      <button className="bg-[#5FDA78] p-3 rounded-full hover:bg-[#4BC965] transition-colors">
        <Image src="/images/app-share-icon.png" alt="app-share-icon" width={20} height={20}/>
      </button>
      {/* scanner icon */}
        <button className="bg-[#5FDA78] p-3 rounded-full hover:bg-[#4BC965] transition-colors">
        <Image src="/images/wallet-money.png" alt="wallet-money-icon" width={20} height={20}/>
      </button>
      </div>
    </div>
  )
}

export default FooterAppShare