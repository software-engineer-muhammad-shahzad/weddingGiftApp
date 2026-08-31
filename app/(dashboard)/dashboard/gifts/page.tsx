"use client";

import Header from "@/app/features/dashboard/gifts/Header";
import InputSearch from "@/app/features/dashboard/gifts/InputSearch";
import Tabs from "@/app/features/dashboard/gifts/Tabs";
import FooterAppShare from "@/app/features/dashboard/home/FooterAppShare";
import AllTab from "@/app/features/dashboard/gifts/AllTab";
import { useCoupleGreetings } from "@/app/features/dashboard/hooks/useGetCoupleGreetings";
import { useDashboard } from "@/app/features/dashboard/hooks/useDashboard";
import Skeleton from "@/app/components/ui/Skeleton";

const Page = () => {
  const {
    items,
    activeTab,
    setActiveTab,
    search,
    setSearch,
    loading,
  } = useCoupleGreetings();
  const { data: dashboardData, needsBankAccount } = useDashboard();
  // The dashboard endpoint 403s outright before bank details exist, so in that
  // case `dashboardData` is null and the flag never arrives — treat it as false.
  const hasBankAccount = needsBankAccount ? false : dashboardData?.hasBankAccount;

  return (
    <div className="flex justify-center bg-[#330065] h-dvh overflow-hidden w-full mx-auto pt-10 px-6 md:px-10 max-w-382.5">
      <div className="max-w-150 w-full h-full flex flex-col min-h-0">
        <Header unReadNotificationCount={dashboardData?.unReadNotificationCount ?? 0} />

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <InputSearch search={search} setSearch={setSearch} />

        <div className="mt-8 flex-1 min-h-0 flex flex-col">
          {loading ? (
            <div className="flex flex-col gap-4 overflow-y-auto pb-28">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between py-6 md:py-8 border-b border-[#47038A]">
                  <div className="flex gap-3.5 md:gap-5 items-center">
                    <Skeleton className="w-12.5 h-12.5 rounded-full" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-3 w-40" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="w-15 h-15 rounded-[13px]" />
                </div>
              ))}
            </div>
          ) : (
            <AllTab receivedGiftData={items} activeTab={activeTab} />
          )}

          <FooterAppShare hasBankAccount={hasBankAccount} />
        </div>
      </div>
    </div>
  );
};

export default Page;
