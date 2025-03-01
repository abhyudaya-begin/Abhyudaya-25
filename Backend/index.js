const express = require("express");
const mongoose = require("mongoose");
const eventRouter = require("./Routers/Events");
const userRouter = require("./Routers/User");
const VerificationRouter = require("./Routers/Verification");
const dotenv = require("dotenv");
dotenv.config();

// ..................................................................
// Connect()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((e) => console.log(e));

const app = express();
app.use(express.json());
//  1st route
app.get("/", (req, res) => {
  res.send("Ping from the server !");
});

app.use("/events", eventRouter); // Aditi
app.use("/user", userRouter); // Aditi
app.use("/verify", VerificationRouter);


// ....................................................................
app.listen(8000, () => {
  console.log("Server Running at Port " + 8000);
});
