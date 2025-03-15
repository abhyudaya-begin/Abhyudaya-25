const mongoose = require("mongoose");
const { Schema } = mongoose;



const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    year: {
        type: Number,
        required: true,
     
      },
      rollNumber: {
        type: Number,
        required: true,
        unique: true,
      }
  },
  { timestamps: true }
);

const Admin_model = mongoose.model("Admin", userSchema);
module.exports = { Admin_model };
