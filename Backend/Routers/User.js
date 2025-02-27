const { Router } = require("express");
const { deleteUser, eventRegister, registerUser, unregisterEvent, updateUser } = require("../Controllers/User");
const { generateUser } = require("../Controllers/username");
const { authLimit } = require("../authentication/whatAppAuth");


userRoute=Router();

userRouter.post("/register", registerUser);
userRouter.delete("/deleteUser", deleteUser);
userRouter.post("/update", updateUser);
userRouter.post("/unregisterEvent", unregisterEvent);
userRouter.post("/eventRegister", eventRegister);
userRoute.get("/username",generateUser);
userRoute.post("/verifyCode",authLimit)
module.exports =  userRouter;