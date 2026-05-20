export interface CoupleBankDetailsData {
  accountHolderName: string
  bsb: string
  accountNumber: string
  bankName: string
}

export interface CoupleBankDetailsResponse {
  statusCode: number
  statusMessage: string
  data: CoupleBankDetailsData
}