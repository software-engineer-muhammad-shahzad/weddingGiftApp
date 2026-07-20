export interface UpdateBankDetailsData {
  accountHolderName: string
  iban: string
  accountNumber: string
  address: string
  currency: string
}

export interface UpdateBankDetailsResponse {
  statusCode: number
  statusMessage: string
  data: UpdateBankDetailsData
}