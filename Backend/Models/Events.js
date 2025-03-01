import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Music", "Dance", "Dramatics", "Fine Arts", "Poetry", "Other"],
    },
    eventType: {
      type: String,
      required: true,
      enum: ["Online", "Offline"],
    },
    teamType: {
      type: String,
      required: true,
      enum: ["Solo", "Duo", "Team"],
    },
    images: [
      {
        type: String, // URLs of images
      },
    ],
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    noOfRounds: {
      type: Number,
      required: true,
      min: 1,
    },
    prize: {
      type: Number,
      required: false,
      default: 0,
    },
    participationFee: {
      type: Number,
      required: false,
      default: 0,
    },
    rules: {
      type: [String],
      required: true,
    },
    registrationLink: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const Events = mongoose.model("Events", eventSchema);
