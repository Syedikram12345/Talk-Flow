import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Chats() {
  const [selected, setSelected] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const { chatList, deleteChat } = useOutletContext();

  return (
    <div className="h-full flex w-full text-gray-100">
      <div className="min-w-[25vw] h-full overflow-y-auto bg-gray-800 border-t-2 border-blue-500">
        <div className="p-4 text-xl font-semibold border-b border-gray-700">
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
              className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                selected === index
                  ? "bg-gray-700 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <p className="font-bold">{chat.name}</p>
              <p className="text-sm text-gray-400">{chat.lastMsg}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full border-t-4 border-blue-500 bg-gray-900">
        {selected !== null ? (
          <>
            <div className="p-4 border-b border-gray-700 sticky top-0 z-10 flex justify-between bg-gray-800">
              <div>
                <h2 className="font-semibold text-lg">{currentChat}</h2>
                <p className="text-xs text-gray-400">
                  ID : {chatList[selected].uniqueId}
                </p>
              </div>
              <button
                onClick={() => {
                  deleteChat(chatList[selected].uniqueId);
                  setSelected(null);
                  setCurrentChat(null);
                }}
                className="bg-red-500 text-white py-1 px-2 rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="max-w-[70%] bg-gray-700 p-3 rounded-xl shadow-sm border border-gray-600">
                Hey! How are you?
              </div>

              <div className="max-w-[70%] ml-auto bg-blue-500 text-white p-3 rounded-xl shadow-sm">
                I'm good bro, working on my chat app!
              </div>
            </div>

            <div className="p-3 border-t border-gray-700 flex gap-2 bg-gray-800">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition text-white">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
