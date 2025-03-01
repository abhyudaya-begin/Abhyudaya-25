import mongoose, { Schema } from "mongoose";

// User Schema
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber:{
      type:Number,
      required:true,
      unique:true
    },
    eventsParticipated: [
      {
        type: String, // Store eventId as a reference
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
