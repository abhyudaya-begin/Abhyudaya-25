const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const Connection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((e) => console.log(e));
};


module.exports = {Connection}