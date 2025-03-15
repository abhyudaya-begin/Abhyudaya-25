
// middleware for attaching per request
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware for attaching user from token
const attachUserWithTokenVerification = async (req, res, next) => {
  try {
    const token = req.cookies?.user; // ✅ Corrected (req.cookies instead of req.cookie)
    
    
    if (!token) return next(); // If no token, continue without modifying req.user
    
    const decoded = jwt.verify(token, process.env.USERNAME_SECRET);

    if (decoded) {
      req.user = decoded; // ✅ Directly attach decoded payload
    }
  } catch (error) {
    req.user = null; // Clear user if token is invalid
  }

  next(); // Proceed regardless of token verification
};




const generateToken = (user) => {
  const payload = {
    fullName: user.fullName,
    ABH_ID: user.ABH_ID || null,
    phoneNumber: user.phoneNumber,
    email: user.email || null,
    profilePicture: user.profilePicture || null
  };

  return jwt.sign( payload , process.env.USERNAME_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
};

module.exports = {attachUserWithTokenVerification, generateToken};
