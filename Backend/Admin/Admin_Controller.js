const { Admin_model } = require("./Admin_Model");
const { generateToken } = require("../authentication/UserAuth");
const {ApiError} = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const AdminLogin = async (req, res) => {
    try {
      const { fullName, phoneNumber, year, rollNumber } = req.body;
  
      if (
        ![fullName, phoneNumber, year, rollNumber].every((field) =>
          typeof field === "string" ? field.trim() : field
        )
      ) {
        return res.status(400).json(new ApiError(400, "All fields are required"));
      }
        
     
  
        const user = { fullName, phoneNumber, year, rollNumber};
        const admin = await Admin_model.create(user);

      const token = generateToken(user);
      

  
      res.cookie("user", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ Ensures HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ Prevents CSRF & allows cross-origin
        
      });
  
      
      return res.status(200).json(new ApiResponse(200, {user}, "Login successful"));
    } catch (error) {
      console.log(error);
  
      return res.status(500).json(new ApiError(500, "Something went wrong!"));
    }
  };
  
  module.exports = {AdminLogin}