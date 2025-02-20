const express = require("express");
const mongoose = require("mongoose");
const eventRouter = require("./Routers/Events");
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
// Vinayak -> Users

// app.use('/email', ) -> Chandan

// ....................................................................
app.listen(8000, () => {
  console.log("Server Running at Port " + 8000);
});
