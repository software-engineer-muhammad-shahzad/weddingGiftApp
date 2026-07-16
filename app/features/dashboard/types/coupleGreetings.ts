import { ResourceMetadata } from "./ResourceMetadata";

export interface ApiResponse<T> {
  statusCode: number;
  statusMessage: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface MessageItemDTO {
  id: number;
  guestName: string | null;
  guestProfilePic: string | null;
  amount: number;
  wishingContent: string;
  wishingCardPath: string;
  wishingVideoPath: string;
  isAttachment: boolean;
  resourceMetadata: ResourceMetadata;
}