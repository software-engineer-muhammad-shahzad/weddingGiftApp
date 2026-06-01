export interface QrCodeData {
  publicSlug: string;
  inviteUrl: string;
  qrDownloadUrl: string;
}

export interface QrCodeApiResponse {
  statusCode: number;
  statusMessage: string;
  data: QrCodeData;
}