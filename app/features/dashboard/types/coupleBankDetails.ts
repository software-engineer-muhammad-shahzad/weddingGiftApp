export interface CoupleBankDetailsData {
  accountHolderName: string
  iban: string
  address: string
  currency: string
  accountNumber: string
}

export interface CoupleBankDetailsResponse {
  statusCode: number
  statusMessage: string
  data: CoupleBankDetailsData
}