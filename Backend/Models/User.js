const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseOptions = [
  "B.Tech", "BCA", "BBA", "MBA", "B.Pharm", "MCA",
  "Diploma", "B.Com", "BA", "B.Sc", "M.Sc", "Others", "Phd"
];

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
      required:true
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: [true, "Date of Birth is required"],
      validate: [
        {
          validator: function (value) {
            return value < new Date();
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
              return age - 1 >= 5;
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
    course: {
      type: String,
      enum: courseOptions,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    referallId: {
      type: String,
    },
    isCampusAmbassador: {
      type: Boolean,
      default: false,
    },
    referrals: {
      type: [String], // Array of ABH_ID strings
      validate: {
        validator: function (value) {
          // Only validate if referrals are provided
          if (value && value.length > 0) {
            return this.isCampusAmbassador;
          }
          return true; // Allow empty or undefined referrals
        },
        message: "Only Campus Ambassadors can have referrals",
      },
      default: undefined, // Make sure it's undefined if not provided
    },
    
    eventsParticipated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
