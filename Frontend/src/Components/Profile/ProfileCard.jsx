import React, { useState, useRef } from "react";
import { Check, Copy, IndianRupee } from "lucide-react";

const user = {
  name: "Pritish Tomar",
  email: "pritishn@example.com",
  phone: "9876543210",
  course: "B Tech",
  gender: "Male",
  graduationYear: "2025",
  dob: "15 Aug 2001",
  image: "https://via.placeholder.com/100",
  paymentStatus: "Paid",
  events: [
    { name: "Rising Star", price: "299" },
    { name: "Chote Ustaad", price: "199" },
    { name: "Photoholics", price: "199"},
  ],
};

const generateReferralId = (name, number) => {
  if (!name || !number) return "INVALID_INPUT";
  const namePart = name.replace(/\s+/g, "").substring(0, 4).toUpperCase();
  const numberPart = number.slice(-4);
  return `${namePart}${numberPart}`;
};

const ProfileCard = () => {
  const [copied, setCopied] = useState(false);
  const [image, setImage] = useState(user.image);
  const fileInputRef = useRef(null);
  const referralId = generateReferralId(user.name, user.phone);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-[#6A1B9A] p-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg border-2 border-purple-400 rounded-2xl shadow-xl overflow-hidden p-6">
        {/* Horizontal Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Profile Details */}
          <div className="w-full md:w-1/2 bg-white/20 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src={image}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
              />
              <button onClick={triggerFileInput} className="p-1 bg-white/30 hover:bg-white/20 transition">
                Upload Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
             
            </div>

            <div className="mt-4 text-white/80 space-y-2">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p><span className="font-bold text-blue-300">Email:</span> {user.email}</p>
              <p><span className="font-bold text-blue-300">Phone:</span> {user.phone}</p>
              <p><span className="font-bold text-blue-300">Course:</span> {user.course}</p>
              <p><span className="font-bold text-blue-300">Gender:</span> {user.gender}</p>
              <p><span className="font-bold text-blue-300">Graduation Year:</span> {user.graduationYear}</p>
              <p><span className="font-bold text-blue-300">Date of Birth:</span> {user.dob}</p>
              <p> <span className="font-bold text-blue-300">Payment Status:</span> <span
                        className={`text-sm ${
                          user.paymentStatus.toLowerCase() === "paid"
                            ? "text-green-400"
                            :user.paymentStatus.toLowerCase() === "pending"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {user.paymentStatus}
                      </span></p>
            </div>

            {/* Referral ID */}
            <div className="mt-5 flex items-center justify-between p-3 bg-white/20 rounded-lg text-sm">
              <span className="text-white">Referral ID: {referralId}</span>
              <button onClick={handleCopy} className="p-2 hover:bg-white/30 rounded-full transition">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>

          {/* Right: Registered Events */}
          <div className="w-full md:w-1/2 bg-white/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Registered Events</h3>
            {user.events.length === 0 ? (
              <p className="text-white text-center">No events registered</p>
            ) : (
              <div className="space-y-4">
                {user.events.map((event) => (
                  <div key={event.name} className="p-4 bg-white/20 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white">{event.name}</h4>
                      <div className="flex items-center text-white">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        <span>{event.price}</span>
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;


