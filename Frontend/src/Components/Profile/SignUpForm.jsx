import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

const institutions = ["IIMT University", "IIMT Group of Colleges", "Others"];
const courses = ["B.Tech", "BBA", "MBA", "B.Pharm", "Others"];

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
    institution: z.string().nonempty("Institution is required"),
    dob: z.string().nonempty("Date of Birth is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function SignUpForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}users`, data);
      alert("Sign Up Successful");
    } catch {
      alert("Sign Up Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("fullName")}
        placeholder="Full Name"
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      />
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      />
      <input
        {...register("phoneNumber")}
        placeholder="Phone Number"
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      />
      <select
        {...register("institution")}
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      >
        {institutions.map((inst) => (
          <option key={inst} value={inst}>
            {inst}
          </option>
        ))}
      </select>
      <select
        {...register("course")}
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      >
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
      <input
        type="date"
        {...register("dob")}
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      />
      <input
        type="password"
        {...register("confirmPassword")}
        placeholder="Confirm Password"
        className="w-full p-2 rounded-lg bg-white/20 text-white outline-none"
      />
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
