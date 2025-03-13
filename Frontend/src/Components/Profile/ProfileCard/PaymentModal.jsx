import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen]);
  const handleSubmit = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a valid Transaction ID");
      return;
    }
    onSubmit(transactionId); // Send transaction ID to parent
    setTransactionId(""); // Reset input
    onClose(); // Close modal
  };

  if (!isOpen) return null; // Do not render if not open

  return (
    <div  className="fixed  inset-0 z-100 bg-opacity-70 flex justify-center items-center backdrop-blur-2xl h-screen  ">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96  ">
        <h2 className="text-lg md:text-3xl text-center  text-blue-500 font-semibold mb-4">Scan & Pay</h2>

        {/* QR Code (Replace with actual QR code image) */}
        <div className="flex justify-center">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SamplePaymentQR"
            alt="QR Code"
            className="w-40 h-40"
          />
        </div>

        {/* Input for Transaction ID */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Please enter the Transaction ID:</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter transaction ID"
            required
          />
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
