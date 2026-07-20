import Input from "../../components/elements/Input"

interface WishAmountProps {
  amount: string
  setAmount: (value: string) => void
  currency: string
  wishingCardAmount?: number
  wishingVideoAmount?: number
}

const sanitizeAmountInput = (value: string) => {
  if (!value) return ""

  let sanitized = value.replace(/[^\d.]/g, "")

  const dotIndex = sanitized.indexOf(".")
  if (dotIndex !== -1) {
    const whole = sanitized.slice(0, dotIndex)
    const fraction = sanitized.slice(dotIndex + 1).replace(/\./g, "").slice(0, 2)
    sanitized = `${whole}.${fraction}`
  }

  if (sanitized.startsWith(".")) {
    sanitized = `0${sanitized}`
  }

  return sanitized
}

const WishAmount = ({
  amount,
  setAmount,
  currency,
  wishingCardAmount = 0,
  wishingVideoAmount = 0,
}: WishAmountProps) => {
  const handleAmountChange = (value: string) => {
    setAmount(sanitizeAmountInput(value))
  }

  const handleAmountBlur = () => {
    if (!amount || amount === ".") {
      setAmount("")
      return
    }

    const parsedAmount = Number.parseFloat(amount)
    if (!Number.isNaN(parsedAmount)) {
      setAmount(parsedAmount.toFixed(2))
    }
  }

  const giftAmount = Number.parseFloat(amount) || 0
  const addonAmount = wishingCardAmount + wishingVideoAmount
  const total = giftAmount + addonAmount

  return (
    <div>
      <div className="flex flex-col px-4 glass-card pt-8 pb-8 md:pb-10 border border-[#5FDA78] rounded-[20px]">
        <div className="px-4">
          <p className="text-white text-start text-md pb-2">
            Enter Amount
          </p>

          <Input
            type="text"
            inputMode="decimal"
            placeholder={`00.00 ${currency}`}
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            onBlur={handleAmountBlur}
            containerClassName="border-none"
            className="text-center font-semibold text-[50px] py-2 outline-none w-full text-white placeholder:text-gray-600"
          />
        </div>

        <div className="w-full h-px my-6 bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />

        <p className="text-white text-center text-lg md:text-xl font-normal px-4 pb-2">
          Your Total is {total.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default WishAmount
