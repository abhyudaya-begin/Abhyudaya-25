const express = require("express");
const eventRouter = require("./Routers/Events");
const userRouter = require("./Routers/User");
const VerificationRouter = require("./Routers/Verification");
const { Connection } = require("./Connection");
const { attachUserWithTokenVerification} = require("./authentication/UserAuth");
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
const cors = require("cors");
const { checkUser } = require("./authentication/Middleware");
dotenv.config();

Connection(); // for connecting DB

const corsOptions = {
  origin: [process.env.APPLICATION_URL, "http://localhost:8000"],
  credentials: true
};

// app creation
const app = express();

// setting middlewares here.
app.use(cors(corsOptions));
app.use(express.json());
app.use(attachUserWithTokenVerification);

// Ping request testing
app.get("/", (req, res) => {
  res.send("Ping from the server !");
});

app.use("/events", eventRouter);
app.use("/user", userRouter);
app.use("/verify", checkUser,  VerificationRouter);

// ....................................................................
app.listen(PORT, () => {
  console.log("Server Running at Port " + PORT);
});
