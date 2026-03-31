import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

function SignUp() {
  const navigate = useNavigate();
  function handleCreate(e) {
    e.preventDefault();
    toast.success("Account registered");
    (setTimeout(() => navigate("/")), 800);
  }
  return (
    <div className="flex items-center justify-center bg-gray-700  w-screen h-screen">
      <div className=" bg-gray-800 w-[90%] h-[80%] sm:h-[80%] sm:w-[30%] rounded-3xl">
        <h1 className="text-center font-extrabold text-4xl text-gray-200">
          Create account
        </h1>
        <form
          className=" flex flex-col gap-4 h-[80%] w-full"
          onSubmit={handleCreate}
        >
          <div className="flex flex-col items-center mt-4">
            <label className="font-semibold mb-1 text-gray-200">Username</label>
            <input
              type="text"
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Set a username"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <label className="font-semibold mb-1 text-gray-200">Gmail</label>
            <input
              type="text"
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter gmail"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <label className="font-semibold mb-1 text-gray-200">Password</label>
            <input
              type="password"
              className="w-[90%] px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Set a password"
            />
          </div>
          <div className="flex flex-col items-center mt-4">
            <button
              type="submit"
              className="w-[90%] bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default SignUp;
