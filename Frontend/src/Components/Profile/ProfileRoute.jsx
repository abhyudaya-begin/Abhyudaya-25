import React from "react";
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import AuthForm from "./AuthForm";

function ProfileRoute() {
  const [signIn, setSignedIN] = useState(false);
  // // if(localStorage.getItem('token') === null){
  // //     setSignedIN(true)
  // // }
  return <div>{signIn ? <ProfileCard /> : <AuthForm />}</div>;
}

export default ProfileRoute;
