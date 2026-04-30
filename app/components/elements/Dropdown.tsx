import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface DropdownProps {
  options: string[]
  placeholder?: string
  label?: string
  value?: string
  onChange?: (value: string) => void
  containerClassName?: string
  triggerClassName?: string
  dropdownClassName?: string
  optionClassName?: string
  labelClassName?: string
}

const Dropdown = ({ 
  options, 
  placeholder = "Select an option", 
  label, 
  value, 
  onChange, 
  containerClassName = "",
  triggerClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  labelClassName = ""
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleSelect = (option: string) => {
    setSelectedValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {label && (
        <label className={`block text-white text-sm mb-2 ${labelClassName}`}>{label}</label>
      )}
      
      <div 
        className={`w-full px-4 py-3 bg-transparent border border-[#5FDA78] rounded-[30px] text-white cursor-pointer flex items-center justify-between ${triggerClassName}`}
        onClick={toggleDropdown}
      >
        <span className={`${!selectedValue ? 'text-gray-400' : 'text-white'}`}>
          {selectedValue || placeholder}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
            <ChevronDown 
              size={16} 
              className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 bg-[#330065] border border-[#5FDA78] rounded-[20px] z-50 max-h-60 overflow-y-auto ${dropdownClassName}`}
             style={{
               scrollbarWidth: 'none', /* Firefox */
               msOverflowStyle: 'none', /* Internet Explorer 10+ */
             }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-3 text-white hover:bg-[#5FDA78]/20 cursor-pointer transition-colors ${optionClassName}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
