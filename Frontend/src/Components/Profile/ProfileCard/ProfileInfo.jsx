import React, { useState } from "react";
import { Check, Copy, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/UserSlice";

const ProfileInfo = () => {
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

  // const dob = new Date(user.dob).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  return (
    <div className="w-full space-y-6 h-fit ">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={user.profilePicture}
          alt={user.fullName}
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white/30 shadow-lg"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-2xl font-bold text-white">
            {user.fullName}
          </h1>
          <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
            <span>ABH ID : </span>
            <span className="text-white/70 text-sm sm:text-base">
              {user.ABH_ID}
            </span>
            <button
              onClick={handleCopy}
              className="bg-white/10 p-1 sm:p-2 rounded-md text-white hover:bg-white/20 transition"
              >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
              <p className="text-xs font-semibold text-gray-400">Remember your ABH_ID for further usage.</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 text-xs sm:text-sm">
        {[
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phoneNumber },
          { label: "Course", value: user.course },
          { label: "Gender", value: user.gender },
          { label: "Institution", value: user.institution },
          // { label: "Date of Birth", value: dob },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white/10 p-2 sm:p-3 rounded-xl flex justify-between items-center text-xs sm:text-base"
          >
            <span className="text-white/80">{label}</span>
            <span className="text-white font-medium">{value}</span>
          </div>
        ))}

        {/* Payment Status */}
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
  );
};

export default ProfileInfo;
