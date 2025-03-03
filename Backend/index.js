const express = require("express");
const eventRouter = require("./Routers/Events");
const userRouter = require("./Routers/User");
const VerificationRouter = require("./Routers/Verification");
const { Connection } = require("./Connection");
const { attachUserWithTokenVerification } = require("./authentication/UserAuth");
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
const cors = require("cors");
const { checkUser } = require("./authentication/Middleware");
dotenv.config();

Connection(); // Connecting DB

const corsOptions = {
  origin: "https://abhyudaya-25-nine.vercel.app",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// App creation
const app = express();

app.use(cors(corsOptions)); // Use CORS globally
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(express.json());
app.use(attachUserWithTokenVerification);

// Ping request testing
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://abhyudaya-25-nine.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("Ping from the server!");
});

app.use("/events", eventRouter);
app.use("/user", userRouter);
app.use("/verify", checkUser, VerificationRouter);

// Start Server
app.listen(PORT, () => {
  console.log("Server Running at Port " + PORT);
});
