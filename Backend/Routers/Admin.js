const { Router } = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../Controllers/Events");
const { AdminLogin } = require("../Admin/Admin_Controller");
const {Send, Verify} = require('../Admin/EmailForLogin');
const { movePendingToPaid, getAllUserTransactions, removePendingTransaction } = require("../Controllers/EventHandling");
const { checkAdmin } = require("../authentication/Middleware");

const adminRouter = Router();

// Events manipulation
// adminRouter.post("events/", checkAdmin, createEvent);
// adminRouter.put("events/:id", updateEvent);
// adminRouter.delete("events/:id", deleteEvent);

// USer login and all
adminRouter.post("/user", AdminLogin);
adminRouter.post("/send-email",  Send);
adminRouter.post("/verify-email", Verify);

// Users per events.
//

//Payment Handlings and all

adminRouter.post("/payment", checkAdmin,  movePendingToPaid);
adminRouter.post("/pay-delete", checkAdmin,  removePendingTransaction);
adminRouter.get("/transactions", checkAdmin,  getAllUserTransactions);
// 

//Sponsors Upload.
//

// LeaderBoard for CA
//

module.exports = adminRouter;
