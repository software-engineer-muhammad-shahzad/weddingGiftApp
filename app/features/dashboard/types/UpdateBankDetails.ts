export interface UpdateBankDetailsData {
  accountHolderName: string
  bsb: string
  accountNumber: string
  bankName: string
}

export interface UpdateBankDetailsResponse {
  statusCode: number
  statusMessage: string
  data: UpdateBankDetailsData
}