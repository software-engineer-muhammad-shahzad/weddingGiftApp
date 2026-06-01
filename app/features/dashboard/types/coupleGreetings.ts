export interface ApiResponse<T> {
  statusCode: number;
  statusMessage: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: any;
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface MessageItemDTO {
  id: number;
  guestName: string;
  amount: number;
  currency: string;
  messagePreview: string;
  receivedAtUtc: string; // keep string in API layer
  isRead: boolean;
  mediaType: string;
  mediaUrl: string;
  hasVideo: boolean;
}