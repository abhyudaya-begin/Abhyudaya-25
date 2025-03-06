import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Otp = ({ props}) => {
  const {setShowOtp, showOtp, email, setVerified} = props;
  const [otp, setOtp] = useState(new Array(4).fill(''));
  const otpRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // console.log(email);

  // Handle OTP Input
  const handleChange = (element, index) => {
    if (!/^\d$/.test(element.value)) return;
    
    setOtp((prevOtp) => prevOtp.map((d, idx) => (idx === index ? element.value : d)));

    // Move focus to next input
    if (element.nextSibling) element.nextSibling.focus();
  };

  // Close OTP Modal on Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (otpRef.current && !otpRef.current.contains(event.target)) {
        setOtp(new Array(4).fill(''));
        setShowOtp(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowOtp]);

  // OTP Verification Handler
  const verifyHandler = async () => {
    const otpByUser = otp.join('');

    if (otpByUser.length < 4) {
      toast.error("Please fill in all the OTP fields!");
      return;
    }

    setLoading(true);
    
    try {
     
      const data={email:email,otp:otpByUser}
      console.log(data);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}verify/verify`,
        data

      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setVerified(true);
        setShowOtp(false);
      }
    } catch (error) {
    console.log(error);
    
      toast.error("Incorrect OTP entered");
      setOtp(new Array(4).fill(''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showOtp && (
  <div
    ref={otpRef}
    className="relative w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg z-30"
  >
    {/* Title */}
    <h1 className="text-gray-800 font-semibold text-xl text-center">
      Please enter the OTP sent to your email:
    </h1>

    {/* Image */}
    <div className="flex justify-center my-4">
      <img
        src="/assets/Logo-images/Abhyudaya.png"
        alt="OTP"
        className="h-24 w-auto"
        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/100")}
      />
    </div>

    {/* OTP Inputs */}
    <div className="flex justify-center gap-2 my-4">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>

    {/* Verify Button */}
    <button
      onClick={verifyHandler}
      disabled={loading}
      className="w-full py-3 text-white font-semibold text-lg bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 disabled:bg-gray-400"
    >
      {loading ? "Verifying..." : "Verify"}
    </button>
  </div>
)}
</>
  );
} 

export default Otp;