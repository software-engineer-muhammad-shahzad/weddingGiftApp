"use client"

import React, { useState } from "react"
import { X } from "lucide-react"
import { showError } from "@/app/lib/toast"
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

const getMaximumDob = () => {
  const now = new Date()
  now.setFullYear(now.getFullYear() - 14)
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const validateBankDetails = (form: UpdateBankDetailsData) => {
  const errors: Partial<Record<keyof UpdateBankDetailsData, string>> = {}
  const accountHolderName = form.accountHolderName.trim()
  const accountNumber = form.accountNumber.replace(/\s/g, "")
  const iban = form.iban.replace(/\s/g, "")

  if (!accountHolderName) {
    errors.accountHolderName = "Account holder name is required"
  } else if (accountHolderName.length < 2 || accountHolderName.length > 100) {
    errors.accountHolderName = "Name must be between 2 and 100 characters"
  } else if (!/^[A-Za-z][A-Za-z\s.'-]*$/.test(accountHolderName)) {
    errors.accountHolderName = "Enter a valid account holder name"
  }

  if (!accountNumber) {
    errors.accountNumber = "Account number is required"
  } else if (!/^\d{6,20}$/.test(accountNumber)) {
    errors.accountNumber = "Account number must contain 6 to 20 digits"
  }

  if (!iban) {
    errors.iban = "IBAN is required"
  } else if (!/^[A-Za-z]{2}\d{2}[A-Za-z0-9]{6,30}$/.test(iban)) {
    errors.iban = "Enter a valid IBAN"
  }

  if (!form.address.trim()) {
    errors.address = "Bank address is required"
  } else if (form.address.trim().length < 5 || form.address.trim().length > 200) {
    errors.address = "Address must be between 5 and 200 characters"
  }

  if (!form.dob) {
    errors.dob = "Date of birth is required"
  } else if (form.dob > getMaximumDob()) {
    errors.dob = "You must be at least 14 years old"
  }

  if (!form.currency) errors.currency = "Currency is required"

  return errors
}

const UpdateBankInfo = ({ data, onCancel, onSuccess }: Props) => {
  const maximumDob = getMaximumDob()
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
  const formWithCurrency = { ...form, currency }
  const errors = validateBankDetails(formWithCurrency)
  const isFormValid = Object.keys(errors).length === 0

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrency(value)
    setForm((prev) => ({ ...prev, currency: value }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: name === "dob" && value > maximumDob ? maximumDob : value,
    }))
  }

  const handleSubmit = async () => {
    if (!isFormValid) return

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
      const error = err as {
        status?: number
        response?: {
          status?: number
          data?: { statusCode?: number }
        }
      }
      const status =
        error.response?.status ??
        error.response?.data?.statusCode ??
        error.status

      if (status === 500) {
        showError("Something went wrong. Please contact the administrator.")
      }
      console.error("Update failed:", err)
    }
  }

  return (
    <div className="border border-[#5FDA78] rounded-[30px] mt-10 p-5">
      <div className="flex justify-between mb-4">
        <h2 className="text-white font-semibold">Update Bank Info</h2>

        <button
          onClick={onCancel}
          className="w-6 h-6 text-white bg-red-500 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <input
            name="accountHolderName"
            value={form.accountHolderName}
            onChange={handleChange}
            placeholder="Account Holder Name"
            maxLength={100}
            className={`p-2 rounded bg-[#1f003d] text-white border ${errors.accountHolderName ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.accountHolderName && <p className="text-xs text-red-500">{errors.accountHolderName}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            name="accountNumber"
            inputMode="numeric"
            value={form.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
            maxLength={20}
            className={`p-2 rounded bg-[#1f003d] text-white border ${errors.accountNumber ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.accountNumber && <p className="text-xs text-red-500">{errors.accountNumber}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            name="iban"
            value={form.iban}
            onChange={handleChange}
            placeholder="IBAN"
            maxLength={34}
            className={`p-2 rounded bg-[#1f003d] text-white border uppercase ${errors.iban ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.iban && <p className="text-xs text-red-500">{errors.iban}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Bank Address"
            maxLength={200}
            className={`p-2 rounded bg-[#1f003d] text-white border ${errors.address ? "border-red-500" : "border-gray-600"}`}
          />
          {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dob" className="text-sm text-[#EEEEEE]">
            Date of Birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={form.dob}
            max={maximumDob}
            onChange={handleChange}
            className={`p-2 rounded bg-[#1f003d] text-white border ${errors.dob ? "border-red-500" : "border-gray-600"} [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert`}
          />
          {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <select
            name="currency"
            className={`p-2 rounded bg-[#1f003d] text-white border ${errors.currency ? "border-red-500" : "border-gray-600"}`}
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="">Select</option>
            <option value="GBP">GBP (£) - British Pound</option>
          </select>
          {errors.currency && <p className="text-xs text-red-500">{errors.currency}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}
          className="bg-[#5FDA78] text-black font-semibold py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

export default UpdateBankInfo
