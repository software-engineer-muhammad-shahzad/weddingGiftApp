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
    bsb: data?.bsb || "",
    accountNumber: data?.accountNumber || "",
    bankName: data?.bankName || "",
  })

  const { updateBankData, isLoading } = useUpdateBankInfo()

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
          name="bsb"
          value={form.bsb}
          onChange={handleChange}
          placeholder="BSB"
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
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
          className="p-2 rounded bg-[#1f003d] text-white border border-gray-600"
        />

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