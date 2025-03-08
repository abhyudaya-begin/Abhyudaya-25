const { ApiError } = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse"); // Adjust the path if needed

const { User } = require("../Models/User.js");
const { Events } = require("../Models/Events.js");
const { generateUser } = require("./username.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../authentication/UserAuth.js");

// [ABH_ID, fullName, email, phoneNumber, dob, password, institution]
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dob,
      password,
      institution,
      course,
      gender,
      referallId,
      profilePicture
    } = req.body;


    if (
      ![
        fullName,
        email,
        phoneNumber,
        dob,
        password,
        institution,
        course,
        gender,
        profilePicture
      ].every((field) => (typeof field === "string" ? field.trim() : field))
    ) {
    
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const userExist = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (userExist) {
      return res.status(409).json(new ApiError(409, "User already exists"));
    }

    if(referallId)
    {

      const referallIdExist = await User.find({ABH_ID : referallId});
      
      if (!referallIdExist) {
        return res.status(409).json(new ApiError(404, "This Referall Id does not exist!"));
      }
    }


    const dobFormatted = new Date(dob).toISOString().split("T")[0];

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ABH_ID: await generateUser(fullName, phoneNumber),
      fullName,
      email,
      phoneNumber,
      dob: dobFormatted,
      password: hashedPassword,
      institution,
      course,
      gender,
      referallId,
      profilePicture
    });

    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiError(500, "Something went wrong while registering"));
  }
};

const Login = async (req, res) => {
  try {
    const { email, ABH_ID, password } = req.body;

    if ((!email && !ABH_ID) || !password) {
      return res
        .status(400)
        .json(new ApiError(400, "Email/ABH_ID and Password are required"));
    }

    const user = await User.findOne(email ? { email } : { ABH_ID });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(new ApiError(400, "Invalid credentials"));
    }

    const token = generateToken(user);

    res.cookie("user", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(new ApiResponse(200, user, "Login successful"));
  } catch (error) {
    console.log(error);

    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

// get All Users
// [eventsParticipated, ABH_ID, fullName, email, phoneNumber, institution]
const getUsers = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const order = req.query.order;
    const sortDirection = order === "asc" ? 1 : -1;

    let query = {
      ...(req.body.fullName && { fullName: req.body.fullName }),
      ...(req.body.ABH_ID && { ABH_ID: req.body.ABH_ID }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.phoneNumber && { phoneNumber: req.body.phoneNumber }),
      ...(req.body.eventsParticipated &&
        req.body.eventsParticipated !== "All" && {
          eventsParticipated: req.body.eventsParticipated,
        }),
      ...(req.body.institution && { institution: req.body.institution }),
    };

    let Users = await User.find(query)
      .populate("eventsParticipated") // Populating the referenced events
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      Users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete User
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
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

// Update User Details
const updateUser = async (req, res) => {
  try {
    
    const { email, ABH_ID, ...updateData } = req.body;
  

    if (!email && !ABH_ID) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Email or ABH_ID is required to update user details"
          )
        );
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json(new ApiError(400, "Update data is required"));
    }

    delete updateData.ABH_ID;
    delete updateData.phoneNumber;
    delete updateData.email;

    const user = await User.findOneAndUpdate(
      { $or: [{ email }, { ABH_ID }] },
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

const eventRegister = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json(new ApiError(400, "Event ID is required"));
    }

    const user = req.user; // Access user from req object
    const event = await Events.findOne({ eventId });

    if (!event) {
      return res.status(404).json(new ApiError(404, "Event not found"));
    }

    if (user.eventsParticipated?.includes(eventId)) {
      return res
        .status(400)
        .json(new ApiError(400, "User already registered for this event"));
    }

    user.eventsParticipated.push(eventId);
    await user.save();

    const populatedUser = await User.findById(user._id).populate({
      path: "eventsParticipated",
      model: "Events",
      match: { eventId: { $exists: true } },
      select: "eventId eventName category",
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          populatedUser,
          "User registered for event successfully"
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

// Unregister Event
const unregisterEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json(new ApiError(400, "Event ID is required"));
    }

    const user = req.user;

    if (!user.eventsParticipated?.includes(eventId)) {
      return res
        .status(400)
        .json(new ApiError(400, "User is not registered for this event"));
    }

    user.eventsParticipated = user.eventsParticipated.filter(
      (event) => event !== eventId
    );
    await user.save();

    const populatedUser = await User.findById(user._id).populate({
      path: "eventsParticipated",
      model: "Events",
      match: { eventId: { $exists: true } },
      select: "eventId eventName category",
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          populatedUser,
          `User unregistered successfully from event ${eventId}`
        )
      );
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};



module.exports = {
  registerUser,
  Login,
  getUsers,
  deleteUser,
  updateUser,
  eventRegister,
  unregisterEvent,
};
