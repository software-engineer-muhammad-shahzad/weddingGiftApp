// Mirrors the backend ConnectAccountStatusResponse (StripeConnectDtos.cs):
// a diagnostic view of a couple's Stripe connected account — why it is
// restricted and which fields Stripe still needs before capabilities activate.

export interface StripeRequirementError {
  code?: string | null
  reason?: string | null
  requirement?: string | null
}

export interface StripeCapabilityStatus {
  capability: string
  status?: string | null
  disabledReason?: string | null
  currentlyDue: string[]
  pastDue: string[]
  errors: StripeRequirementError[]
}

export interface StripeConnectStatusData {
  coupleUserId: number
  stripeConnectedId: string

  chargesEnabled: boolean
  payoutsEnabled: boolean
  detailsSubmitted: boolean

  disabledReason?: string | null

  capabilities: Record<string, string>
  currentlyDue: string[]
  pastDue: string[]
  eventuallyDue: string[]
  pendingVerification: string[]
  errors: StripeRequirementError[]
  capabilityDetails: StripeCapabilityStatus[]

  individualVerificationStatus?: string | null
  individualVerificationDetails?: string | null
}

export interface StripeConnectStatusResponse {
  statusCode: number
  statusMessage: string
  data: StripeConnectStatusData
}
