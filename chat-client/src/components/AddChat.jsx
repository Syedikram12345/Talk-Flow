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
    setChat((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-md">
        <h1 className="font-extrabold text-center text-3xl mb-6 text-gray-100">
          Add New Chat
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-100">
              Chat Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Enter chat name..."
              value={chat.name}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-100">
              Unique ID
            </label>
            <input
              onChange={handleChange}
              name="uniqueId"
              type="text"
              placeholder="Enter unique ID..."
              value={chat.uniqueId}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddChat;
