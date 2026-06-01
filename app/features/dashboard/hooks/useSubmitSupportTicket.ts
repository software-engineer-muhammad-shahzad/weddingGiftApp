// hooks/useSupportTicket.ts

import { useState } from "react"
import { submitSupportTicketService } from "../services/dashboardService"
import { CoupleSupportTicketPayload, CoupleSupportTicketResponse } from "../types/submitSupportTicket"
import { showSuccess } from "@/app/lib/toast"

export const useSupportTicket = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const submitTicket = async (
        data: CoupleSupportTicketPayload
    ): Promise<CoupleSupportTicketResponse | null> => {
        try {
            setLoading(true)
            setError(null)

            const response = await submitSupportTicketService(data)
            showSuccess(response?.statusMessage)
            return response
        } catch (err: any) {
            setError(err?.message || "Something went wrong")
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        submitTicket,
        loading,
        error
    }
}