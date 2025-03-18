const express = require("express");
const eventRouter = require("./Routers/Events");
const userRouter = require("./Routers/User");
const VerificationRouter = require("./Routers/Verification");
const { Connection } = require("./Connection");
const { attachUserWithTokenVerification } = require("./authentication/UserAuth");
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {checkAdmin} = require('./authentication/Middleware');
const adminRouter = require("./Routers/Admin");

dotenv.config();

Connection(); // Connect DB

const corsOptions = {
  origin: [process.env.APPLICATION_URL, process.env.DEPLOYED_URL],
  credentials: true,
 
};

const app = express();

// Enable CORS globally
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // This will handle preflight requests for all routes
app.use(cookieParser());
app.use(express.json());
app.use(attachUserWithTokenVerification);

// Ping request testing
app.get("/", (req, res) => {
 return  res.send({error: "The requested URL is not accessible!"});
});


// All Routers
app.use("/events", eventRouter);
app.use("/users", userRouter);
app.use("/verify",VerificationRouter);
app.use("/admin",  adminRouter);



app.listen(PORT, () => {
  console.log("Server Running at Port " + PORT);
});
