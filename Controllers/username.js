const express = require("express");
const { ApiError } = require("../utils/ApiError");



const app = express();
app.use(express.json());

const generateUser = async (fullName, phone) => {
 

  if (!fullName || !phone) {
    throw new ApiError(400, "Name and Phone are required");
  }

  if (fullName.length < 4) {
    throw new ApiError(400, "Name must be at least 4 characters long");
  }

  const generateUsername = (fullName, phone) => {
    if(fullName.length < 4)
    {
      fullName+="---";
    }

    const namePart = fullName.slice(0, 4).toUpperCase();
    const phonePart = phone.replace(/-/g, "").slice(-4); // Get last 4 digits
    return `${namePart}${phonePart}`;
  };
  

  const username = generateUsername(fullName, phone);

  return username;
};

module.exports =  { generateUser };
