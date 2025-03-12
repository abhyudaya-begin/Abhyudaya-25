import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchEvents } from "../Redux/EventThunks";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function SignInForm() {
  const [clicked, setClicked] = useState(false);
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const dispatch = useDispatch();
  
  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    try {
      setClicked(true);
      console.log(import.meta.env.VITE_BACKEND_API_URL);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}users/login`,
        data,
        {
          withCredentials: true, // This sends cookies to backend
        }
      );
      
      dispatch(setUser( res.data.data )); // Dispatch user data to Redux
      dispatch(fetchEvents());
      toast.success("Sign In Successful");
    } catch (error) {
      toast.error(error.response.data.errorMessage || "Sign In Failed");
    } finally {
      setClicked(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-2 top-3 text-white" />
        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 pl-10 rounded-lg bg-white/20 text-white outline-none"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-2 top-3 text-white" />
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full p-2 pl-10 rounded-lg bg-white/20 text-white outline-none"
        />
      </div>
      <button
        disabled={clicked}
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg text-white hover:from-pink-600 hover:to-purple-600"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
