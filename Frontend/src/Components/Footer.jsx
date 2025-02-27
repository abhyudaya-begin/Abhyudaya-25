import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBriefcase,
} from "react-icons/fa";
import logo from "../assets/Logo-images/Abhyudaya.png";
import hindiLogo from "../assets/Logo-images/White_logo.png";

const Footer = ({ isSidebarOpen }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [iconSize, setIconSize] = useState(20);
  const [iconSpacing, setIconSpacing] = useState("space-x-4");
  const [sidebarMargin, setSidebarMargin] = useState("");
  const [mapWidth, setMapWidth] = useState("w-full"); // Default full width
  const [containerPadding, setContainerPadding] = useState("px-4"); // Default padding

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsSmallScreen(width < 640);
      setIsMediumScreen(width >= 640 && width < 1024);

      // Adjust icon size and spacing based on width
      if (width < 640) {
        setIconSize(20);
        setIconSpacing("space-x-4");
      } else if (width >= 640 && width < 1024) {
        setIconSize(18);
        setIconSpacing("space-x-3");
      } else {
        setIconSize(20);
        setIconSpacing("space-x-4");
      }

      // Adjust sidebar margin based on width and sidebar state
      if (width >= 1024 && isSidebarOpen) {
        setSidebarMargin("lg:ml-64");
      } else if (width >= 768 && isSidebarOpen) {
        setSidebarMargin("md:ml-80 ");
      } else {
        setSidebarMargin("ml-0");
      }

      // Adjust map width
      if (width >= 760 && width < 1024) {
        setMapWidth("w-[85%]"); // Reduce map width
        setContainerPadding("px-8 md:px-10 lg:px-14"); // Increase right padding
      } else {
        setMapWidth("w-full"); // Default full width
        setContainerPadding("px-4"); // Reset padding
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  const contacts = [
    {
      name: "Alex Wilson",
      email: "alex@example.com",
      phone: "+123 456 7895",
      role: "Joint Secretary",
    },
    {
      name: "Sarah Brown",
      email: "sarah@example.com",
      phone: "+123 456 7896",
      role: "Joint Secretary",
    },
    {
      name: "David Lee",
      email: "david@example.com",
      phone: "+123 456 7897",
      role: "Sponsorship Head",
    },
    {
      name: "Lisa Chen",
      email: "lisa@example.com",
      phone: "+123 456 7898",
      role: "PR Head",
    },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`w-full bg-gradient-2 text-background-light pt-8 pb-4 px-4 mt-auto relative transition-all duration-300 ease-in-out border-t border-primary-orange/30 ${sidebarMargin}`}
    >
      <div
        className="flex flex-col md:flex-row max-w-full gap-6 
        md:gap-4 lg:gap-6 xl:gap-8 
        md:pl-[30px] md:pr-[15px] lg:pl-[50px] lg:pr-[25px] xl:pl-[60px] xl:pr-[30px]"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center md:w-[15%] lg:w-[12%] xl:w-[14%]">
          <img
            src={logo}
            alt="Logo"
            onClick={handleScrollToTop}
            className="w-20 md:w-14 lg:w-18 xl:w-20 h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
          <img
            src={hindiLogo}
            alt="Hindi Logo"
            className="w-120 md:w-82 lg:w-88 xl:w-90 h-auto object-contain "
          />
        </div>

        {/* Icons and Address Section */}
        <div className="flex flex-col items-center md:w-[25%] lg:w-[19%] xl:w-[20%]">
          <div
            className={`flex items-center justify-center ${iconSpacing} 
            mt-8 md:mt-6 lg:mt-12 mb-4 md:mb-4 lg:mb-8`}
          >
            <a
              href="https://www.facebook.com/abhyudaya.mmmut/"
              className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaFacebookF size={iconSize} />
            </a>
            <a
              href="https://www.instagram.com/abhyudaya.mmmut/?hl=en"
              className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaInstagram size={iconSize} />
            </a>
            <a
              href="https://www.youtube.com/@abhyudayammmut1045"
              className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-red-500 to-red-700 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaYoutube size={iconSize} />
            </a>
            <a
              href="https://www.youtube.com/@abhyudayammmut1045"
              className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-500 to-blue-700 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaLinkedinIn size={iconSize} />
            </a>
            <a
              href="mailto:abhyudayammmut@gmail.com"
              className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-yellow-400 to-red-500 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaEnvelope size={iconSize} />
            </a>
          </div>
          <div className="w-full text-center bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm p-3 rounded-lg border border-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <h3 className="font-bold text-base mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
              Find Us Here! 🎯
            </h3>
            <div className="space-y-1">
              <p className="text-xs font-medium text-white/90 hover:text-white transition-colors">
                Madan Mohan Malaviya University of Technology
              </p>
              <p className="text-xs font-medium text-white/80 hover:text-white transition-colors">
                Deoria Road, Gorakhpur ✨
              </p>
              <p className="text-xs font-medium text-white/80 hover:text-white transition-colors">
                Uttar Pradesh - 273010 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex flex-col md:w-[28%] lg:w-[31%] xl:w-[32%]">
          <div className="rounded-lg overflow-hidden flex-1 h-[250px] md:h-[240px] lg:h-[250px]">
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1791.2985797825392!2d83.4331276!3d26.7314295!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915ca3e2aa136b%3A0xc039bdf0211338a9!2sMMM%20University%20of%20Technology!5e0!3m2!1sen!2sin!4v1710001234567"
  className="w-full h-[250px] md:h-[240px] lg:h-[250px] rounded-xl shadow-lg"
  style={{ border: 0 }}
  allowFullScreen=""
  referrerPolicy="no-referrer-when-downgrade"
></iframe>


          </div>
        </div>

        {/* Contact Cards Section */}
        <div
          className="flex flex-col md:w-[28%] lg:w-[31%] xl:w-[32%]
          md:pr-[15px] lg:pr-[30px] xl:pr-[40px]"
        >
          <div className="grid grid-cols-2 gap-2 md:gap-2 lg:gap-3 w-full h-[250px] md:h-[240px] lg:h-[250px]">
            {contacts.map((person, index) => (
              <div
                key={index}
                className={`text-center flex flex-col items-center justify-between bg-white/5 backdrop-blur-sm p-2 md:p-2 lg:p-3 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/20`}
              >
                <div>
                  <p className="font-semibold text-sm md:text-xs lg:text-sm mb-1">
                    {person.name}
                  </p>
                  <p className="text-xs md:text-[10px] lg:text-xs text-gray-400 mb-2">
                    {person.role}
                  </p>
                </div>

                <div className="w-full flex items-center justify-center gap-4">
                  {/* Email Icon */}
                  <a
                    href={`mailto:${person.email}`}
                    className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110 transition-all hover:shadow-glow p-1"
                  >
                    <FaEnvelope size={iconSize} />
                  </a>

                  {/* Phone Icon */}
                  <a
                    href={`tel:${person.phone}`}
                    className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110 transition-all hover:shadow-glow p-1"
                  >
                    <FaPhone size={iconSize} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 pt-4 border-t border-white/20 text-sm text-primary-softGold">
        <p>
          © {new Date().getFullYear()} Abhyudaya MMMUT. All rights reserved.
        </p>
        <p className="mt-1">An Enigmatic Ensemble</p>
      </div>
    </footer>
  );
};

export default Footer;
