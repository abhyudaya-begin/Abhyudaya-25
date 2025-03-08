import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserGraduate,
  FaTshirt,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { GoSponsorTiers } from "react-icons/go";

import { IoMdPhotos } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { MdContactMail } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import AbhLogo from "../assets/Logo-images/Abhyudaya.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const sidebarRef = useRef(null);
  const [active, setActive] = useState( null);
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); 

      
        const width = sidebarRef.current.offsetWidth;
        
       
        document.documentElement.style.setProperty(
          "--sidebar-width",
          mobile ? "0px" : `${width}px`
        );
      
    };
  
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state
  
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  
  

  // 2nd year working zone!
  const navItems = [
    {
      id: "profile",
      icon: <FaUser size={20} color="white" />,
      label: "Profile",
      path: "/profile",
    },
    {
      id: "gallery",
      icon: <IoMdPhotos size={20} color="white" />,
      label: "Gallery",
      path: "/gallery",
    },
   
    {
      id: "event",
      icon: <FaCalendarCheck size={20} color="white" />,
      label: "Event",
      path: "/events",
    },
    {
      id: "sponsors",
      icon: <GoSponsorTiers size={25} color="white" />,
      label: "Our Sponsors",
      path: "/sponsors",
    },
    {
      id: "campus-ambassador",
      icon: <FaUserGraduate size={20} color="white" />,
      label: "Campus Ambassador",
      path: "/campus-ambassador",
    },
   
    {
      id: "contact",
      icon: <MdContactMail size={20} color="white" />,
      label: "Contact Us",
      path: "/contact",
    },
    {
      id: "team",
      icon: <RiTeamFill size={20} color="white" />,
      label: "About us",
      path: "/about",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isSidebarOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".hamburger-btn")
      ) {
        setIsSidebarOpen(false);
      }
      console.log(location.pathname)
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="hamburger-btn fixed top-4 left-4 md:hidden z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg"
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300  w-fit"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
  ref={sidebarRef}
  className={`sidebar overflow-y-auto overflow-x-hidden fixed top-0 left-0 h-screen bg-gray-900 z-40 transition-all duration-300 ease-in-out ${
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } ${isMobile ? "w-64" : "w-20 md:translate-x-0"}`}
>

        {/* Logo/Brand area */}
        <div className="flex justify-center items-center h-16 border-b border-gray-700">
          <h1
            className={`font-bold text-white ${
              isMobile ? "text-xl" : "text-sm"
            }`}
          >
            <Link to="/">
              <img
                src={AbhLogo}
                alt="Abh-Logo"
                width={40}
                height={40}
                srcset=""
              />
            </Link>
          </h1>
        </div>

        {/* Navigation items */}
        <nav className="mt-8 ">
          <ul className="space-y-5">
            {navItems.map((item) => (
              <li key={item.id} className="px-2">
                <Link
                  to={item.path}
                  className={`flex items-center ${
                    isMobile ? "px-4" : "justify-center"
                  } py-3 rounded-lg transition-colors relative group ${
                    location.pathname === `/${item.path}`
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } `}


                >
                  <span className="text-current">{item.icon}</span>

                  {isMobile ? (
                    <span className="ml-4 text-sm text-gray-400">
                      {item.label}
                    </span>
                  ) : (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-xs text-white rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap ">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
