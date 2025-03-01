import React, { useState } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#120c0f] flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-24">
      <div className="w-full max-w-6xl mx-12 sm:mx-16 md:mx-24 lg:mx-32 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-purple-900 p-8 md:p-12 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-8">GET IN TOUCH WITH US</h1>
          
          <div className="w-64 h-64 mb-8">
            <img 
              src="https://vvlelkzbqhcamsmkhteb.supabase.co/storage/v1/object/sign/chandan-project/Screenshot%202025-02-18%20023642.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjaGFuZGFuLXByb2plY3QvU2NyZWVuc2hvdCAyMDI1LTAyLTE4IDAyMzY0Mi5wbmciLCJpYXQiOjE3Mzk4MjcxNDQsImV4cCI6MTg5NzUwNzE0NH0.j-Y34FTdzu8Uf0VWMYgGZaordUOgKxwl3RVZWNXiTEU"
              alt="Contact Illustration"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-6">
            <p className="text-white text-center text-xl">___________________  OR   ___________________</p>
            
            <div className="flex gap-4 flex-wrap justify-center">
              <a 
                href="https://www.instagram.com/thefriendlycouch"
                className="floating-animation flex items-center gap-3 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-lg min-w-[160px] text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(45deg, rgb(64, 93, 230), rgb(88, 81, 219), rgb(131, 58, 180), rgb(193, 53, 132), rgb(225, 48, 108), rgb(253, 29, 29))',
                  transform: 'translateY(0.188491rem) scaleY(0.999996) scaleX(1)'
                }}
              >
                <FaInstagram className="text-2xl sm:text-3xl flex-shrink-0" />
                <span className="whitespace-nowrap font-semibold tracking-wide text-white">Instagram</span>
              </a>
              
              <a 
                href="https://wa.me/919205025183"
                className="floating-animation flex items-center gap-3 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg min-w-[160px] text-sm sm:text-base"
              >
                <FaWhatsapp className="text-2xl sm:text-3xl flex-shrink-0" />
                <span className="whitespace-nowrap font-semibold tracking-wide text-white">WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-col items-center text-white mt-4">
              <a href="https://www.instagram.com/thefriendlycouch" className="hover:text-purple-300">
                Team Abhyudaya
              </a>
              <a href="https://wa.me/919205025183" className="hover:text-green-300">
                +91 999999XXXX
              </a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">CONTACT US</h2>
            <p className="text-gray-600">Fill up the form below to send us a message.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@mail.com"
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98476543XX"
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-gray-900"
                required
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-purple-700 md:w-[60%] w-[50%] md:py-5 px-4 py-6 text-white no-underline rounded-full transition-all duration-300 hover:bg-purple-800 hover:text-purple-200"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs; 