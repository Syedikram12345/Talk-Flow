import React, { useState } from "react";
import axios from "axios";
import getProfile from "@/utils/getProfile";
import { toast } from "sonner";

function Feedback() {
  const [input, setInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setInput("");
    if (input === "") return;
    try {
      const { uuid } = await getProfile();
      await axios.post(
        "http://localhost:3000/api/feedback-submission",
        { user_unique_id: uuid, feedback: input },
        { withCredentials: true },
      );
      toast.success("Feedback submitted");
    } catch (err) {
      console.log("Error in front end feedback", err);
      toast.error("Something went wrong");
    }
  }
  function feedbackChange(event) {
    const value = event.target.value;
    setInput(value);
  }
  return (
    <div className="flex h-full items-center justify-center">
      <div className=" w-full max-w-md h-[80%] sm:h-[90%] bg-gray-800 rounded-2xl p-6 shadow-md">
        <h1 className="font-extrabold text-center text-3xl mb-6 text-white">
          We value your opinion
        </h1>
        <div className=" h-[80%] overflow-hidden flex justify-center flex-col">
          <form>
            <textarea
              onChange={feedbackChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring"
              placeholder="Write your feedback here..."
              rows={4}
              value={input}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Feedback;
