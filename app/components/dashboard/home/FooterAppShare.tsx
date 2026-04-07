import Image from "next/image"


const FooterAppShare = () => {
  return (
    <div className="fixed bottom-4 left-0 right-0 flex  justify-center">

        <div className="flex justify-center bg-red-500">
            {/* home icon */}
      <button className="bg-[#5FDA78] p-3 rounded-full hover:bg-[#4BC965] transition-colors">
        <Image src="/images/home-footer-icon.png" alt="home-footer-icon" width={20} height={20}/>
      </button>
      {/*  greeting*/}
      <button className="bg-[#5FDA78] p-3 rounded-full hover:bg-[#4BC965] transition-colors">
        <Image src="/images/greeting-footer-icon" alt="home-footer-icon" width={20} height={20}/>
      </button>
      </div>
    </div>
  )
}

export default FooterAppShare