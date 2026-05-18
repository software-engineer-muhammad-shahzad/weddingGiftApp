import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  containerClassName?: string
  paddingClass?: string
  labelColor?: string
  register?: UseFormRegisterReturn
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
  ...inputProps
}: InputProps) => {
  const defaultInputClass =
    "border-none outline-none   font-normal text-[#989898] placeholder:text-[#989898] text-sm bg-transparent w-full"

  const defaultContainerClass =
    "border border-[#5FDA78] rounded-[147px] glass-card"

  // const gradientStyle: React.CSSProperties = {
  //   background: 'glass-card'
  // }

  return (
    <div
      className={`${containerClassName || defaultContainerClass}`}
      
    >
      <div className={`py-2 md:py-3 px-5 md:px-6 flex  flex-col gap-1 ${paddingClass}`}>
        {label && (
          <label htmlFor={id} className={ `${labelColor} text-white  text-[14px]`}>
            {label}
          </label>
        )}

        <input
          {...(register ?? {})}
          {...inputProps}
          type={type}
          id={id}
          className={className || defaultInputClass}
        />
      </div>
    </div>
  )
}

export default Input