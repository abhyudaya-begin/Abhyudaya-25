import express from "express";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const app = express();
app.use(express.json());

const generateUser = asyncHandler(async (req, res) => {
  const { fullName, dob } = req.body;

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

  res.json({ username });
});

export { generateUser };
