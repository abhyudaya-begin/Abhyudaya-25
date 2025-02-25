import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/Logo-images/Abhyudaya.png";
import img from "../assets/Glimses/glimpse1.png";

const Footer = ({ isSidebarOpen }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [iconSize, setIconSize] = useState(20);
  const [iconSpacing, setIconSpacing] = useState("space-x-4");
  const [sidebarMargin, setSidebarMargin] = useState("");

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
      } else if (width >= 768 && width < 1024 && isSidebarOpen) {
        setSidebarMargin("md:ml-20");
      } else {
        setSidebarMargin("ml-0");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  const getGridCols = () => {
    if (isSmallScreen) return "grid-cols-1";
    if (isMediumScreen) return "grid-cols-2";
    if (windowWidth >= 1024 && windowWidth <= 1077) return "grid-cols-2";
    return "grid-cols-4";
  };

  const contacts = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+123 456 7891",
      role: "President",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+123 456 7892",
      role: "Vice President",
    },
    {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+123 456 7893",
      role: "Secretary",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+123 456 7894",
      role: "Treasurer",
    },
    {
      name: "Alex Wilson",
      email: "alex@example.com",
      phone: "+123 456 7895",
      role: "Technical Head",
    },
    {
      name: "Sarah Brown",
      email: "sarah@example.com",
      phone: "+123 456 7896",
      role: "Event Coordinator",
    },
    {
      name: "David Lee",
      email: "david@example.com",
      phone: "+123 456 7897",
      role: "Marketing Head",
    },
    {
      name: "Lisa Chen",
      email: "lisa@example.com",
      phone: "+123 456 7898",
      role: "Creative Director",
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
      className={`w-full bg-gradient-2 text-background-light py-8 px-6 md:px-20 mt-auto relative transition-all duration-300 ease-in-out border-t border-primary-orange/30 ${sidebarMargin}`}
    >
      <div
        className={`flex flex-col-reverse md:flex-row justify-between items-center mx-auto min-h-[300px] gap-8 md:gap-24 ${
          isSidebarOpen && windowWidth >= 1024 ? "lg:max-w-5xl" : "max-w-6xl"
        }`}
      >
        {/* Logo and Icons Section */}
        <div
          className={`flex flex-col items-center ${
            isSmallScreen ? "mt-8" : "md:mt-0"
          } md:w-1/4 space-y-8 md:pl-12`}
        >
          <img
            src={logo}
            alt="Logo"
            onClick={handleScrollToTop}
            className={`${
              windowWidth >= 768 ? "w-24" : "w-32"
            } h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity`}
          />

          {/* Social Media Icons */}
          <div className={`flex items-center justify-center ${iconSpacing}`}>
            <a
              href="https://www.facebook.com/abhyudaya.mmmut/"
              className="text-white hover:text-blue-400 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaFacebookF size={iconSize} />
            </a>
            <a
              href="https://www.instagram.com/abhyudaya.mmmut/?hl=en"
              className="text-white hover:text-pink-400 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaInstagram size={iconSize} />
            </a>
            <a
              href="https://www.youtube.com/@abhyudayammmut1045"
              className="text-white hover:text-red-500 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaYoutube size={iconSize} />
            </a>
            <a
              href="https://www.youtube.com/@abhyudayammmut1045"
              className="text-white hover:text-blue-500 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaLinkedinIn size={iconSize} />
            </a>
            <a
              href="mailto:abhyudayammmut@gmail.com"
              className="text-white hover:text-red-400 transform hover:scale-110 transition-all hover:shadow-glow p-1"
            >
              <FaEnvelope size={iconSize} />
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col w-full md:w-3/4">
          {/* Contact Images Section */}
          <div
            className={`grid ${getGridCols()} gap-6 w-full ${
              windowWidth >= 1024 && windowWidth <= 1077
                ? "max-w-[95%] mx-auto"
                : ""
            }`}
          >
            {contacts.map((person, index) => (
              <div
                key={index}
                className={`text-center flex flex-col items-center bg-white/5 backdrop-blur-sm ${
                  windowWidth >= 768 ? "p-5" : "p-6"
                } rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/20 ${
                  windowWidth >= 1024 && windowWidth <= 1077 ? "w-full" : ""
                }`}
              >
                <img
                  src={img}
                  alt={person.name}
                  className={`${
                    windowWidth >= 768 ? "w-20 h-20" : "w-24 h-24"
                  } rounded-full object-cover mx-auto`}
                />
                <p
                  className={`mt-3 font-semibold ${
                    windowWidth >= 768 ? "text-base" : "text-lg"
                  }`}
                >
                  {person.name}
                </p>
                <p
                  className={`${
                    windowWidth >= 768 ? "text-sm" : "text-base"
                  } text-gray-400 mb-2`}
                >
                  {person.role}
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className={`text-white hover:text-gray-300 transition-all ${
                    windowWidth >= 768 ? "text-sm" : "text-base"
                  }`}
                >
                  {person.email}
                </a>
                <a
                  href={`tel:${person.phone}`}
                  className={`text-white hover:text-gray-300 transition-all ${
                    windowWidth >= 768 ? "text-sm" : "text-base"
                  }`}
                >
                  {person.phone}
                </a>
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
