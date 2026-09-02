export interface UpdateBankDetailsData {
  accountHolderName: string
  iban: string
  accountNumber: string
  /** Residential address line 1 — Stripe matches this against credit-reference data. */
  address: string
  addressLine2: string
  city: string
  postalCode: string
  phoneNumber: string
  currency: string
  dob: string
}

export interface UpdateBankDetailsResponse {
  statusCode: number
  statusMessage: string
  data: UpdateBankDetailsData
}