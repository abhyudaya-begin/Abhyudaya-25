const { Admin } = require("../Models/admin.js");
const { User } = require("../Models/User.js");
const { ApiError } = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");

//add user
const adduser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, RollNumber } = req.body;

    if (
      ![fullName, email, phoneNumber, RollNumber].every((field) =>
        typeof field === "string" ? field.trim() : field
      )
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const userExist = await Admin.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (userExist) {
      return res.status(409).json(new ApiError(409, "User already exists"));
    }
    const newUser = await Admin.create({
      email,
      fullName,
      email,
      phoneNumber,
      RollNumber,
    });
    return res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//delete user

const deleteUser = async (req, res) => {
  try {
    const { email, ABH_ID } = req.body;

    if (!email && !ABH_ID) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Email or ABH_ID is required to delete a user")
        );
    }

    const removeUser = await User.findOneAndDelete({
      $or: [{ email }, { ABH_ID }],
    });

    if (!removeUser) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User deleted successfully"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//remove from event

const removeUser = async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    
    // Validate inputs
    if (!eventId || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Event ID and User ID are required' 
      });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if user is already registered for the event
    const userIndex = event.participants.findIndex(
      participant => participant.toString() === userId
    );
    
    if (userIndex === -1) {
      return res.status(400).json({ 
        success: false, 
        message: 'User is not registered for this event' 
      });
    }

    // Remove user from event participants
    event.participants.splice(userIndex, 1);
    
    // Also remove user from event.registrationInfo if it exists
    if (event.registrationInfo && event.registrationInfo[userId]) {
      delete event.registrationInfo[userId];
    }
    
    // Update event
    await event.save();

    // Log the admin action
    console.log(`Admin ${req.user.id} removed user ${userId} from event ${eventId}`);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'User successfully removed from event',
      event: {
        id: event._id,
        title: event.title,
        participantCount: event.participants.length
      }
    });
    
  } catch (error) {
    console.error('Error removing user from event:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while removing user from event',
      
    });
  }
};

module.exports = { adduser, deleteUser, removeUser };
