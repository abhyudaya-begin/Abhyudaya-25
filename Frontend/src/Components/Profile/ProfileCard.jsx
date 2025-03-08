import React, { useState, useRef, useEffect } from "react";
import { Check, Copy, IndianRupee } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice";
import { useSelector } from "react-redux";
//  import { supabase } from "./Supabse";

// const generateReferralId = (name, number) => {
//   if (!name || !number) return "INVALID_INPUT";
//   const namePart = name.replace(/\s+/g, "").substring(0, 4).toUpperCase();
//   const numberPart = number.slice(-4);
//   return `${namePart}${numberPart}`;

// };

const ProfileCard = () => {
  const user = useSelector((state) => state.user);


  const [copied, setCopied] = useState(false);

  // const referralId = generateReferralId(user.name, user.phone);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleCopy = () => {
    navigator.clipboard.writeText(user.ABH_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch Redux logout action
    window.location.reload(); // Reload to reflect logout state
  };

  const dob = new Date(user.dob).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-[#6A1B9A] p-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg border-2 border-purple-400 rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Profile Details */}
          <div className="w-full md:w-1/2 bg-white/20 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src={user.profilePicture}
                alt={user.fullName}
                className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
              />
            </div>

            <div className="mt-4 text-white/80 space-y-2">
              <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
              <p>
                <span className="font-bold text-blue-300">Email:</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-bold text-blue-300">Phone:</span>{" "}
                {user.phoneNumber}
              </p>
              <p>
                <span className="font-bold text-blue-300">Course:</span>{" "}
                {user.course}
              </p>
              <p>
                <span className="font-bold text-blue-300">Gender:</span>{" "}
                {user.gender}
              </p>
              <p>
                <span className="font-bold text-blue-300">institution:</span>{" "}
                {user.institution}
              </p>
              <p>
                <span className="font-bold text-blue-300">Date of Birth:</span>{" "}
                {dob}
              </p>
              <p>
                <span className="font-bold text-blue-300">Payment Status:</span>
                <span
                  className={`text-sm ${
                    user.paymentStatus
                      ? "text-green-400"
                      : user.paymentStatus
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {user.paymentStatus ? "Paid" : "Unpaid"}
                </span>
              </p>
            </div>

            {/* Referral ID */}
            <div className="mt-5 flex items-center justify-between p-3 bg-white/20 rounded-lg text-sm">
              <span className="text-white">Referral ID: {user.ABH_ID}</span>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-white/30 rounded-full transition"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
            >
              Logout
            </button>
          </div>

          {/* Right: Registered Events */}
          <div className="w-full md:w-1/2 bg-white/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">
              Registered Events
            </h3>

            {user.eventsParticipated.length !== 0 ? (
              <div className="space-y-4">
                {user.eventsParticipated.map((event) => (
                  <div
                    key={event.name}
                    className="p-4 bg-white/20 rounded-lg border border-white/10"
                  >
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
            ) : (
              // 👇 Added a fallback message when no events are registered
              <p className="text-white/70">No registered events yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
