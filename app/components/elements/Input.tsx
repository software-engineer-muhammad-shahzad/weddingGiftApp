

import React from 'react'

interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  name?: string
  id?: string
  className?: string
  containerClassName?: string
  specialGradient?: boolean
  maxLength?:number
    value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  
}

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  name, 
  id, 
  className = '', 
  containerClassName = '',
  specialGradient = false ,
  maxLength,
  value,
  onChange,
  onPaste,
  onKeyDown,
}: InputProps) => {
  const defaultInputClass = "border-none outline-none text-[#989898] text-sm bg-transparent"
  const defaultContainerClass = "border border-[#5FDA78] rounded-[147px]"
  
  const inputClass = className || defaultInputClass
  const containerClass = containerClassName || defaultContainerClass
  
  const gradientStyle = {
    background: `radial-gradient(ellipse at center, 
                rgb(48,19,79) 70%,        /* main dark center */
                rgba(48,19,79,0.8) 80%,   /* fade starts */
                rgba(48,19,79,0.4) 90%,   /* softer transition */
                rgba(255,255,255,0.1) 100%), /* light edges */
              linear-gradient(0deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))`
  }
  
  return (
    <div className={containerClass}   style={specialGradient ? gradientStyle : {}}>
      <div className="py-3 px-5 flex flex-col gap-1">
        <label htmlFor={id} className="text-white text-[14px]">{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={inputClass}
          maxLength={ maxLength}
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
