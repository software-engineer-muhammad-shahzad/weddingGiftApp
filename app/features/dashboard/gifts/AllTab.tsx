"use client";

import Image from "next/image";
import { useState } from "react";
import ModalLayer from "../../../components/ui/ModalLayer";
import { Download, Share2 } from "lucide-react";
import Button from "../../../components/elements/Button";
import { MessageItemDTO } from "../types/coupleGreetings";

interface AllTabProps {
  receivedGiftData: MessageItemDTO[];
}

const AllTab = ({ receivedGiftData }: AllTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<MessageItemDTO | null>(
    null
  );

  const handleItemClick = (data: MessageItemDTO) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="flex flex-col gap-4 max-h-96 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {receivedGiftData?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-6 md:py-8 border-b border-[#47038A] cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex gap-3 md:gap-4 items-center">
              <div className="border border-[#5FDA78] rounded-full w-12 h-12">
                <Image
                  src="/images/profile-pic.png"
                  alt="profile"
                  width={40}
                  height={40}
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-white font-semibold">
                  {item.guestName}{" "}
                  <span className="ms-2">{item.amount}</span>
                </p>

                <p className="text-white text-sm font-light">
                  {item.messagePreview}
                </p>

                <p className="text-white text-xs font-light">
                  {new Date(item.receivedAtUtc).toDateString()}
                </p>
              </div>
            </div>

            {item.mediaUrl && (
              <div>
                <Image
                  src={item.mediaUrl}
                  alt="card-image"
                  width={85}
                  height={60}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedData && (
        <ModalLayer
          onClose={() => setIsModalOpen(false)}
          modalHeight="h-full md:h-[400px]"
          modalWidth="w-full max-w-[400px]"
          overlayColor="bg-[#171515EB]"
          position="center"
        >
          <div className="bg-[#5FDA78] h-full w-full p-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 w-full">
              {selectedData.mediaUrl && (
                <Image
                  src={selectedData.mediaUrl}
                  alt="gift-image"
                  width={300}
                  height={150}
                  className="rounded-sm"
                />
              )}

              <h3 className="text-white text-xl font-semibold">
                {selectedData.guestName}
                <span className="text-[#391F68] ms-4">
                  {selectedData.amount}
                </span>
              </h3>

              <p className="text-white text-lg">
                {selectedData.messagePreview}
              </p>

              <div className="flex gap-4 mt-4">
                <Button className="w-12 h-12 rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>

                <Button className="w-12 h-12 rounded-full">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </ModalLayer>
      )}
    </>
  );
};

export default AllTab;