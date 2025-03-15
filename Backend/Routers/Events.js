
const { Router } = require("express");
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../Controllers/Events");
const { checkAdmin } = require("../authentication/Middleware");
const eventRouter = Router();

// User

// GET : /event
eventRouter.get("/all", getAllEvents);

// GET : event/eve_id 
eventRouter.get("/:id", getEventById);



module.exports =  eventRouter;
