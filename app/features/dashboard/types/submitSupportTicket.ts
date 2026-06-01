export interface CoupleSupportTicketPayload {
  subject: string
  message: string
}

export interface CoupleSupportTicketResponse {
  statusCode: number
  statusMessage: string
  data: {
    id: number
  }
}