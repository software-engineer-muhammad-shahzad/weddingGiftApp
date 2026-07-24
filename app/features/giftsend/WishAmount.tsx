interface WishAmountProps {
  amount: string
  setAmount: (value: string) => void
  currency: string
  wishingCardAmount?: number
  wishingVideoAmount?: number
}

/** Allow left-to-right decimal entry, max 2 digits after the point. */
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

          <div className="flex justify-center">
            <div className="inline-flex items-baseline justify-center gap-1">
              <input
                type="text"
                inputMode="decimal"
                placeholder="00.00"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                onBlur={handleAmountBlur}
                size={Math.max((amount || "00.00").length, 5)}
                className="bg-transparent border-none outline-none text-right font-semibold text-[50px] py-2 text-white placeholder:text-gray-600 min-w-0"
              />
              {currency ? (
                <span className="shrink-0 font-semibold text-lg md:text-xl text-white leading-none">
                  {currency}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="w-full h-px my-6 bg-linear-to-r from-[#00114E] via-white to-[#00114E]" />

        <p className="text-white text-center text-lg md:text-xl font-normal px-4 pb-2">
          Your Total is {currency} {total.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default WishAmount
