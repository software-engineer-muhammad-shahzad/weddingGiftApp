export interface CoupleBankDetailsData {
  accountHolderName: string
  iban: string
  address: string
  city?: string | null
  postalCode?: string | null
  phoneNumber?: string | null
  currency: string
  accountNumber: string
  dob?: string | null
}

export interface CoupleBankDetailsResponse {
  statusCode: number
  statusMessage: string
  data: CoupleBankDetailsData
}