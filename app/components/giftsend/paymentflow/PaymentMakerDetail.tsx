"use client"
import { Download, Share2 } from "lucide-react"
import Button from "../../elements/Button"
import html2pdf from 'html2pdf.js'
import { useState, useEffect } from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

const PaymentMakerDetail = ({ }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // share handler
  const handleShare = async () => {
    const shareData = {
      title: "Shagun Direct - Payment Receipt",
      text: "Here is your payment receipt from Shagun Direct",
      url: window.location.href,
    };

    // Use native share on mobile devices
    if (isMobile && navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Content shared successfully");
      } catch (err) {
        console.log("Share cancelled or failed:", err);
        // Fallback to modal if native share fails
        setShowShareModal(true);
      }
    } else {
      // Desktop fallback - show modal
      setShowShareModal(true);
    }
  };

  const handleDownloadPDF = async () => {
    // Create the PDF content
    const paymentData = {
      senderName: "Ali Khan",
      accountNumber: "0333 3565432",
      amount: "300.50",
      fee: "1.00",
      date: "2 Feb, 2026 | 10:30 PM",
      transactionId: "019282011"
    }

    // Create PDF content
    const element = document.createElement('div')
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #330065; margin-bottom: 20px;">Shagun Direct - Payment Receipt</h2>
        <div style="margin-bottom: 15px;">
          <p><strong>Sender Name:</strong> ${paymentData.senderName}</p>
          <p><strong>Account Number:</strong> ${paymentData.accountNumber}</p>
          <p><strong>Amount:</strong> £${paymentData.amount}</p>
          <p><strong>Fee:</strong> £${paymentData.fee}</p>
          <p><strong>Date:</strong> ${paymentData.date}</p>
          <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
        </div>
      </div>
    `

    // Generate PDF
    const pdf = await html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `payment-receipt-${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 }
      })
      .save()

    // Clean up
    document.body.removeChild(element)
  }

  return (
    <>
      <div className="mt-6 p-4 glass-card border border-[#5FDA78] rounded-[20px]" style={{
      }}>

        <div className="relative">
          <div className="flex justify-between">
            <p className="text-[#B5B5B5] font-medium text-sm">Sender Name</p>
            <p className="text-white font-medium text-sm">Ali Khan</p>
          </div>
          <div className="flex justify-between pb-4">

            <p className="text-[#B5B5B5] font-medium text-sm">Account Number</p>
            <p className="text-white font-medium text-sm">0333 3565432</p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px 
        bg-linear-to-r from-[#30114E] via-white to-[#30114E]" />

        </div>
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-[#B5B5B5] font-medium text-sm">Sender Name</p>
            <p className="text-white font-medium text-sm">Ali Khan</p>
          </div>
          <div className="flex justify-between ">

            <p className="text-[#B5B5B5] font-medium text-sm">Account Number</p>
            <p className="text-white font-medium text-sm">0333 3565432</p>
          </div>
        </div>


      </div>

      {/* download and share button */}
      <div className="flex mt-4 gap-4 overflow-hidden">
        <Button
          type="download"
          className="border glass-card border-[#5FDA78] py-4 w-6 rounded-full h-6 flex items-center justify-center"
          onClick={handleShare}
        >
          <Share2 className="text-white" />
        </Button>
        <Button
          type="download"
          className="border glass-card border-[#5FDA78] py-4 w-6 rounded-full h-6 flex items-center justify-center"
          onClick={handleDownloadPDF}
        >
          <Download className="text-white " />
        </Button>
      </div>
      {/* done button */}
      <Button className="bg-[#5FDA78] mt-5 py-3! rounded-full w-full">Done</Button>

      {/* Desktop Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="bg-[#5FDA78] rounded-xl p-5 w-[300px]"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <h2 className="text-[#330065] font-semibold mb-4 text-center">
              Share Invoice
            </h2>

            <div className="flex justify-center gap-4">
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            </div>

            {/* Copy link */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className="mt-4 w-fit text-[#330065] border-b border-transparent  hover:border-b-[#330065] cursor-pointer text-sm text-center"
              >
                Copy Link
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setShowShareModal(false)}
                className="mt-2 w-fit text-gray-500 cursor-pointer border-b border-transparent  hover:border-b-[#726a82] text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentMakerDetail