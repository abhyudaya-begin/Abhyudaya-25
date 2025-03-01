
const { Router } = require("express");
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require("../Controllers/Events");
const eventRouter = Router();
eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", createEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);
//  post ->events add

module.exports =  eventRouter;
