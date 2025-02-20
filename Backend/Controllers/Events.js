const { Events } = require("../Models/Events");
const { v4: uuidv4 } = require("uuid");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    let filter = {};
    const {
      category,
      eventType,
      minPrize,
      maxPrize,
      teamType,
      noOfRounds,
      eventName,
    } = req.query;

    if (category) filter.category = category;
    if (eventType) filter.eventType = eventType;
    if (teamType) filter.teamType = teamType;
    // if (eventName) filter.eventName = eventName;
    if (eventName) filter.eventName = { $regex: eventName, $options: "i" };
    if (noOfRounds) filter.noOfRounds = Number(noOfRounds);
    if (minPrize || maxPrize) {
      filter.prize = {};
      if (minPrize) filter.prize.$gte = Number(minPrize);
      if (maxPrize) filter.prize.$lte = Number(maxPrize);
    }

    const events = await Events.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id);
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
    res
      .status(500)
      .json({ error: "Failed to create event", details: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Events.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Events.findByIdAndDelete(req.params.id);
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
