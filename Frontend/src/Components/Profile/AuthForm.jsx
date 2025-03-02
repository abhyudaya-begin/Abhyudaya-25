import { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const  user  = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false)

  useEffect(()=>{
    if(user) setShowProfile(true);
  }, [user])
 

  if(showProfile)
    return <ProfileCard/>
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-400 to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <img
              src="../src/assets/Logo-images/Abhyudaya.png"
              alt="Abhyudaya"
              className="h-8 w-auto"
            />
            <button
              className="px-6 py-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-md transition-all duration-300 hover:from-pink-600 hover:to-purple-600"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-white text-center">
            {isSignUp ? "SIGN UP" : "LOG IN"}
          </h1>

          {isSignUp ? <SignUpForm /> : <SignInForm />}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
