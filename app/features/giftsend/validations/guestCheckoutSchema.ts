import { z } from "zod"

const normalizePhoneNumber = (value: string) => value.replace(/[\s()-]/g, "")

const isValidPhoneNumber = (value: string) => {
  if (!/^\+?[0-9]+$/.test(value)) return false

  const digits = value.startsWith("+") ? value.slice(1) : value
  if (digits.length < 10 || digits.length > 15) return false

  if (value.startsWith("+44") || value.startsWith("0")) {
    const ukNumber = value.startsWith("+44") ? `0${value.slice(3)}` : value
    return /^0[1-9]\d{8,9}$/.test(ukNumber)
  }

  return true
}

export const guestCheckoutSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, "Please enter your full name")
    .max(200, "Full name is too long")
    .regex(/^[A-Za-z\s'-]+$/, "Full name must contain only letters")
    .refine((value) => /[A-Za-z]/.test(value), "Full name must contain at least one letter"),
  contactNumber: z.string()
    .trim()
    .min(1, "Please enter your contact number")
    .max(32, "Contact number is too long")
    .transform(normalizePhoneNumber)
    .pipe(
      z.string().refine(
        isValidPhoneNumber,
        "Please enter a valid contact number (e.g. 07123456789 or +447123456789)",
      ),
    ),
  email: z.string().trim().min(1, "Please enter your email").email("Please enter a valid email"),
})

export type GuestCheckoutFormValues = z.infer<typeof guestCheckoutSchema>
