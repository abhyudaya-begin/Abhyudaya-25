const { Router } = require("express");
const { deleteUser, eventRegister, registerUser, unregisterEvent, updateUser, getUsers , Login} = require("../Controllers/User");
const { checkAdmin, checkUser } = require("../authentication/Middleware");

const userRouter=Router();


userRouter.post("/", registerUser);
userRouter.get("/",  Login);
userRouter.get("/all",checkAdmin,  getUsers);
userRouter.delete("/", checkAdmin, deleteUser);
userRouter.put("/",checkUser,  updateUser);
userRouter.post("/unregisterEvent", checkUser,  unregisterEvent);
userRouter.post("/eventRegister", checkUser, eventRegister);



module.exports =  userRouter;
