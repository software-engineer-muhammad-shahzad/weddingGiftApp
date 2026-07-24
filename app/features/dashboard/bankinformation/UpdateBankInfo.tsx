"use client"

import React, { useState } from "react"
import { useUpdateBankInfo } from "../hooks/useUpdateBankInfo"
import { UpdateBankDetailsData } from "../types/UpdateBankDetails"

type Props = {
  data?: UpdateBankDetailsData
  onCancel: () => void
  onSuccess?: () => void
}

/** Normalize API DOB (ISO / date string) to `yyyy-MM-dd` for `<input type="date">`. */
const toDateInputValue = (value?: string | null) => {
  if (!value) return ""
  const trimmed = value.trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed.slice(0, 10)

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return ""

  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, "0")
  const day = String(parsed.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getTodayDateInputValue = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const UpdateBankInfo = ({ data, onCancel, onSuccess }: Props) => {
  const today = getTodayDateInputValue()
  const [form, setForm] = useState<UpdateBankDetailsData>({
    accountHolderName: data?.accountHolderName || "",
    iban: data?.iban || "",
    accountNumber: data?.accountNumber || "",
    address: data?.address || "",
    currency: data?.currency || "",
    dob: toDateInputValue(data?.dob),
  })

  const { updateBankData, isLoading } = useUpdateBankInfo()
  const [currency, setCurrency] = useState(form.currency)

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: name === "dob" && value > today ? today : value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const payload: UpdateBankDetailsData = {
        ...form,
        currency,
        dob: form.dob ? form.dob : "",
      }
      await updateBankData(payload)
      onSuccess?.()
      onCancel()
    } catch (err) {
      console.error("Update failed:", err)
    }
  }

  return (
    <div className="border border-[#5FDA78] rounded-[30px] mt-10 p-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-white font-semibold">Update Bank Info</h2>

        <button
          onClick={onCancel}
          className="text-white cursor-pointer text-sm underline"
        >
          Cancel
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <input
          name="accountHolderName"
          value={form.accountHolderName}
          onChange={handleChange}
          placeholder="Account Holder Name"
          className="p-2 rounded bg-[#1f003d] text-white border border-gray-600"
        />

        <input
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          className="p-2 rounded bg-[#1f003d] text-white border border-gray-600"
        />

        <input
          name="iban"
          value={form.iban}
          onChange={handleChange}
          placeholder="IBAN"
          className="p-2 rounded bg-[#1f003d] text-white border border-gray-600"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Bank Address"
          className="p-2 rounded bg-[#1f003d] text-white border border-gray-600"
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="dob" className="text-sm text-[#EEEEEE]">
            Date of Birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={form.dob}
            max={today}
            onChange={handleChange}
            className="p-2 rounded bg-[#1f003d] text-white border border-gray-600 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>

        <select
          name="currency"
          className="p-2 rounded bg-[#1f003d] text-white border border-gray-600"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="">Select</option>
          <option value="GBP">GBP (£) - British Pound</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-[#5FDA78] text-black font-semibold py-2 rounded"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

export default UpdateBankInfo
