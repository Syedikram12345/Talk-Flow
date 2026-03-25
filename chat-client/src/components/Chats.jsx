import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Chats() {
  const [selected, setSelected] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const { chatList, deleteChat } = useOutletContext();

  const indicatorColor = "border-blue-500";

  return (
    <div className="h-screen rounded-tl-xl bg-gray-900 text-gray-100 w-full mb-1 flex">
      <div className="min-w-[25vw] overflow-y-auto bg-gray-800">
        <div className="p-4 text-xl font-semibold border-t border-b border-gray-700">
          Chats
        </div>
        <div>
          {chatList.map((chat, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(index);
                setCurrentChat(chat.name);
              }}
              className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer flex items-center ${
                selected === index
                  ? `border-l-4 ${indicatorColor} bg-gray-700`
                  : "border-l-4 border-transparent"
              }`}
            >
              <div className="flex-1">
                <p className="font-bold text-gray-100">{chat.name}</p>
                <p className="text-sm text-gray-400">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected !== null ? (
        <div className="min-w-[70vw]">
          <div className="h-screen w-full bg-gray-900 flex flex-col">
            <div
              className={`p-4 border-t-4 ${indicatorColor} border-b border-gray-700 bg-gray-800 sticky top-0 z-10 flex justify-between`}
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-100">
                  {currentChat}
                </h2>
                <p className="text-xs text-gray-400">Online</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteChat(chatList[selected].uniqueId);
                    setSelected(null);
                    setCurrentChat(null);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-2xl transition"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
              <div className="max-w-[70%] bg-gray-800 text-gray-100 p-3 rounded-xl shadow-sm border border-gray-700">
                Hey! How are you?
              </div>

              <div className="max-w-[70%] ml-auto bg-gray-700 text-gray-100 p-3 rounded-xl shadow-sm">
                I'm good bro, working on my chat app!
              </div>
            </div>

            <div className="p-3 border-t border-gray-700 bg-gray-800 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-700 bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full bg-gray-900 flex items-center justify-center text-gray-400">
          Select a chat
        </div>
      )}
    </div>
  );
}

export default Chats;
