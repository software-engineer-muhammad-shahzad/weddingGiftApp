"use client";

import Image from "next/image";
import { useState } from "react";
import ModalLayer from "../../../components/ui/ModalLayer";
import { Download, Share2, X } from "lucide-react";
import { showError, showSuccess } from "@/app/lib/toast";
import { buildContentImageUrl } from "@/app/utils/imageUrl";
import { MessageItemDTO } from "../types/coupleGreetings";

interface AllTabProps {
  receivedGiftData: MessageItemDTO[];
  activeTab?: string;
}

const AllTab = ({ receivedGiftData, activeTab = "all" }: AllTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<MessageItemDTO | null>(
    null
  );

  const handleItemClick = (data: MessageItemDTO) => {
    setSelectedData(data)
    setIsModalOpen(true)
  }

  // ✅ on the Video tab prefer the video even when a card image is also present
  const getMediaType = (item: MessageItemDTO): "image" | "video" | null => {
    if (activeTab === "video" && item.wishingVideoPath) return "video"
    if (item.wishingCardPath) return "image"
    if (item.wishingVideoPath) return "video"
    return null
  }

  const selectedMediaType = selectedData ? getMediaType(selectedData) : null
  const hasMedia = selectedMediaType !== null

  const getSelectedMedia = () => {
    if (!selectedData) return null;

    if (getMediaType(selectedData) === "video" && selectedData.wishingVideoPath) {
      return {
        url: buildContentImageUrl(selectedData.wishingVideoPath) || selectedData.wishingVideoPath,
        type: "video/mp4",
        extension: "mp4",
      };
    }

    if (selectedData.wishingCardPath) {
      return {
        url: buildContentImageUrl(selectedData.wishingCardPath) || selectedData.wishingCardPath,
        type: "image/jpeg",
        extension: "jpg",
      };
    }

    return null;
  };

  const handleDownload = async () => {
    const media = getSelectedMedia();
    if (!media) return;

    try {
      const response = await fetch(media.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${selectedData?.guestName ?? "gift"}.${media.extension}`;
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      window.open(media.url, "_blank");
    }
  };

  const handleShare = async () => {
    const media = getSelectedMedia();
    if (!media?.url) {
      showError("Nothing to share");
      return;
    }

    const title = selectedData?.guestName ?? "Gift";
    const text = selectedData?.wishingContent?.trim() || `Gift from ${title}`;
    const shareUrl = media.url;

    try {
      // Mobile: try sharing the actual file when supported.
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        try {
          const response = await fetch(shareUrl, { mode: "cors" });
          if (response.ok) {
            const blob = await response.blob();
            const mimeType = blob.type || media.type;
            const file = new File([blob], `gift.${media.extension}`, { type: mimeType });

            if (navigator.canShare?.({ files: [file] })) {
              await navigator.share({
                files: [file],
                title,
                text,
              });
              return;
            }
          }
        } catch {
          // Fall through to URL / clipboard share.
        }

        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      showSuccess("Link copied to clipboard!");
    } catch (error: unknown) {
      const name = error instanceof Error ? error.name : "";
      if (name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(shareUrl);
        showSuccess("Link copied to clipboard!");
      } catch {
        showError("Share failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div
        className="flex flex-col gap-4 max-h-96 overflow-y-auto pb-24"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {receivedGiftData?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-6 md:py-8 border-b border-[#47038A] cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex gap-3.5 md:gap-5 items-center">
              <div className="border border-[#5FDA78] rounded-full w-12.5 h-12.5 flex items-center justify-center shrink-0 overflow-hidden">
                {item.guestProfilePic ? (
                  <img src={item.guestProfilePic} alt={item.guestName ?? 'Guest'} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-white text-lg uppercase leading-none">
                    {item.guestName?.charAt(0) || "?"}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-white text-xs font-semibold">
                  {item.guestName}
                  <span className="ms-2">{item.defaultCurrencySymbol} {item.amount}</span>
                </p>

                <p className="text-white text-[11px] font-normal">
                  {item.wishingContent}
                </p>

                <p className="text-white text-[11px] font-light">
                  {new Date(item.resourceMetadata.createdOn).toLocaleDateString("en-GB",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {activeTab !== "video" && item.wishingCardPath ? (
                <Image
                  src={item.wishingCardPath}
                  alt="card-image"
                  width={60}
                  height={60}
                  className="rounded-[13px]"
                />
              ) : null}

              {activeTab !== "greeting" && item.wishingVideoPath ? (
                <video width={85} height={60} controls className="rounded-[13px]">
                  <source src={item.wishingVideoPath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedData && (
        <ModalLayer
          onClose={() => setIsModalOpen(false)}
          modalHeight="auto"
          modalWidth={
            hasMedia
              ? "w-full max-w-[80vw] sm:max-w-[90vw] md:max-w-105"
              : "w-[90%] max-w-[360px]"
          }
          className={
            hasMedia
              ? "h-full md:h-auto md:max-h-[85vh]"
              : "h-auto"
          }
          overlayColor="bg-[#171515EB]"
          position="center"
        >
          <div
            className={`bg-[#330065] pb-2 w-full flex flex-col text-white overflow-y-auto ${
              hasMedia ? "h-full" : "h-auto rounded-2xl"
            }`}
          >
            {/* header */}
            <div className="flex items-center justify-end px-4 py-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* image / video — portrait frame (only when media exists) */}
            {hasMedia && (
              <div className="flex-1 flex items-center justify-center px-8 sm:px-12 min-h-0 overflow-hidden">
                {selectedMediaType === "video" ? (
                  <div className="relative mx-auto h-[min(55vh,520px)] aspect-[9/16] max-w-full rounded-2xl overflow-hidden border border-white/20 bg-black/30">
                    <video
                      controls
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src={selectedData.wishingVideoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="relative mx-auto h-[min(55vh,520px)] aspect-[9/16] max-w-full rounded-2xl overflow-hidden border border-white/20 bg-black/30">
                    <Image
                      src={selectedData.wishingCardPath}
                      alt="card-image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 70vw, 320px"
                    />
                  </div>
                )}
              </div>
            )}

            {/* guest info */}
            <div className={`text-center px-6 ${hasMedia ? "pt-4" : "pt-1 pb-2"}`}>
              <h3 className="text-white text-lg font-semibold">
                {selectedData.guestName}
              </h3>

              <p className="text-white text-lg font-normal mt-1">
                {selectedData.wishingContent}
              </p>

              <p className="text-white text-lg font-light mt-1">
                {new Date(selectedData.resourceMetadata.createdOn).toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* bottom actions — only for media attachments */}
            {hasMedia && (
              <div className="flex justify-center gap-4 py-6">
                <button
                  type="button"
                  onClick={handleShare}
                  className="cursor-pointer border border-[#5FDA78] glass-card w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="cursor-pointer border border-[#5FDA78] glass-card w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </ModalLayer>
      )}
    </>
  );
};

export default AllTab;
