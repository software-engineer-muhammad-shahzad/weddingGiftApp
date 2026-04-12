import Balance from "../components/dashboard/home/Balance"
import Banner from "../components/dashboard/home/Banner"
import ContributorList from "../components/dashboard/home/ContributorList"
import FooterAppShare from "../components/dashboard/home/FooterAppShare"
import Header from "../components/dashboard/home/Header"
import StatisticChart from "../components/dashboard/home/StatisticChart"

const page = () => {
  return (
    <div className="flex justify-center  bg-[#330065] min-h-screen overflow-y-auto w-full mx-auto py-10 md:px-10 md:max-w-382.5">
      <div className=" w-full max-w-200 h-full  ">
        <div className="px-4 md:px-0 h-full">
          <Header/>
          <Balance/>
          <Banner/>
          <StatisticChart/>
        </div>
        <ContributorList/>
        <FooterAppShare/>
      </div>
    </div>
  )
}

export default page