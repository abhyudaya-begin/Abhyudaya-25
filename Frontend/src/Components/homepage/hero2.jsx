import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Hero2Section() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative overflow-hidden mb-4">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-0 bg-black opacity-40" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 ">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
           
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
             {/* Festival Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-2 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-100 animate-pulse">
              ABYUDAYA'25
            </span>
          </h1>
       
         </div>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300">
              AN ENIGMATIC ENSEMBLE
            </p>
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
            obcaecati molestiae nulla facere quo consequuntur vitae blanditiis.
          </p>
          <p className="mt-4 text-md leading-7 text-indigo-200 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            alias pariatur accusamus laborum, sapiente modi at blanditiis cum
            aliquam.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <span className="rounded-full bg-gradient-to-r from-purple-300 to-indigo-300 px-6 py-3 text-md text-gray-900 font-semibold  shadow-sm hover:from-purple-600 hover:to-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  hover:text-gray-100 focus-visible:outline-indigo-400 transition-all duration-300 cursor-pointer">
              Register Now
            </span>
          </div>
          <div className="mt-16">
            <div className="relative">
              <div className="relative flex justify-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                  <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300 uppercase">
                    March 05 - March 07, 2024
                  </p>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
