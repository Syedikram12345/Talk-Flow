import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "sonner";

function App() {
  const [chatList, setChatList] = useState(() => {
    const saved = localStorage.getItem("chatList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatList", JSON.stringify(chatList));
  }, [chatList]);

  function addChat(chat) {
    if (chat.name === "" || chat.uniqueId === "") return;

    const exists = chatList.some((c) => c.uniqueId === chat.uniqueId);
    if (exists) {
      toast.error("User already exists!");
      return;
    }

    setChatList((prev) => [...prev, chat]);
  }

  function deleteChat(uniqueId) {
    setChatList((prev) => prev.filter((chat) => chat.uniqueId !== uniqueId));
    toast.success("Chat deleted successfully!");
  }

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 text-gray-100">
      <Header />
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="relative">
          <Modes />

          <div className="hidden sm:block absolute top-0 right-0 h-full w-1px bg-gray-700" />
        </div>

        <div className="flex-1">
          <Outlet context={{ chatList, addChat, deleteChat }} />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
