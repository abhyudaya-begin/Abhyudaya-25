import React, { useState } from "react";

import BlackTshirt from "../../../assets/Logo-images/blackTshirt.jpg";
const Merchandise = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("white");

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#120c0f]  flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center bg-[#1a1a3a] p-8 rounded-2xl shadow-lg">
        <div className="flex-1 flex justify-center">
          <img
            src={BlackTshirt}
            alt="T-shirt"
            className="w-80 h-auto rounded-lg"
          />
        </div>

        <div className="flex-1 space-y-4 mt-6 md:mt-0 md:ml-8">
          <h2 className="text-2xl font-bold">ABHYUDAYA'25 T-shirt Orders</h2>
          <p className="text-lg">Price: <span className="font-semibold">₹399</span>, All shirts are oversized.</p>
          <p className="text-lg">Available Sizes: S, M, L, XL, XXL</p>
          
          <div className="border-t border-gray-500 pt-4">
            <h3 className="text-lg font-bold">Payment Process</h3>
            <p>Payment will be done through <span className="font-bold">UPI</span></p>
            <p>Click on <span className="font-bold">Order Now</span> to be redirected.</p>
            <p>Choose <span className="font-bold">Abhyudaya, MMMUT Gorkhpur</span> in payment category.</p>
            <p>Enter your <span className="font-bold">personal details</span> as required.</p>
            <p>Mention the T-shirt price in the <span className="font-bold">Abhyudaya T-shirt</span> field.</p>
            <p>Mention the T-shirt size in the <span className="font-bold">Remarks</span> field.</p>
            <p>Complete payment and take a <span className="font-bold">screenshot</span> of the receipt.</p>
          </div>

          <div className="border-t border-gray-500 pt-4">
            <h3 className="text-lg font-bold">T-shirt Collection:</h3>
            <p>You can collect from <span className="font-bold">MPH , MMMUT</span></p>
            <p>For queries, contact:</p>
            <p className="font-bold">Pritish Tomar</p>
            <p>Phone: <a href="tel:9358704604" className="text-blue-400 underline">9358704604</a></p>
          </div>

          <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl text-lg hover:bg-red-600 transition">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
