import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  Calendar1Icon,
  Crown,
  GraduationCap,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Phone,
} from "lucide-react";
import { BsGenderAmbiguous } from "react-icons/bs";

// Form validation schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    course: z.string().min(2, "Course must be at least 2 characters"),
    dob: z.string().nonempty("Date of Birth is required"),
    contact: z.string().min(10, "Phone number must be at least 10 characters"),
    gender: z.string().nonempty("gender shiuld be selected"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
const courses = ["B.Tech", "BBA", "MBA", "B.Pharm", "Others"];
const gender=["Male","Female","Others"];
function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const[loggedIn, setloggedIn] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "",
      course: "",
      dob: "",
      password: "",
      confirmPassword: "",
      contact: "",
    },
  });

  const onSignIn = (data) => {
    //send from here sign in
    console.log("Sign In:", data);
    localStorage.setItem("data", JSON.stringify(data));
    alert("coming soon");
  };

  const onSignUp = (data) => {
    //send from here register
    console.log("Sign Up:", data);
    alert("coming soon");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-400 to-blue-900 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <img
              src="..\src\assets\Logo-images\Abhyudaya.png"
              alt="Abhyudaya"
              className="h-8 w-auto"
            />
            <button
              className="px-6 py-2 text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 hover:shadow-lg transition-all duration-300"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>

          <h1 className="text-2xl font-bold text-white text-center">
            {isSignUp ? "SIGN UP" : "LOG IN"}
          </h1>

          {!isSignUp ? (
            <form
              onSubmit={signInForm.handleSubmit(onSignIn)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="email"
                    placeholder="E-mail address"
                    {...signInForm.register("email")}
                    className="w-full px-10 py-2 bg-white/10  border hover:shadow-md border-white/20 rounded-lg  text-white/ placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                {signInForm.formState.errors.email && (
                  <p className="text-sm text-pink-200">
                    {signInForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="password"
                    placeholder="Password"
                    {...signInForm.register("password")}
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
                {signInForm.formState.errors.password && (
                  <p className="text-sm text-pink-200">
                    {signInForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...signInForm.register("rememberMe")}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-pink-400 focus:ring-pink-400"
                />
                <label className="text-sm text-white">Keep me logged in</label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg transition-colors"
              >
                SIGN IN
              </button>
            </form>
          ) : (
            <form
              onSubmit={signUpForm.handleSubmit(onSignUp)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...signUpForm.register("name")}
                    className="w-full px-10 py-2 bg-white/10 hover:shadow-md border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                {signUpForm.formState.errors.name && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="email"
                    placeholder="E-mail address"
                    {...signUpForm.register("email")}
                    className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                {signUpForm.formState.errors.email && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <BsGenderAmbiguous className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <select
                    {...signUpForm.register("gender", {
                      required: "gender selection is required",
                    })}
                    className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
                  >
                    <option className="text-white/60" value="" disabled>
                      Select your gender
                    </option>
                    {gender.map((gender) => (
                      <option
                        className="bg-black/25"
                        key={gender}
                        value={gender}
                      >
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                {signUpForm.formState.errors.gender && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.geder.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <select
                    {...signUpForm.register("course", {
                      required: "Course selection is required",
                    })}
                    className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 appearance-none"
                  >
                    <option value="" disabled>
                      Select your course
                    </option>
                    {courses.map((course) => (
                      <option
                        className="bg-black/25"
                        key={course}
                        value={course}
                      >
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
                {signUpForm.formState.errors.course && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.course.message}
                  </p>
                )}
              </div>
              
              

              <div className="space-y-1">
                <div className="relative">
                  <Calendar1Icon className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    max={new Date().toISOString().split("T")[0]} // Restricts future dates
                    {...signUpForm.register("dob")}
                    className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                {signUpForm.formState.errors.dob && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.dob.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...signUpForm.register("contact")}
                    className="w-full px-10 py-2 bg-white/10 border hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                {signUpForm.formState.errors.contact && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.contact.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...signUpForm.register("password")}
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
                {signUpForm.formState.errors.password && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/60" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...signUpForm.register("confirmPassword")}
                    className="w-full px-10 py-2 bg-white/10 border  hover:shadow-md border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                {signUpForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-pink-200">
                    {signUpForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-pink-400 hover:bg-pink-500 text-white rounded-lg transition-colors"
              >
                CREATE ACCOUNT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
