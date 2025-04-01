const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware for attaching user from token
const attachUserWithTokenVerification = async (req, res, next) => {
  try {
    const token = req.cookies?.user;
    console.log(req.cookies);
    
    if (!token) return next(); // No token, proceed without modification
    
    const decoded = jwt.verify(token, process.env.USERNAME_SECRET);

    if (decoded) {
      req.user = decoded;
    }
  } catch (error) {
    req.user = null;

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        statuscode: 401,
        message: "Session expired. Please log in again.",
        status: false,
      });
    }
  }

  next();
};

const generateToken = (user) => {
  const payload = {
    fullName: user.fullName,
    ABH_ID: user.ABH_ID || null,
    phoneNumber: user.phoneNumber,
    email: user.email || null,
    profilePicture: user.profilePicture || null
  };

  return jwt.sign(payload, process.env.USERNAME_SECRET, {
    expiresIn: "7d", // Token valid for 7 days
  });
};

module.exports = { attachUserWithTokenVerification, generateToken };
