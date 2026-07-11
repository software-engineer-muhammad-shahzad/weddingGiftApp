import endpoints from "@/app/services/endpoint"
import { getRequest } from "@/app/services/http"
import apiClient from "@/app/services/apiClient"
import { QrCodeApiResponse } from "../types/getQrCode";

export const getQrCodeUrl = async (): Promise<QrCodeApiResponse> => {
  return getRequest(endpoints.qrCode.getQrCode);
}

// The QR image endpoint requires the same auth token as other API calls,
// so it can't be loaded with a plain <img src>; fetch it as a blob instead.
export const getQrCodeImage = async (qrDownloadUrl: string): Promise<Blob> => {
  const response = await apiClient.get(qrDownloadUrl, { responseType: "blob" });
  return response.data;
}