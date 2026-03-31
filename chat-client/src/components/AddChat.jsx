import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

function AddChat() {
  const { addChat } = useOutletContext();
  const [chat, setChat] = useState({ name: "", lastMsg: "", uniqueId: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setChat((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (chat.name === "" && chat.uniqueId === "") return;
    toast.success("Chat added");
    addChat(chat);
    setChat({ name: "", uniqueId: "" });
  }

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-md">
        <h1 className="font-extrabold text-center text-3xl mb-6 text-white">
          Add New Chat
        </h1>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-200">
              Chat Name
            </label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter chat name..."
              value={chat.name}
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-200">
              Unique ID
            </label>
            <input
              onChange={handleChange}
              name="uniqueId"
              type="text"
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter unique ID..."
              value={chat.uniqueId}
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddChat;
