const express = require("express");
const { ApiError } = require("../utils/ApiError");



const app = express();
app.use(express.json());

const generateUser = async (fullName, dob) => {
 

  if (!fullName || !dob) {
    throw new ApiError(400, "Name and DoB are required");
  }

  if (fullName.length < 4) {
    throw new ApiError(400, "Name must be at least 4 characters long");
  }

  const generateUsername = (fullName, dob) => {
    const prefix = "ABH";
    const namePart = fullName.slice(0, 4).toUpperCase();
    const dobPart = dob.replace(/-/g, "");
    return `${prefix}${namePart}${dobPart}`;
  };

  const username = generateUsername(fullName, dob);

  return username
};

module.exports =  { generateUser };
