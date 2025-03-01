const jwt = require("jsonwebtoken");
const {ApiError} = require("../utils/ApiError");
const dotenv = require("dotenv");
dotenv.config();



// middleware for attaching per request
const attachUserWithTokenVerification = async (req, res, next) => {
    try {
      const token = req.cookies?.user; // Get token from cookie
  
      if (token) {
        const decoded = jwt.verify(token, process.env.USERNAME_SECRET);
  
        if (decoded) {
          req.user = { ...decoded }; // Attach only token data to req.user
        }
      }
    } catch (error) {
      req.user = null; // Clear user if token is invalid
    }
  
    next(); // Proceed regardless of token verification
  };


  

const generateToken = (user) => {
  const payload = {
    fullName: user.fullName,
    ABH_ID: user.ABH_ID,
    phoneNumber: user.phoneNumber,
    email: user.email,
    profilePicture: user.profilePicture,
    isAdmin:user.isAdmin
  };

  return jwt.sign( payload , process.env.USERNAME_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
};

module.exports = {attachUserWithTokenVerification, generateToken, };
