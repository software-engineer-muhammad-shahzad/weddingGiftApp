// import { getCoupleDashboard } from "../api/getCoupleDashboard";

import { getQrCodeUrl } from "../api/qrCodeApi";

export const qrCodeService = {
  getQrCode: async () => {
    const response = await getQrCodeUrl();
    return response.data; // 👈 return only useful data
  },
};