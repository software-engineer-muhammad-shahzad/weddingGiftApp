export interface QrCodeData {
  publicSlug: string;
  inviteUrl: string;
  qrDownloadUrl: string;
  coupleName: string;
  coupleEventDate: string;
}

export interface QrCodeApiResponse {
  statusCode: number;
  statusMessage: string;
  data: QrCodeData;
}