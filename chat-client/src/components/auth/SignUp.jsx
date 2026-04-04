import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  async function handleCreate(e) {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/auth/signUp",
        { email, password },
        { withCredentials: true },
      );
      toast.success("Account registered");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  }
  return (
    <div className="flex items-center justify-center bg-gray-700  w-screen h-screen ">
      <div className=" bg-gray-800 w-[90%] h-[80%] sm:h-[80%] sm:w-[30%] rounded-3xl flex flex-col pb-6">
        <h1 className="text-center font-extrabold text-4xl text-gray-200">
          Create account
        </h1>
        <form
          className=" flex flex-col gap-1 h-full w-full pb-3"
          onSubmit={handleCreate}
        >
          <div className="flex flex-col items-center mt-1">
            <label className="font-semibold mb-1 text-gray-200">
              First name
            </label>
            <input
              type="text"
              // value={fName}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="First name"
            />
          </div>
          <div className="flex flex-col items-center mt-3">
            <label className="font-semibold mb-1 text-gray-200">
              Last name
            </label>
            <input
              type="text"
              // value={lName}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Last name"
            />
          </div>
          <div className="flex flex-col items-center mt-3">
            <label className="font-semibold mb-1 text-gray-200">Gmail</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter gmail"
            />
          </div>
          <div className="flex flex-col items-center mt-3">
            <label className="font-semibold mb-1 text-gray-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Set a password"
            />
          </div>
          <div className="flex flex-col items-center mt-3">
            <button
              type="submit"
              className="w-[90%] bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Create
            </button>
          </div>
          <div className="text-center text-gray-300">
            <Link className="text-xs underline" to="/signIn">
              Sign in
            </Link>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default SignUp;
