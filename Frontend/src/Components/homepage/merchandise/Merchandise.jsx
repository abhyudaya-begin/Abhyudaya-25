import { useState } from "react";
import blackTshirt from '../../../assets/Logo-images/blackTshirt.jpg'
const tshirts = [
  {
    id: 1,
    name: "Abhyudaya'25 Official Tee",
    image: blackTshirt,
    sizes: ["S", "M", "L", "XL"],
    price: "₹499",
    description: "The classic Abhyudaya tee with our signature logo."
  },
  {
    id: 2,
    name: "Abhyudaya'25 Limited Edition Tee",
    image: blackTshirt,
    sizes: ["M", "L", "XL"],
    price: "₹599",
    description: "Exclusive design, only available during the event."
  },
];

export default function Merchandise() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  return (
    <div className="py-16 px-4 sm:px-6 bg-black text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Abhyudaya Merchandise</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Show your support with our official Abhyudaya'25 merchandise. Limited quantities available.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {tshirts.map((tshirt) => (
            <div 
              key={tshirt.id} 
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-transform duration-300 hover:border-blue-600"
              onMouseEnter={() => setHoveredItem(tshirt.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <img
                  src={tshirt.image}
                  alt={tshirt.name}
                  className="w-full h-56 sm:h-64 object-cover"
                />
                {hoveredItem === tshirt.id && (
                  <div className="absolute inset-0 bg-black bg-gray-900/30 bg-opacity-10 flex items-center justify-center">
                    <span className="text-white text-lg font-medium px-4 py-2 rounded-full bg-blue-600 bg-opacity-90 cursor-pointer">
                      View Details
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-xl font-bold text-white mb-1 sm:mb-0">{tshirt.name}</h3>
                  <span className="text-xl font-bold text-blue-400">{tshirt.price}</span>
                </div>
                
                <p className="text-gray-400 mb-4">{tshirt.description}</p>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Select Size:</label>
                  <div className="flex gap-2">
                    {tshirt.sizes.map((size) => (
                      <button
                        key={size}
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                          selectedSizes[tshirt.id] === size
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-gray-700 text-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => handleSizeChange(tshirt.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                    selectedSizes[tshirt.id] 
                      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" 
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!selectedSizes[tshirt.id]}
                >
                  {selectedSizes[tshirt.id] ? "Add to Cart" : "Select a Size"}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-gray-400 mb-2">Free shipping on all orders above ₹999</p>
          <p className="text-sm text-gray-400">Limited stock available. Get yours before they're gone!</p>
        </div>
      </div>
    </div>
  );
}