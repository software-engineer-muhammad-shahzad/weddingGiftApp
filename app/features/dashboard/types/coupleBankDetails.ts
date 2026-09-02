export interface CoupleBankDetailsData {
  accountHolderName: string
  iban: string
  /** Residential address line 1. */
  address: string
  addressLine2?: string | null
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