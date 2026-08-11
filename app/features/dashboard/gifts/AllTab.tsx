"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ModalLayer from "../../../components/ui/ModalLayer";
import { Download, Share2, X } from "lucide-react";
import { showError, showSuccess } from "@/app/lib/toast";
import { buildContentImageUrl } from "@/app/utils/imageUrl";
import { MessageItemDTO } from "../types/coupleGreetings";

interface AllTabProps {
  receivedGiftData: MessageItemDTO[];
  activeTab?: string;
}

const getExtensionFromPath = (path: string, fallback: string) => {
  const cleanPath = path.split("?")[0] ?? "";
  const extension = cleanPath.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : fallback;
};

const isSameOriginUrl = (url: string) => {
  if (url.startsWith("/")) return true;
  try {
    return new URL(url, window.location.origin).origin === window.location.origin;
  } catch {
    return false;
  }
};

const toSameOriginMediaUrl = (url: string) =>
  isSameOriginUrl(url) ? url : `/api/share-media?url=${encodeURIComponent(url)}`;

const AllTab = ({ receivedGiftData, activeTab = "all" }: AllTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [selectedData, setSelectedData] = useState<MessageItemDTO | null>(
    null
  );
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);

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
      const path = selectedData.wishingVideoPath;
      return {
        url: buildContentImageUrl(path) || path,
        type: "video/mp4",
        extension: getExtensionFromPath(path, "mp4"),
      };
    }

    if (selectedData.wishingCardPath) {
      const path = selectedData.wishingCardPath;
      return {
        url: buildContentImageUrl(path) || path,
        type: "image/jpeg",
        extension: getExtensionFromPath(path, "jpg"),
      };
    }

    return null;
  };

  const blobFromUrl = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch media");
    const blob = await response.blob();
    if (!blob.size) throw new Error("Empty media");
    return blob;
  };

  const fetchMediaFile = async (
    media: NonNullable<ReturnType<typeof getSelectedMedia>>
  ) => {
    const displayedSrc = mediaRef.current?.currentSrc || "";
    const candidates = [
      displayedSrc && isSameOriginUrl(displayedSrc) ? displayedSrc : "",
      toSameOriginMediaUrl(media.url),
    ].filter((url, index, list) => url && list.indexOf(url) === index);

    let blob: Blob | null = null;
    for (const url of candidates) {
      try {
        blob = await blobFromUrl(url);
        break;
      } catch {
        // Try the next same-origin candidate.
      }
    }

    if (!blob) {
      throw new Error("Failed to fetch media");
    }

    const mimeType =
      blob.type && blob.type !== "application/octet-stream"
        ? blob.type
        : media.type;
    const extension = mimeType.includes("/")
      ? mimeType.split("/")[1].split("+")[0] || media.extension
      : media.extension;
    const guestName = (selectedData?.guestName ?? "gift").replace(/[^\w-]+/g, "-");

    return new File([blob], `${guestName}.${extension}`, { type: mimeType });
  };

  const downloadFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  };

  const handleDownload = async () => {
    const media = getSelectedMedia();
    if (!media) return;

    try {
      const file = await fetchMediaFile(media);
      downloadFile(file);
    } catch (error) {
      console.error("Download failed:", error);
      showError("Failed to download media. Please try again.");
    }
  };

  const handleShare = async () => {
    const media = getSelectedMedia();
    if (!media?.url || isSharing) {
      if (!media?.url) showError("Nothing to share");
      return;
    }

    try {
      setIsSharing(true);
      const file = await fetchMediaFile(media);
      const shareData: ShareData = { files: [file] };

      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        (!navigator.canShare || navigator.canShare(shareData))
      ) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error: unknown) {
          const name = error instanceof Error ? error.name : "";
          if (name === "AbortError") return;
        }
      }

      downloadFile(file);
      showSuccess("Media downloaded. You can share it from your device.");
    } catch (error: unknown) {
      const name = error instanceof Error ? error.name : "";
      if (name === "AbortError") return;
      console.error("Share failed:", error);
      showError("Failed to share media. Please try again.");
    } finally {
      setIsSharing(false);
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
                      ref={(el) => {
                        mediaRef.current = el;
                      }}
                      controls
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src={selectedData.wishingVideoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="relative mx-auto h-[min(55vh,520px)] aspect-[9/16] max-w-full rounded-2xl overflow-hidden border border-white/20 bg-black/30">
                    <Image
                      ref={(el) => {
                        mediaRef.current = el;
                      }}
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
                  disabled={isSharing}
                  className="cursor-pointer border border-[#5FDA78] glass-card w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50"
                  aria-label="Share media"
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
