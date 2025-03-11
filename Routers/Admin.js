const { Router } = require("express");
const { adduser, deleteUser, removeUser } = require("../Controllers/Admin.js");
const AdminRouter = Router();

AdminRouter.post("/", adduser);
AdminRouter.delete("/", deleteUser);
AdminRouter.post("/remove", removeUser);

module.exports = AdminRouter ;
