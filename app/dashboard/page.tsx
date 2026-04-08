import Balance from "../components/dashboard/home/Balance"
import Banner from "../components/dashboard/home/Banner"
import ContributorList from "../components/dashboard/home/ContributorList"
import FooterAppShare from "../components/dashboard/home/FooterAppShare"
import Header from "../components/dashboard/home/Header"
import StatisticChart from "../components/dashboard/home/StatisticChart"

const page = () => {
  return (
    <div className="flex justify-center bg-[#330065] min-h-screen overflow-auto w-full mx-auto pt-5 px-10 max-w-382.5">
<div className="max-w-200 w-full "> 
    
           <Header/>
           <Balance/>
           <Banner/>
           <StatisticChart/>
           <FooterAppShare/>
           <ContributorList/>
</div>

    </div>
  )
}

export default page