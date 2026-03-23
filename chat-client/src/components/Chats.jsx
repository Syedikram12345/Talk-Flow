import React, { useState } from "react";

function Chats() {
  const [selected, setSelected] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const [chatList, setChatList] = useState([
    { name: "Ikram", lastMsg: "You: Hello ", uniqueId: 100 },
    { name: "Ateeb", lastMsg: "Bro where are you?", uniqueId: 101 },
    { name: "Aliza", lastMsg: "Okay ", uniqueId: 102 },
  ]);

  function addChat(newChat) {
    setChatList((prev) => [...prev, newChat]);
  }

  return (
    <div
      className={`h-screen rounded-tl-xl bg-[#FFC8DD] text-gray-900 w-full mb-1 flex`}
    >
      <div className="min-w-[25vw]">
        <div className="p-4 text-xl font-semibold border-t border-b   border-gray-600">
          Chats
        </div>
        <div>
          {chatList.map((chat, index) => (
            <div
              key={index}
              id={index}
              onClick={() => {
                setSelected(index);
                setCurrentChat(chat.name);
              }}
              className={`p-4 border-b border-gray-400 hover:bg-rose-300 cursor-pointer ${selected === index ? "bg-rose-300" : ""}`}
            >
              <p className="font-bold">{chat.name}</p>
              <p className="text-sm text-gray-700">{chat.lastMsg}</p>
            </div>
          ))}
        </div>
      </div>
      {selected !== null ? (
        <div className="min-w-[70vw]">
          <div className="h-screen w-full bg-white flex flex-col">
            <div className="p-4 border-b border-gray-300 bg-white sticky top-0 z-10">
              <h2 className="font-semibold text-lg">{currentChat}</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              <div className="max-w-[70%] bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                Hey! How are you?
              </div>

              <div className="max-w-[70%] ml-auto bg-[#FFC8DD] text-gray-900 p-3 rounded-xl shadow-sm">
                I'm good bro, working on my chat app!
              </div>
            </div>

            <div className="p-3 border-t border-gray-300 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
              />
              <button className="px-4 py-2 bg-[#FFAFCC] rounded-lg font-medium">
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full bg-white flex items-center justify-center text-gray-600">
          Select a chat
        </div>
      )}
    </div>
  );
}

export default Chats;
