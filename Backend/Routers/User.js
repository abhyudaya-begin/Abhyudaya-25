const { Router } = require("express");
const { deleteUser, eventRegister, registerUser, unregisterEvent, updateUser } = require("../Controllers/User");
const { generateUser } = require("../Controllers/username");



const userRouter=Router();


userRouter.post("/register", registerUser);

userRouter.get("/register", registerUser);

userRouter.delete("/deleteUser", deleteUser);
userRouter.post("/update", updateUser);
userRouter.post("/unregisterEvent", unregisterEvent);
userRouter.post("/eventRegister", eventRegister);
userRouter.get("/username",generateUser);


module.exports =  userRouter;
