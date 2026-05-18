import * as z from "zod"

export const signupSchema = z
  .object({
    name: z.string().min(2, "Please enter your name"),
    partnerName: z.string().min(2, "Please enter your partner name"),
    eventDate: z.string().min(1, "Please enter your event date"),
    email: z.string().email("Please enter a valid email"),
    phoneNumber: z.string().min(10, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

export type SignupFormValues = z.infer<typeof signupSchema>
