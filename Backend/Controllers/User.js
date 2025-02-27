const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const { User } = require("../Models/User");
const { Events } = require("../Models/Events");
const { generateUser } = require("./username");
const jwt = require("jsonwebtoken");

username = generateUser();
// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, username } = req.body;

  if (
    ![fullName, email, password, username].every(
      (field) => field && field.trim() !== ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const userExist = await User.findOne({ $or: [{ email }, { username }] });

  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });
  if (!user) {
    throw new ApiError(500, "Something went wrong while registering");
  }

  return res.status(201).json({
    status: 200,
    message: "User registered successfully",
    user,
  });
});

// Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or Username is required to delete a user");
  }

  const removeUser = await User.findOneAndDelete({
    $or: [{ email }, { username }],
  });

  if (!removeUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({ message: "User deleted successfully" });
});

// Update User Details
const updateUser = asyncHandler(async (req, res) => {
  const { email, username, updateData } = req.body;

  if (!email && !username) {
    throw new ApiError(
      400,
      "Email or Username is required to update user details"
    );
  }

  const user = await User.findOneAndUpdate(
    { $or: [{ email }, { username }] },
    { $set: updateData },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json({ message: "User updated successfully", user });
});

// Event Registration

const eventRegister = asyncHandler(async (req, res) => {
  const { email, eventId } = req.body;

  if (!email || !eventId) {
    throw new ApiError(400, "Email and Event ID are required");
  }

  const user = await User.findOne({ email });
  const event = await Events.findOne({ eventId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (!user.eventsParticipated) {
    user.eventsParticipated = [];
  }

  if (user.eventsParticipated.includes(eventId)) {
    throw new ApiError(400, "User already registered for this event");
  }

  user.eventsParticipated.push(eventId);
  await user.save();

  return res
    .status(200)
    .json({ message: "Event registration successful", user });
});

// Unregister Event
const unregisterEvent = asyncHandler(async (req, res) => {
  const { email, eventId } = req.body;

  if (!email || !eventId) {
    throw new ApiError(400, "Email and Event ID are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.eventsParticipated = user.eventsParticipated.filter(
    (event) => event !== eventId
  );
  await user.save();

  return res
    .status(200)
    .json({ message: `Unregistered from event ${eventId}`, user });
});

module.exports = {
  registerUser,
  deleteUser,
  updateUser,
  eventRegister,
  unregisterEvent,
};
