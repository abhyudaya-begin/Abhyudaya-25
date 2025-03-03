import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import{Calendar, GraduationCap, Mail, Phone, University, User,Lock, Eye,
  EyeOff} from 'lucide-react';


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

const genderoption = ["Male", "Female"," Prefer not to say" ,"others"];

const signUpSchema = z
  .object({
    fullName: z.string().min(4, "Name must be at least 4 characters")
    .max(30, "Name must be at most 30 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number must be at most 10 characters"),
    institution: z.string().nonempty("Institution is required"),
    gender: z.string().nonempty("Gender can't be empty"),
    dob: z.string().nonempty("Date of Birth is required"),
    course: z.string().nonempty("Course is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function SignUpForm({ setIsSignUp }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const { confirmPassword, ...filteredData } = data;

      console.log(import.meta.env.VITE_BACKEND_API_URL);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}users/`,
        filteredData,
        {
          withCredentials: true, // This sends cookies to backend
        }
      );

      toast.success("Sign Up Successful");
      setIsSignUp(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage  || "Sign up Failed");
    
    }
  };
  const[showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
      <div className="relative">
      <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        <input
          {...register("fullName")}
          placeholder="Full Name"
          className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        </div>
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div className="space-y-1">
      <div className="relative">
      <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
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
        {errors.institution && <p className="text-red-500 text-sm">{errors.institution.message}</p>}
      </div>

      <div className="space-y-1">
      <div className="relative">
      <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
        <select
          {...register("gender")}
          className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">Select Gender</option>
          {genderoption.map((gender) => (
            <option  className="w-full p-2 rounded-lg bg-black/60 text-white outline-none" key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        </div>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
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
            <option className="w-full p-2 rounded-lg bg-black/60 text-white outline-none" key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        </div>
        {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
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
        {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
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
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg text-white hover:from-pink-600 hover:to-purple-600"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;