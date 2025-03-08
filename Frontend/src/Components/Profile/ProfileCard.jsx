import React, { useState } from "react";
import { Check, Copy, IndianRupee, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/UserSlice";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya-combined.png";

const ProfileCard = () => {
  const user = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const handleCopy = () => {
    navigator.clipboard.writeText(user.ABH_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const dob = new Date(user.dob).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-6 sm:p-6 bg-[radial-gradient(circle_at_top,#0f0c29,#302b63,_#24243e)]"
>
  {/* Background Logo */}
 <img 
  src={Abhyudaya} 
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-2/3 lg:w-1/2 opacity-60"


  alt="Logo" 
/>
  {/* Main Profile Card */}
  <div className="relative w-full max-w-2xl md:max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
    <div className="flex flex-col lg:flex-row gap-6">

          {/* Profile Details */}
          <div className="w-full space-y-6">
  <div className="flex flex-col sm:flex-row items-center gap-4">
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 
          rounded-full opacity-60 group-hover:opacity-100 blur-xl transition-all duration-300">
      </div>
      
      {/* Profile Picture */}
      <img
        src={user.profilePicture}
        alt={user.fullName}
        className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover 
          border-4 border-white/30 shadow-lg"
      />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-lg sm:text-2xl font-bold text-white">{user.fullName}</h1>
                <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                 <span>
                  ABH ID : </span> <span className="text-white/70 text-sm sm:text-base">{user.ABH_ID}</span>
                  <button
                    onClick={handleCopy}
                    className="bg-white/10 p-1 sm:p-2 rounded-md text-white hover:bg-white/20 transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-xs sm:text-sm">
              {[
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phoneNumber },
                { label: "Course", value: user.course },
                { label: "Gender", value: user.gender },
                { label: "Institution", value: user.institution },
                { label: "Date of Birth", value: dob },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white/10 p-2 sm:p-3 rounded-xl flex justify-between items-center text-xs sm:text-base"
                >
                  <span className="text-white/80">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}

              <div className="bg-white/10 p-2 sm:p-3 rounded-xl flex justify-between items-center">
                <span className="text-white/80">Payment Status</span>
                <span
                  className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium border ${
                    user.paymentStatus
                      ? "bg-green-500/20 text-green-300 border-green-400/50"
                      : "bg-red-500/20 text-red-300 border-red-400/50"
                  }`}
                >
                  {user.paymentStatus ? "Paid" : "Unpaid"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl mt-4 transition-all text-sm sm:text-base"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Registered Events */}
          <div className="w-full bg-white/10 rounded-2xl p-4 sm:p-5">
            <h2 className="text-base sm:text-xl font-bold text-white">Registered Events</h2>

            {user.eventsParticipated.length !== 0 ? (
              <div className="space-y-2 sm:space-y-3">
                {user.eventsParticipated.map((event) => (
                  <div key={event.name} className="bg-white/10 p-2 sm:p-4 rounded-xl hover:bg-white/20 transition">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white text-sm sm:text-base">{event.name}</h4>
                      <div className="flex items-center bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                        <IndianRupee className="w-4 h-4 text-indigo-300 mr-1" />
                        <span className="text-white font-medium text-xs sm:text-base">{event.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[150px] sm:h-[200px] text-center space-y-2 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">🎫</span>
                </div>
                <p className="text-sm sm:text-lg font-medium text-white">No Events Yet</p>
                <p className="text-xs sm:text-sm text-white/50">Your registered events will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;