const { Router } = require("express");
const { Send, Verify, sendContactEmail } = require("../authentication/Email");

const VerificationRouter = Router();


VerificationRouter.post("/email", Send);
VerificationRouter.post("/verify", Verify);
VerificationRouter.post("/contact", sendContactEmail);

module.exports = VerificationRouter;
