import { Router } from "express";
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from "../Controllers/Events";
const eventRouter = Router();

eventRouter.get("/", getAllEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", createEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);
//  post ->events add

export default eventRouter;
