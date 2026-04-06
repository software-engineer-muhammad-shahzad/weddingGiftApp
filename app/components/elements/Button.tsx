import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false 
}: ButtonProps) => {
  const defaultClass = "text-[20px] w-full h-14 text-center font-medium bg-[#5FDA78] text-[#330065] rounded-[60px]"
  const buttonClass = className || defaultClass
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  )
}

export default Button
