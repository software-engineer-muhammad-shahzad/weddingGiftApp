"use client"

import React, { useState } from "react"
import { useUpdateBankInfo } from "../hooks/useUpdateBankInfo"
import { UpdateBankDetailsData } from "../types/UpdateBankDetails"

type Props = {
  data?: UpdateBankDetailsData
  onCancel: () => void
  onSuccess?: () => void
}

const UpdateBankInfo = ({ data, onCancel ,onSuccess}: Props) => {
  const [form, setForm] = useState<UpdateBankDetailsData>({
    accountHolderName: data?.accountHolderName || "",
    iban: data?.iban || "",
    accountNumber: data?.accountNumber || "",
    address: data?.address || "",
    currency: data?.currency || "",
  })

  const { updateBankData, isLoading } = useUpdateBankInfo()
  const [currency, setCurrency] = useState(form.currency);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setCurrency(e.target.value);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ✅ PASS INTERFACE TYPE DIRECTLY
  const handleSubmit = async () => {
    try {
      form.currency = currency;
      await updateBankData(form)  
       onSuccess?.()  // 👈 UpdateBankDetailsData used here
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

      {/* FORM */}
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