import React from "react"

interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  name?: string
  id?: string
  className?: string
  containerClassName?: string
  specialGradient?: boolean
  maxLength?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  paddingClass?: string
}

const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  id,
  className = "",
  containerClassName = "",
  specialGradient = false,
  maxLength,
  value,
  onChange,
  onPaste,
  onKeyDown,
  paddingClass = "",
}: InputProps) => {
  const defaultInputClass =
    "border-none outline-none font-normal text-[#989898] placeholder:text-[#989898] text-sm bg-transparent w-full"

  const defaultContainerClass =
    "border border-[#5FDA78] rounded-[147px]  "

  const gradientStyle: React.CSSProperties = {
    background: `
      radial-gradient(38.46% 38.46% at 11.54% 19.23%, 
        rgba(255, 235, 255, 0) 0%, 
        rgba(230, 255, 240, 0) 70%, 
        rgba(240, 240, 255, 0) 100%
      ),
      linear-gradient(316.97deg, 
        rgba(255, 255, 255, 0.044) 17.24%, 
        rgba(255, 255, 255, 0) 58.62%, 
        rgba(217, 235, 255, 0) 86.21%
      ),
      linear-gradient(0deg, 
        rgba(0, 0, 0, 0.066) 0%, 
        rgba(0, 0, 0, 0.022) 30%, 
        rgba(0, 0, 0, 0) 70%, 
        rgba(0, 0, 0, 0) 100%
      ),
      linear-gradient(0deg, 
        rgba(255, 255, 255, 0.01), 
        rgba(255, 255, 255, 0.01)
      )
    `,
    boxShadow: `
      0px 0px 1.5px 0px #FF264000 inset,
      0px 0px 1.5px 0px #2673FF00 inset,
      0px 1.5px 3.33px 0px #FFFFFF19 inset,
      0px 0px 8px 0px #D1E5FF00 inset,
      0px 3px 12px -3px #00000026,
      0px 10px 28px -6px #00000040,
      0px 0px 45px 0px #FFFFFF05
    `,
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
  }

  return (
    <div
      className={`${containerClassName || defaultContainerClass}`}
      style={specialGradient ? gradientStyle : {}}
    >
      <div className={`py-2 md:py-3 px-5 md:px-6 flex flex-col gap-1 ${paddingClass}`}>
        {label && (
          <label htmlFor={id} className="text-white  text-[14px]">
            {label}
          </label>
        )}

        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={className || defaultInputClass}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  )
}

export default Input