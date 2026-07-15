import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import { EyeIcon, EyeOffIcon } from "@/app/components/icons/Icons"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  containerClassName?: string
  paddingClass?: string
  labelColor?: string
  register?: UseFormRegisterReturn
  showPassword?: boolean
  onTogglePasswordVisibility?: () => void
  error?: string
}

const Input = ({
  label,
  type = "text",
  id,
  className = "",
  containerClassName = "",
  paddingClass = "",
  labelColor = "",
  register,
  showPassword = false,
  onTogglePasswordVisibility,
  error,
  ...inputProps
}: InputProps) => {
  const defaultInputClass =
    "border-none outline-none font-normal text-[#989898] placeholder:text-[#989898] text-sm bg-transparent w-full"

  const defaultContainerClass = `border ${error ? "border-red-500" : "border-[#5FDA78]"} rounded-[147px] glass-card`

  const isPasswordField = type === "password"
  const inputType = isPasswordField && showPassword ? "text" : type

  return (
    <div className={`${containerClassName || defaultContainerClass}`}>
      <div className={`py-2 md:py-3 px-5 md:px-6 flex flex-col gap-1 ${paddingClass}`}>
        {label && (
          <label htmlFor={id} className={`${labelColor} text-white text-[14px]`}>
            {label}
          </label>
        )}

        <div className="flex items-center gap-2">
          <input
            {...(register ?? {})}
            {...inputProps}
            type={inputType}
            id={id}
            className={className || defaultInputClass}
          />

          {isPasswordField && onTogglePasswordVisibility && (
            <button
              type="button"
              onClick={onTogglePasswordVisibility}
              className="flex items-center justify-center text-[#989898] hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Input