import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function AddChat() {
  const { addChat } = useOutletContext();
  const [chat, setChat] = useState({
    name: "",
    lastMsg: "",
    uniqueId: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setChat((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    addChat(chat);
    setChat({
      name: "",
      uniqueId: "",
    });
  }
  return (
    <div className="min-h-screen w-full bg-[#FFC8DD] flex items-center justify-center p-4 rounded-2xl">
      <div className="w-full max-w-md bg-rose-100 rounded-2xl p-6 shadow-md">
        <h1 className="font-extrabold text-center text-3xl mb-6">
          Add New Chat
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Chat Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              className="w-full px-3 py-2 bg-white text-black rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter chat name..."
              value={chat.name}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Unique ID</label>
            <input
              onChange={handleChange}
              name="uniqueId"
              type="text"
              className="w-full px-3 py-2 bg-white text-black rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black outline-none"
              placeholder="Enter unique ID..."
              value={chat.uniqueId}
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddChat;
