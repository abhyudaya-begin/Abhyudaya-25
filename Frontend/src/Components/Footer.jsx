import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

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
      // if (isSidebarOpen) {
      //   setSidebarMargin("pl-16");
      // } else {
      //   setSidebarMargin("pl-4");
      // }

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
      name: "Aryan Singh",
      email: "abhyudaya.mmmut@gmail.com",
      phone: "+91-9369756579",
      role: "Cultural Secretary",
    },
    {
      name: "Arsh Singh",
      email: "abhyudaya.mmmut@gmail.com",
      phone: "+91-7317439179",
      role: "Sponsorship Head",
    },
    {
      name: "Satish Kumar",
      email: "abhyudaya.mmmut@gmail.com",
      phone: "+123 456 7897",
      role: "Public Relations Head",
    },
    {
      name: "Pritish Tomar",
      email: "abhyudaya.mmmut@gmail.com",
      phone: "+919520405332",
      role: "Technical Lead",
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
      className={`w-full bg-gradient-2 text-background-light pt-8 pb-4 px-4 mt-auto lg:pl-20 md:pl-20 xl:pl-20 relative transition-all duration-300 ease-in-out  border-primary-orange/30 ${sidebarMargin} bg-gray-900`}
    >
      <div
        className="flex flex-col md:flex-row max-w-full gap-6 
        md:gap-4 lg:gap-6 xl:gap-8 
        md:pl-4 md:pr-4 lg:pl-4 lg:pr-4 xl:pl-4 xl:pr-4"
      >
        {/* YouTube Section */}
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="rounded-lg overflow-hidden flex-1 h-[250px] md:h-[240px] lg:h-[250px]">
          <iframe
  src="https://www.youtube.com/embed/5pzCzYzePjw"
  className="w-full h-[250px] md:h-[240px] lg:h-[250px] rounded-xl shadow-lg"
  style={{ border: 0 }}
  allow=" web-share; fullscreen"
  allowFullScreen={true}  
></iframe>


          </div>
        </div>

        {/* Map Section */}
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="rounded-lg overflow-hidden flex-1 h-[250px] md:h-[240px]  lg:h-[250px]">
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
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="grid grid-cols-2 gap-2 md:gap-2 lg:gap-3 w-full h-[250px] md:h-[240px] lg:h-[250px]">
            {contacts.map((person, index) => (
              <div
                key={index}
                className={`text-center flex flex-col items-center justify-between bg-white/5 backdrop-blur-sm p-2 md:p-2 lg:p-3 rounded-lg  hover:bg-white/10 transition-all duration-300 border border-white/20`}
              >
                <div>
                  <p className="font-semibold text-6 md:text-sm sm:text-8 lg:text-md mb-1 mt-2">
                    {person.name}
                  </p>
                  <p className="text-5 md:text-xs lg:text-sm sm:text-6 text-gray-400 mb-2">
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
                    <FaPhone size={17}  />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="flex sm:justify-between justify-center gap-3 items-center mt-8 pt-4 border-t border-white/20 text-sm text-primary-softGold flex-wrap">
        <div className="flex space-x-4 pl-2">
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
            href="https://www.linkedin.com/in/abhyudaya-mmmut-3b96372b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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
        <div>
          <p className="text-md ">Designed with ❤️ by <span className="text-blue-500">Abhyudaya </span>.</p>
        </div>
        <div className="sm:text-right text-center sm:text-md text-xs">
          <p>
            © {new Date().getFullYear()} Abhyudaya MMMUT. All rights reserved.
          </p>
          <p className="mt-1">An Enigmatic Ensemble</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
