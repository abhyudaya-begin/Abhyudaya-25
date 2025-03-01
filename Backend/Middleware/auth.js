import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const verifyUser =
      req.cookies?.username || req.header("Authorization")?.replace("Bearer ", "");

    if (!verifyUser) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify token
    const decoded = jwt.verify(verifyUser, process.env.USERNAME_SECRET);

    // Fetch user details
    const user = await User.findById(decoded?._id).select("-password -institution -eventsParticipated");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});
