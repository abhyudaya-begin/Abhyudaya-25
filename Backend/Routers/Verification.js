const { Router } = require("express");
const { Send, Verify } = require("../authentication/Email");

const VerificationRouter = Router();


VerificationRouter.post("/email", Send);
VerificationRouter.get("/email", Verify);

module.exports = VerificationRouter;
