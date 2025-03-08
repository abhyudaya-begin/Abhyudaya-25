import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya-combined.png"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Hero2Section() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const  user  = useSelector((state) => state.user);

  return (
    <div className="relative overflow-hidden ">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 ">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="flex justify-center">
           
          </div>
          
             {/* Festival Title */}
             <img src={Abhyudaya} alt="" srcset=""   className="w-3/5 m-auto  h-auto animate-ease-out" />
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-2 tracking-tight">
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300 animate-pulse">
            AN ENIGMATIC ENSEMBLE
            </p>
          </h1>
       
         </div>
           
         
         <p className="mt-6 text-lg tracking-tight leading-8 text-indigo-200 max-w-4xl mx-auto">
          Step into a vibrant celebration where India's timeless heritage meets modern style. <strong>Abhyudaya</strong>, <span className="uppercase">{ "An Enigmatic Ensemble"}</span> is a kaleidoscopic fusion of tradition and innovation, where ancient rhythms, contemporary beats, and vibrant colors come alive. Join us on this mesmerizing journey of discovery and creativity!
          </p>
        
          { !user &&

<Link to="/profile">
<div className="mt-4 flex items-center justify-center gap-x-6 md:hidden flex">
  
  <span className="rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 px-6 py-3 text-md text-gray-900 font-semibold shadow-sm hover:from-purple-600 hover:to-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:text-gray-100 focus-visible:outline-indigo-400 transition-all duration-300 cursor-pointer">
    Register Now
  </span>
  
</div>
</Link>
          }
          <div className="mt-16">
            <div className="relative">
              <div className="relative flex justify-center">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
