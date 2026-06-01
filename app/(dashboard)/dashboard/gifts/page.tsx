"use client";

import Header from "@/app/features/dashboard/gifts/Header";
import InputSearch from "@/app/features/dashboard/gifts/InputSearch";
import Tabs from "@/app/features/dashboard/gifts/Tabs";
import FooterAppShare from "@/app/features/dashboard/home/FooterAppShare";
import AllTab from "@/app/features/dashboard/gifts/AllTab";
import { useCoupleGreetings } from "@/app/features/dashboard/hooks/useGetCoupleGreetings";

// import { useCoupleGreetings } from "@/app/hooks/useCoupleGreetings";

const Page = () => {
  const {
    items,
    activeTab,
    setActiveTab,
    search,
    setSearch,
    loading,
  } = useCoupleGreetings();

  return (
    <div className="flex justify-center bg-[#330065] min-h-screen overflow-auto w-full mx-auto pt-10 px-5 md:px-10 max-w-382.5">
      <div className="max-w-150 w-full">
        <Header />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <InputSearch search={search} setSearch={setSearch} />

        <div className="mt-8">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <AllTab receivedGiftData={items} />
          )}

          <FooterAppShare />
        </div>
      </div>
    </div>
  );
};

export default Page;