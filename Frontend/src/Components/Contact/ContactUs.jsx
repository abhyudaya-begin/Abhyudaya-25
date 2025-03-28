import React, { useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/Logo-images/logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_BACKEND_API_URL}verify/contact`;
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      toast.success("Your query has been submitted!");
    } catch (e) {
      toast.error("Error reaching the team!");
    } finally {
      setLoading(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: ""
      });
    }


  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen    bg-[#120c0f] flex items-center justify-center p-2 md:p-12 lg:p-16 xl:p-24">
      <div className="w-full  mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-24 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#2d1b42]  p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 sm:mb-8 text-center tracking-wider">
  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text font-[Dancing Script] text-6xl sm:text-7xl">G</span>
  <span className="text-yellow-400 font-[Lobster] rotate-6 inline-block">E</span>
  <span className="text-green-400 font-[Pacifico] italic">T </span>
  
  <span className="mx-2 text-cyan-400 font-[Dancing Script] text-5xl">I</span>
  <span className="text-red-500 font-[Lobster] scale-110 inline-block">N </span>
  
  <span className="text-blue-500 font-[Pacifico] tracking-widest"> T</span>
  <span className="text-orange-500 font-[Dancing Script] text-5xl">O</span>
  <span className="text-purple-400 font-[Lobster] italic">U</span>
  <span className="text-yellow-500 font-[Pacifico] skew-x-6">C</span>
  <span className="text-green-500 font-[Dancing Script] underline">H</span>

  <br />
  
  <span className="text-pink-400 font-[Lobster]">W</span>
  <span className="text-blue-400 font-[Pacifico] text-5xl">I</span>
  <span className="text-orange-400 font-[Dancing Script] tracking-wide">T</span>
  <span className="text-red-400 font-[Lobster]">H</span>
  
  <span className="ml-2 text-cyan-500 font-[Dancing Script] animate-pulse text-6xl">U</span>
  <span className="text-yellow-500 font-[Lobster] rotate-12 inline-block">S</span>
</h1>

          <div className="relative flex items-center justify-center w-60 h-60 sm:w-100 sm:h-100 md:w-60 md:h-60 lg:w-100 lg:h-100">
            <img
              src={logo}
              alt="Abhyudaya Logo"
              className="absolute w-full h-full object-contain"
            />
          </div>

          <div className="flex pt-4 flex-col items-center gap-4 sm:gap-6">
            <div className="flex items-center w-full">
              <hr className="flex-grow border-t border-white" />
              <p className="text-white text-center text-lg sm:text-xl mx-4"></p>
              <hr className="flex-grow border-t border-white" />
            </div>

            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center mt-4 ">
              <a
                href="https://www.instagram.com/Abhyudaya.mmmut/"
                className="floating-animation flex items-center gap-2 sm:gap-3 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg min-w-[140px] sm:min-w-[160px] text-sm sm:text-base bg-[#E4405F] hover:bg-[#D92D52]"
                target="_blank"
              >
                <FaInstagram className="text-xl sm:text-2xl flex-shrink-0" />
                <span className="whitespace-nowrap font-semibold tracking-wide text-white">
                  Instagram
                </span>
              </a>

              <a
                href="https://whatsapp.com/channel/0029VaGSSJQGJP8AijZRD62j"
                className="floating-animation flex items-center gap-2 sm:gap-3 bg-[#25D366] text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg min-w-[140px] sm:min-w-[160px] text-sm sm:text-base hover:bg-[#1EBE5C]"
                target="_blank"
              >
                <FaWhatsapp className="text-xl sm:text-2xl flex-shrink-0" />
                <span className="whitespace-nowrap font-semibold tracking-wide text-white">
                  WhatsApp
                </span>
              </a>
            </div>

            <div className="flex flex-col items-center text-white mt-3 sm:mt-4">
              <a
                href="https://www.instagram.com/thefriendlycouch"
                className="hover:text-[#F77737] transition-all duration-300"
              >
                Team Abhyudaya
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-[#F7FAFC] to-[#E2E8F0] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center border border-[#A076C5] shadow-lg">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3E1F47] mb-3 sm:mb-4">
              CONTACT US
            </h2>
            <p className="text-gray-600">
              Fill up the form below to send us a message.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-gray-600 mb-1 sm:mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A076C5] placeholder-gray-500 text-gray-900 transition-shadow duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@mail.com"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A076C5] placeholder-gray-500 text-gray-900 transition-shadow duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 sm:mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98476543XX"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A076C5] placeholder-gray-500 text-gray-900 transition-shadow duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 sm:mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A076C5] placeholder-gray-500 text-gray-900 transition-shadow duration-300"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="cursor-pointer bg-gradient-to-r from-[#FF512F] to-[#DD2476] w-full py-4 sm:py-4 px-4 text-white font-bold text-lg sm:text-xl no-underline rounded-full transition-all duration-300 hover:from-[#E0432F] hover:to-[#C72064] hover:scale-102 hover:shadow-lg"
                disabled={loading}
              >
               {loading ? "Loading...": "SEND MESSAGE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
