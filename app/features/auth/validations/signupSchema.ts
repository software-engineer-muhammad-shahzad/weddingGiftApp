import * as z from "zod"

const getTodayDateString = () => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${today.getFullYear()}-${month}-${day}`
}

/** GB national number: leading 0, then a 9- or 10-digit significant number. */
const GB_NATIONAL_PATTERN = /^0[1-9]\d{8,9}$/

/**
 * Accepts the ways a GB number is normally typed — 07123456789, +447123456789,
 * 447123456789, 00447123456789 — and returns it in E.164 (+447123456789), which
 * is the form Stripe requires. Returns null for anything that isn't a GB number.
 */
const toGbE164 = (value: string) => {
  const compact = value.replace(/[\s()-]/g, "")
  if (!/^\+?\d+$/.test(compact)) return null

  let nationalDigits = compact.startsWith("+") ? compact.slice(1) : compact

  // A GB significant number never starts with 4, so a leading 44 is the country code.
  if (nationalDigits.startsWith("0044")) {
    nationalDigits = nationalDigits.slice(4)
  } else if (nationalDigits.startsWith("44")) {
    nationalDigits = nationalDigits.slice(2)
  } else if (nationalDigits.startsWith("0")) {
    nationalDigits = nationalDigits.slice(1)
  } else {
    return null
  }

  if (!GB_NATIONAL_PATTERN.test(`0${nationalDigits}`)) return null

  return `+44${nationalDigits}`
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
      // Keep the raw value when it isn't a GB number so the pipe below rejects it.
      .transform((value) => toGbE164(value) ?? value)
      .pipe(
        z.string().regex(
          /^\+44\d{9,10}$/,
          "Please enter a valid UK phone number with country code (e.g. +447123456789)",
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
  .refine(
    (data) => data.fullName.toLowerCase() !== data.partnerName.toLowerCase(),
    {
      message: "Your name and partner name cannot be the same",
      path: ["partnerName"],
    },
  )

export type SignupFormValues = z.infer<typeof signupSchema>
