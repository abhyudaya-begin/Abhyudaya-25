const { ApiError } = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse"); // Adjust the path if needed

const { User } = require("../Models/User.js");
const { Events } = require("../Models/Events.js");
const { generateUser } = require("./username.js");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../authentication/UserAuth.js");

const eventRegister = async (req, res) => {
  try {
    const { trxnId, events } = req.body;
    console.log(req.body);

    if (!trxnId || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json(new ApiError(400, "Invalid event data"));
    }

    // ✅ Extract event IDs from the array
    const eventIds = events.map((event) => event.eventId);

    // ✅ Validate if all events exist
    const eventDocs = await Events.find({ eventId: { $in: eventIds } });

    if (eventDocs.length !== events.length) {
      return res.status(404).json(new ApiError(404, "Some events not found"));
    }

    // ✅ Use `findOneAndUpdate` to update `eventsPending`
    const updatedUser = await User.findOneAndUpdate(
      { ABH_ID: req.user.ABH_ID }, // Find user by ID
      {
        $set: { [`eventsPending.${trxnId}`]: events }, // Set new event objects under transaction ID
      },
      { new: true, upsert: true } // Return updated user & create if missing
    );

    if (!updatedUser) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { user: updatedUser }, "Events added to pending")
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};

const movePendingToPaid = async (req, res) => {
  try {
    const { trxnId, ABH_ID } = req.body;

    if (!trxnId) {
      return res.status(400).json(new ApiError(400, "Transaction ID is required"));
    }

    // ✅ Fetch the user's pending events for the given transaction ID
    const user = await User.findOne({ ABH_ID });

    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found"));
    }

    // ✅ Retrieve the events from Map using `.get()`
    const eventsToMove = user.eventsPending.get(trxnId); 

  

    if (!eventsToMove || eventsToMove.length === 0) {
      return res.status(404).json(new ApiError(404, "No events found for this transaction"));
    }

    // ✅ Move events from `eventsPending` to `eventsPaid`
    user.eventsPending.delete(trxnId); // Remove from pending
    user.eventsPaid.set(trxnId, eventsToMove); // Move to paid

    await user.save(); // Save changes

    return res.status(200).json(
      new ApiResponse(200, { user }, "Events moved to paid successfully")
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};


const getAllUserTransactions = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return res.status(404).json(new ApiError(404, "No transactions found"));
    }

    let transactions = [];

    users.forEach((user) => {
      // Extract pending transactions
      user.eventsPending.forEach((events, trxnId) => {
        transactions.push({
          trxnId,
          ABH_ID: user.ABH_ID,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          status: "Pending",
          events,
        });
      });

      // Extract paid transactions
      user.eventsPaid.forEach((events, trxnId) => {
        transactions.push({
          trxnId,
          ABH_ID: user.ABH_ID,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          status: "Paid",
          events,
        });
      });
    });

    return res.status(200).json(
      new ApiResponse(200, { transactions }, "Transactions fetched successfully")
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "Something went wrong!"));
  }
};



const FetchEventsForUsers = async (req, res) => {
  try {
    const user = await User.findOne({ ABH_ID: req.user.ABH_ID }).lean();

    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        status: false,
        message: "User not found",
      });
    }

    // Extract pending and paid events
    const eventsPending = user.eventsPending || {};
    const eventsPaid = user.eventsPaid || {};

    return res.status(200).json({
      statuscode: 200,
      status: true,
      message: "Events fetched successfully",
      eventsPending, eventsPaid ,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      statuscode: 500,
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  eventRegister,
  FetchEventsForUsers,
  movePendingToPaid,
  getAllUserTransactions
};
