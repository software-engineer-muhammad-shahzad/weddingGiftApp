import endpoints from "@/app/services/endpoint"
import { getRequest } from "@/app/services/http"
import { QrCodeApiResponse } from "../types/getQrCode";

export const getQrCodeUrl = async (): Promise<QrCodeApiResponse> => {
  return getRequest(endpoints.qrCode.getQrCode);
}