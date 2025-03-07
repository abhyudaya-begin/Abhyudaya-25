import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Calendar,
  GraduationCap,
  Mail,
  Phone,
  University,
  User,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import Otp from "./Otp";
import { useRef } from "react";
import ProfileImageUploader from "./ProfileImageUploader";

const courses = [
  "B.Tech",
  "BCA",
  "BBA",
  "MBA",
  "B.Pharm",
  "MCA",
  "Diploma",
  "B.Com",
  "BA",
  "B.Sc",
  "M.Sc",
  "Others",
];

const genderOptions = ["Male", "Female", "Prefer not to say", "Others"];

const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(4, "Name must be at least 4 characters")
      .max(30, "Name must be at most 30 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    institution: z.string().nonempty("Institution is required"),
    gender: z.string().nonempty("Gender can't be empty"),
    dob: z.string().nonempty("Date of Birth is required"),
    course: z.string().nonempty("Course is required"),
    referralId: z.string().optional(), // Fixed typo
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function SignUpForm({ setIsSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [image, setImage] = useState("https://placehold.co/100x100"); // Default Image

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const email = watch("email", ""); // Get email value from form, fixed empty space

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...filteredData } = data;

      // Include the image URL in the submission data
      const userDataWithImage = {
        ...filteredData,
        profileImage: image,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}users/`,
        userDataWithImage,
        {
          withCredentials: true, // This sends cookies to backend
        }
      );

      toast.success("Sign Up Successful");
      setIsSignUp(false);
    } catch (error) {
      toast.error(error.response?.data?.errorMessage || "Sign up Failed");
    }
  };

  const sendMail = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}verify/email`,
        { email },
        {
          withCredentials: true,
        }
      );
      if (res.status) {
        setIsOTPOpen(true);
        toast.success("OTP sent successfully");
      }
    } catch (err) {
      if (!email.trim()) {
        toast.error("Email is required");
      } else {
        toast.error("Email Already Exists!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ProfileImageUploader image={image} setImage={setImage} />

      <div className="space-y-1">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              {...register("email")}
              type="email"
              required
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <button
            type="button"
            onClick={sendMail}
            disabled={verified}
            className={`px-4 py-2 rounded-lg transition ${
              verified
                ? "bg-green-500 text-white cursor-default"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {verified ? <Check size={20} /> : "Verify"}
          </button>
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        {isOTPOpen && (
          <Otp
            props={{ email, setVerified }}
            onClose={() => setIsOTPOpen(false)}
          />
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            {...register("phoneNumber")}
            placeholder="Phone Number"
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <University className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            {...register("institution")}
            placeholder="Enter College name"
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {errors.institution && (
          <p className="text-red-500 text-sm">{errors.institution.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <select
            {...register("gender")}
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select Gender</option>
            {genderOptions.map((gender) => (
              <option
                className="w-full p-2 rounded-lg bg-black/60 text-white outline-none"
                key={gender}
                value={gender}
              >
                {gender}
              </option>
            ))}
          </select>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <select
            {...register("course")}
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option
                className="w-full p-2 rounded-lg bg-black/60 text-white outline-none"
                key={course}
                value={course}
              >
                {course}
              </option>
            ))}
          </select>
        </div>
        {errors.course && (
          <p className="text-red-500 text-sm">{errors.course.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            type="date"
            {...register("dob")}
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() - 5))
                .toISOString()
                .split("T")[0]
            } // Set max date to 5 years ago
          />
        </div>
        {errors.dob && (
          <p className="text-red-500 text-sm">{errors.dob.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            type="text"
            placeholder="Referral Id ABCD-1234 (Optional)"
            {...register("referralId")}
            className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-white/60"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!verified}
        className={`w-full p-2 rounded-lg text-white transition-all 
        ${
          verified
            ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;