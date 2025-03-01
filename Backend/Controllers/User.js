import { ApiError } from "../utils/ApiError.js";
import { User } from "../Models/User.js";
import { Events } from "../Models/Events.js";
import { generateUser } from "./username.js";
import bcrypt from "bcryptjs"; 

// Register User
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;

    if (
      ![fullName, email, password, username].every((field) => field?.trim())
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const userExist = await User.findOne({ $or: [{ email }, { username }] });

    if (userExist) {
      return res.status(409).json(new ApiError(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      username: generateUser(),
    });

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registering"));
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email && !username) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Email or Username is required to delete a user")
        );
    }

    const removeUser = await User.findOneAndDelete({
      $or: [{ email }, { username }],
    });

    if (!removeUser) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User deleted successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

// Update User Details
const updateUser = async (req, res) => {
  try {
    const { email, username, updateData } = req.body;

    if (!email && !username) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Email or Username is required to update user details"
          )
        );
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json(new ApiError(400, "Update data is required"));
    }

    const user = await User.findOneAndUpdate(
      { $or: [{ email }, { username }] },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "User information updated successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

// Event Registration
const eventRegister = async (req, res) => {
  try {
    const { email, eventId } = req.body;

    if (!email || !eventId) {
      return res
        .status(400)
        .json(new ApiError(400, "Email and Event ID are required"));
    }

    const user = await User.findOne({ email });
    const event = await Events.findOne({ eventId });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }
    if (!event) {
      return res.status(404).json(new ApiError(404, "Event not found"));
    }

    if (user.eventsParticipated?.includes(eventId)) {
      return res
        .status(400)
        .json(new ApiError(400, "User already registered for this event"));
    }

    user.eventsParticipated = [...(user.eventsParticipated || []), eventId];
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "User registered for event successfully")
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

// Unregister Event
const unregisterEvent = async (req, res) => {
  try {
    const { email, eventId } = req.body;

    if (!email || !eventId) {
      return res
        .status(400)
        .json(new ApiError(400, "Email and Event ID are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    user.eventsParticipated = user.eventsParticipated?.filter(
      (event) => event !== eventId
    );
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user,
          `User unregistered successfully from event ${eventId}`
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

export { registerUser, deleteUser, updateUser, eventRegister, unregisterEvent };
