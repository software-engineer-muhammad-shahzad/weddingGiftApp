import { z } from "zod"

export const guestCheckoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  contactNumber: z.string().min(7, "Enter a valid contact number"),
  email: z.string().email("Enter a valid email"),
})

export type GuestCheckoutFormValues = z.infer<typeof guestCheckoutSchema>
