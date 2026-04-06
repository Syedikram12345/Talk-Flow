import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function Chats() {
  const [selected, setSelected] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const { chatList, deleteChat } = useOutletContext();
  const [isMobileView, setIsMobileView] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  function sendMessage() {
    if (!text.trim()) return;

    const newMsg = {
      id: crypto.randomUUID(),
      text,
      sender: "me",
    };
    setMessages((prev) => [...prev, newMsg]);
    setText("");

    setTimeout(() => {
      const reply = {
        id: crypto.randomUUID(),
        text: "Bro I received your message!",
        sender: { currentChat },
      };

      setMessages((prev) => [...prev, reply]);
    }, 1000);
  }

  const deleteSingleMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="h-full flex w-full text-gray-100">
      <div
        className={`
    min-w-full sm:min-w-[25vw] h-[90%] sm:h-full overflow-y-auto bg-gray-800 border-t-2 border-blue-500 
    ${isMobileView ? "hidden" : "block"} 
    sm:block
  `}
      >
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
                if (window.innerWidth < 768) {
                  setIsMobileView(true);
                }
              }}
              className={`p-4 border-b border-gray-700 hover:bg-gray-600 cursor-pointer ${
                selected === index
                  ? "bg-gray-700 border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <p className="font-bold">{chat.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-[90%] sm:h-full border-t-4 border-blue-500 bg-gray-900">
        {selected !== null ? (
          <>
            <div className="p-4 border-b border-gray-700 sticky top-0 z-10 flex justify-between bg-gray-800">
              {isMobileView && (
                <button
                  onClick={() => setIsMobileView(false)}
                  className="text-white text-3xl sm:hidden"
                >
                  ⬅
                </button>
              )}
              <div>
                <h2 className="font-semibold text-lg">{currentChat}</h2>
                <p className="text-xs text-gray-400">
                  ID : {chatList[selected].unique_id}
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="rounded-3xl">
                    Delete Chat
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete chat?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this chat conversation.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      variant="outline"
                      onClick={() => {
                        deleteChat(chatList[selected].unique_id);
                        setSelected(null);
                        setCurrentChat(null);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[70%] p-3 rounded-xl shadow-sm ${
                    msg.sender === "me"
                      ? "ml-auto bg-blue-500 text-white relative group"
                      : "bg-gray-700 border border-gray-600"
                  }`}
                >
                  {msg.text}
                  <button
                    onClick={() => deleteSingleMessage(msg.id)}
                    className="absolute top-2 right-1 text-xs bg-red-500 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-700 flex gap-2 bg-gray-800">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition text-white"
              >
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
