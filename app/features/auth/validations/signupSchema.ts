import * as z from "zod"

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your name"),
    partnerName: z.string().trim().min(2, "Please enter your partner name"),
    eventDate: z.string()
      .min(1, "Please select an event date")
      .refine((date) => !isNaN(Date.parse(date)), "Please enter a valid event date")
      .refine((date) => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return new Date(date) >= today
      }, "Event date cannot be in the past"),
    email: z.string().trim().email("Please enter a valid email"),
    phoneNumber: z.string()
      .trim()
      .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
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
