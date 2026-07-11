import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  style?: React.CSSProperties   // ✅ ADD THIS
}

const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  style
}: ButtonProps) => {

 const defaultClass =
  "text-[20px] z-100 text-[#330065] bg-[#5FDA78] hover:bg-[#4ecb68] transition-colors duration-300 ease-in-out rounded-[9.1875rem] text-center font-medium cursor-pointer flex items-center border border-[#5FDA78] justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#5FDA78] disabled:pointer-events-none";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultClass} ${className}`}
      style={style}   // ✅ APPLY STYLE
    >
      {children}
    </button>
  )
}

export default Button