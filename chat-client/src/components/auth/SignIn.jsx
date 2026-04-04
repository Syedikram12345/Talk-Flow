import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/auth/signIn",
        { email, password },
        { withCredentials: true },
      );
      toast.success("Logged in");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signin failed");
    }
  }
  return (
    <div className="flex items-center justify-center bg-gray-700  w-screen h-screen">
      <div className=" bg-gray-800 w-[90%] h-[80%] sm:h-[80%] sm:w-[30%] rounded-3xl">
        <h1 className="text-center font-extrabold text-4xl text-gray-200">
          Welcome back
        </h1>
        <form
          className=" flex flex-col gap-4 h-[80%] w-full"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col items-center mt-4">
            <label className="font-semibold mb-1 text-gray-200">Gmail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter gmail"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <label className="font-semibold mb-1 text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Your password"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="w-[90%] bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
          <div className="text-center text-gray-300">
            <Link className="text-xs underline" to="/signUp">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default SignIn;
