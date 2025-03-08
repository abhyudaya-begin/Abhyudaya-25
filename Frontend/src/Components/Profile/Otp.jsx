import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Otp({ props, onClose }) {
  const { email, setVerified } = props;
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Set up timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Ensure only one character
    setOtp(newOtp);
    
    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key press for backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}verify/email`,
        { 
          email, 
          otp: otpString 
        },
        {
          withCredentials: true,
        }
      );
      
      toast.success("Email verified successfully!");
      setVerified(true);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.errorMessage || "Invalid OTP");
    }
  };

  // Handle OTP resend
  const resendOtp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}verify/email`,
        { email },
        {
          withCredentials: true,
        }
      );
      
      setTimer(60);
      setCanResend(false);
      toast.success("OTP resent successfully");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-10 z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-96 max-w-full shadow-xl border border-white/20">
        <h2 className="text-2xl text-white font-bold mb-4 text-center">
          Email Verification
        </h2>
        <p className="text-white/70 mb-4 text-center">
          Enter the 4-digit code sent to<br />
          <span className="font-semibold text-white">{email}</span>
        </p>
        
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 h-12 text-center text-xl font-bold bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              maxLength={1}
            />
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={verifyOtp}
            className="w-full p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-pink-600 hover:to-purple-600 transition cursor-pointer"
          >
            Verify OTP
          </button>
          
          {canResend ? (
            <button
              onClick={resendOtp}
              className="w-full p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-white/70 text-center">
              Resend OTP in {timer} seconds
            </p>
          )}
          
          <button
            onClick={onClose}
            className="w-full p-2 rounded-lg bg-transparent text-white/70 hover:text-white border border-white/20 hover:bg-white/10 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp;