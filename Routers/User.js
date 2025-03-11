const { Router } = require("express");
const { deleteUser, eventRegister, registerUser, unregisterEvent, updateUser, getUsers , Login} = require("../Controllers/User");
const { checkAdmin, checkUser } = require("../authentication/Middleware");

const userRouter=Router();


userRouter.post("/", registerUser);
userRouter.post("/login",  Login);
userRouter.get("/all",   getUsers);
userRouter.delete("/", checkAdmin, deleteUser);
userRouter.put("/",checkUser,  updateUser);
userRouter.post("/unregisterEvent", checkUser,  unregisterEvent);
userRouter.post("/eventRegister", checkUser, eventRegister);



module.exports =  userRouter;
