import * as z from "zod"

const getTodayDateString = () => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${today.getFullYear()}-${month}-${day}`
}

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

const nameSchema = (fieldLabel: string) =>
  z.string()
    .trim()
    .min(2, `Please enter your ${fieldLabel}`)
    .max(200, `${fieldLabel} is too long`)
    .regex(/^[A-Za-z\s'-]+$/, `${fieldLabel} must contain only letters`)
    .refine((value) => /[A-Za-z]/.test(value), `${fieldLabel} must contain at least one letter`)

export const signupSchema = z
  .object({
    fullName: nameSchema("name"),
    partnerName: nameSchema("partner name"),
    eventDate: z.string()
      .min(1, "Please select an event date")
      .refine((date) => /^\d{4}-\d{2}-\d{2}$/.test(date), "Please enter a valid event date")
      .refine(
        (date) => date >= getTodayDateString(),
        "Event date must be today or a future date",
      ),
    email: z.string().trim().email("Please enter a valid email"),
    phoneNumber: z.string()
      .trim()
      .min(1, "Please enter your phone number")
      .max(32, "Phone number is too long")
      .transform(normalizePhoneNumber)
      .pipe(
        z.string().refine(
          isValidPhoneNumber,
          "Please enter a valid phone number (e.g. 07123456789 or +447123456789)",
        ),
      ),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
