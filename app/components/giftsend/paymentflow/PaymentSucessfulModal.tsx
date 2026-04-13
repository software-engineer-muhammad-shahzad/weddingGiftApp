"use client"
import ModalLayer from "../../ui/ModalLayer"
import PaymentSucessfull from "./PaymentSucessfull"

interface PaymentSucessfulModalProps {
  showPaymentSuccess: boolean
  setShowPaymentSuccess: (value: boolean) => void
}

const PaymentSucessfulModal = ({ showPaymentSuccess, setShowPaymentSuccess }: PaymentSucessfulModalProps) => {
  const handleClose = () => {
    setShowPaymentSuccess(false)
  }

  if (!showPaymentSuccess) return null

  return (
    <ModalLayer 
      onClose={handleClose}
      modalHeight="h-full md:max-h-[400px]"
      modalWidth="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[400px]"
      overlayColor="bg-[#171515EB] "
    >
      <div 
        className="bg-[#330065] h-[400px] md:h-[500px] w-full p-3 sm:p-4 md:p-6 flex flex-col items-center overflow-y-auto" 
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* Internet Explorer 10+ */
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Safari and Chrome */
          }
        `}</style>
        <PaymentSucessfull />
      </div>
    </ModalLayer>
  )
}

export default PaymentSucessfulModal