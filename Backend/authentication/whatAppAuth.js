const express = require("express");
const twilio = require("twilio");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Rate limit configuration
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many attempts. Try again later.",
});

// Function to generate a 6-digit verification code
function generateCode() {
  return crypto.randomInt(100000, 999999).toString();
}

// Function to send a WhatsApp message
async function sendMessage(to, message) {
  try {
    await twilioClient.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
      body: message,
    });
    return true;
  } catch (err) {
    console.error("Error sending message:", err);
    return false;
  }
}

// API to send a WhatsApp verification code
const sendWhatsAppMessage = asyncHandler(async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
      throw new ApiError(400, "Invalid phone number format");
    }

    const verificationCode = generateCode();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    await User.findOneAndUpdate(
      { phoneNumber },
      {
        phoneNumber,
        verificationCode,
        codeExpiry,
        isVerified: false,
        lastRequestTime: new Date(),
      },
      { upsert: true }
    );

    const message = `Your verification code is ${verificationCode}. It expires in 10 minutes.`;
    const sent = await sendMessage(phoneNumber, message);

    if (!sent) {
      throw new ApiError(500, "Failed to send verification code");
    }

    res.json({
      message: "Verification code sent successfully",
      expiresIn: "10 minutes",
    });
  } catch (err) {
    throw new ApiError(500, "Internal server error");
  }
});

// API to verify the OTP
const authLimit = asyncHandler(async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    // Find user
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ error: "No verification code requested" });
    }

    //  code expire
    if (user.codeExpiry < new Date()) {
      return res.status(400).json({ error: "Verification code has expired" });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationCode = undefined;
    user.codeExpiry = undefined;
    await user.save();

    // Generate JWT token for authenticated session
    const token = jwt.sign(
      { userId: user._id, phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Phone number verified successfully",
      token,
    });
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

module.exports =  { sendWhatsAppMessage, sendMessage, authLimit };
