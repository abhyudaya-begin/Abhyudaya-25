const { Events } = require("../Models/Events");

const { v4: uuidv4 } = require("uuid");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
   
    const order = req.query.order;
    const sortDirection = order === "asc" ? 1 : -1;

    let query = {
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.eventType && { eventType: req.query.eventType }),
      ...(req.query.teamType && { teamType: req.query.teamType }),
      ...(req.query.eventName && {
        eventName: { $regex: req.query.eventName, $options: "i" },
      }),
      ...(req.query.noOfRounds && {
        noOfRounds: Number(req.query.noOfRounds),
      }),
    };

    if (req.query.minPrize || req.query.maxPrize) {
      query.participationFee = {};
      if (req.query.minPrize)
        query.participationFee.$gte = Number(req.query.minPrize);
      if (req.query.maxPrize)
        query.participationFee.$lte = Number(req.query.maxPrize);
    }

    console.log("Query:", query);

    const events = await Events.find(query)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
   

    res.status(200).json({
      status: true,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Events.findOne({ eventId: req.params.id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve event" });
  }
};

// Create an event
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      description,
      category,
      eventType,
      teamType,
      noOfRounds,
      rules,
    } = req.body;

    if (
      !eventName ||
      !description ||
      !category ||
      !eventType ||
      !teamType ||
      !noOfRounds ||
      !rules
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    req.body.uniqueId = uuidv4();
    req.body.prize = Number(req.body.prize) || 0;
    req.body.participationFee = Number(req.body.participationFee) || 0;

    const newEvent = new Events(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create event", details: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Events.findOneAndUpdate(
      { eventId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Events.findOneAndDelete({eventId: req.params.id});
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};

//
