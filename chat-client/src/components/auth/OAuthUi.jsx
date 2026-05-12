import React from "react";

export default function OAuthUi({ isMobileView }) {
  return (
    <div
      className={`bg-gray-800 w-[90%] h-[80%] sm:h-[40%] sm:w-[30%] rounded-3xl flex flex-col pb-6 ml-6 ${isMobileView ? "hidden" : "block"}`}
    >
      <div className="h-[50%] w-full  flex items-center justify-center">
        <button
          className="
    w-[80%]
    py-3
    rounded-xl
    bg-white
    text-gray-900
    font-semibold
    text-sm
    sm:text-base
    shadow-md
    hover:scale-[1.02]
    hover:bg-gray-100
    transition-all
    duration-200
  "
        >
          Continue with Google
        </button>
      </div>
      <div className="h-[50%] w-full flex items-center justify-center">
        <button
          className="
    w-[80%]
    py-3
    rounded-xl
    bg-[#171515]
    text-white
    font-semibold
    text-sm
    sm:text-base
    shadow-md
    hover:scale-[1.02]
    hover:bg-black
    transition-all
    duration-200
  "
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
