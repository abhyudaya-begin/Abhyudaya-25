const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
// [ABH_ID, fullName, email, phoneNumber, dob, password, institution]
// [eventsParticipated ]
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    ABH_ID: {
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
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"], // Custom message if not provided
      validate: [
        {
          validator: function (value) {
            return value < new Date(); // Prevent future dates
          },
          message: "Date of Birth cannot be in the future",
        },
        {
          validator: function (value) {
            const today = new Date();
            const age = today.getFullYear() - value.getFullYear();
            const monthDiff = today.getMonth() - value.getMonth();
            const dayDiff = today.getDate() - value.getDate();

            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
              return age - 1 >= 5; // Adjust age if birthday hasn't occurred yet
            }
            return age >= 5;
          },
          message: "User must be at least 5 years old",
        },
      ],
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },
    eventsParticipated: [
      {
        type: mongoose.Schema.Types.ObjectId, // Store reference to Event model
        ref: "Events", // Reference the "Events" model
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
