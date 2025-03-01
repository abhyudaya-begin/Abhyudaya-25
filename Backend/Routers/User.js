import { Router } from "express";
import { deleteUser, eventRegister, registerUser, unregisterEvent, updateUser } from "../Controllers/User";
import { generateUser } from "../Controllers/username";
import { authLimit } from "../authentication/whatAppAuth";


userRoute=Router();

userRouter.get("/register", registerUser);
userRouter.delete("/deleteUser", deleteUser);
userRouter.post("/update", updateUser);
userRouter.post("/unregisterEvent", unregisterEvent);
userRouter.post("/eventRegister", eventRegister);
userRoute.get("/username",generateUser);
userRoute.post("/verifyCode",authLimit)

export default userRoute;