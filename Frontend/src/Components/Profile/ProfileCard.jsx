import React, { useEffect } from "react";
import ProfileInfo from "./ProfileCard/ProfileInfo";
import RegisteredEvents from "./ProfileCard/RegisteredEvents";
import { useSelector } from "react-redux";
import Abhyudaya from "../../assets/Logo-images/Abhyudaya-combined.png";
import { Navigate } from "react-router-dom";

import toast from "react-hot-toast";

const ProfileCard = () => {
  const user = useSelector((state) => state.user);


  useEffect(() => {
    const done =()=>{

      if (!user) {
        window.location.reload();
        return <Navigate to="/" replace />;
      }
    }


    done()
  }, [user]); // ✅ Include navigate in dependency array
  
  if(!user)
  {
    return <Navigate to="/"> </Navigate>;
  }
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-6 sm:p-6 bg-[radial-gradient(circle_at_top,#0f0c29,#302b63,_#24243e)]">
      {/* Background Logo */}
      <img
        src={Abhyudaya}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 sm:w-2/3 lg:w-1/2 opacity-60"
        alt="Logo"
      />
      {/* Main Profile Card */}
      <div className="relative w-full max-w-2xl md:max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileInfo />
          <RegisteredEvents />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
