import { useState } from "react";
import BlackTshirt from "../../../assets/Logo-images/blackTshirt.jpg"
const tshirts = [
  {
    id: 1,
    name: "Abhyudaya'25 Official Tee",
    image: BlackTshirt,
    sizes: ["S", "M", "L", "XL"],
    price: "₹499",
  },
  {
    id: 2,
    name: "Abhyudaya'25 Limited Edition Tee",
    image: BlackTshirt,
    sizes: ["M", "L", "XL"],
    price: "₹599",
  },
];

export default function MerchandiseSection() {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold mb-6">🎽 Merchandise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tshirts.map((tshirt) => (
          <div key={tshirt.id} className="bg-white shadow-xl rounded-xl p-5">
            <img
              src={tshirt.image}
              alt={tshirt.name}
              
              className="w-50 h-50 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-3">{tshirt.name}</h3>
            <p className="text-gray-500">{tshirt.price}</p>
            <div className="mt-3">
              <label className="text-sm font-medium">Size:</label>
              <select
                className="mt-1 p-2 border rounded w-full"
                value={selectedSizes[tshirt.id] || ""}
                onChange={(e) => handleSizeChange(tshirt.id, e.target.value)}
              >
                <option value="">Select Size</option>
                {tshirt.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
