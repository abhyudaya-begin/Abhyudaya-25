const { Router } = require("express");
const { deleteUser,  registerUser, updateUser, getUsers , Login} = require("../Controllers/User");
const { eventRegister, FetchEventsForUsers } = require("../Controllers/EventHandling");
const { checkAdmin, checkUser } = require("../authentication/Middleware");

const userRouter=Router();


userRouter.post("/", registerUser);
userRouter.post("/login",  Login);
userRouter.get("/all",   getUsers);
userRouter.delete("/", checkAdmin, deleteUser);
userRouter.put("/",checkUser,  updateUser);
userRouter.get("/fetchEvents", checkUser,  FetchEventsForUsers);
userRouter.post("/eventRegister", checkUser, eventRegister);



module.exports =  userRouter;
