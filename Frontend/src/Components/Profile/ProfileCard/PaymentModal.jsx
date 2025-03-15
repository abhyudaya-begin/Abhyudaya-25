import React, { useState } from "react";
import toast from "react-hot-toast";
import { IndianRupee } from "lucide-react";

const getQRCodeImage = (amount) => {
  const validAmounts = amount % 50 === 0 && amount <= 1500;
  if (!validAmounts) return `/Payments/generic_123_alpha.png`;
  return `/Payments/generic_${amount}_beta.jpg`;
};

const PaymentModal = ({ amount, isOpen, onClose, onSubmit }) => {
  const [transactionId, setTransactionId] = useState("");

  const qrCodeImage = getQRCodeImage(amount);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !transactionId.trim() ||
      transactionId.length !== 12 ||
      !/^\d{12}$/.test(transactionId) ||
      isNaN(transactionId)
    ) {
      toast.error("Transaction ID must be exactly 12 digits.");
      return;
    }
    onSubmit(transactionId); // Send transaction ID to parent
    setTransactionId(""); // Reset input
    onClose(); // Close modal
  };

  if (!isOpen) return null; // Do not render if not open

  return (
    <div className="fixed inset-0 z-100 bg-opacity-70 flex justify-center items-center backdrop-blur-2xl h-screen">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg md:text-3xl flex items-center justify-center text-center text-blue-500 font-semibold mb-4">
          Scan & Pay <IndianRupee/> {amount}
        </h2>

        {/* QR Code Image */}
        <div className="flex justify-center">
          <img src={qrCodeImage} alt="QR Code" className="w-[60%] h-full pointer-events-none rounded-xl" />
        </div>

        {/* Download QR Code Button */}
        <div className="flex justify-center mt-2">
          <a
            href={qrCodeImage}
            download="QR_Code.png"
            className="bg-gray-800 text-black px-3 py-1 rounded-md text-sm hover:bg-gray-900 transition"
          >
            Download QR Code
          </a>
        </div>

        {/* Input for Transaction ID */}
        <div className="mt-4">
          <label className="block text-sm font-medium">
            Please enter the UPI Transaction ID:
          </label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter UPI transaction ID"
            required
          />
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <form action="">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
