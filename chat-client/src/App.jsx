import { useEffect } from "react";
import React, { useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";

function App() {
  const [chatList, setChatList] = useState(() => {
    const saved = localStorage.getItem("chatList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatList", JSON.stringify(chatList));
  }, [chatList]);

  function addChat(chat) {
    if (chat.name === "" || chat.uniqueId === "") {
      return;
    }
    setChatList((prev) => [...prev, chat]);
  }

  function deleteChat(uniqueId) {
    console.log("deleted");
    setChatList((prev) => {
      return prev.filter((chat) => {
        return chat.uniqueId !== uniqueId;
      });
    });
  }

  return (
    <div className="min-h-screen min-w-screen  bg-[#FFAFCC]">
      <Header />
      <div className="flex flex-col-reverse sm:flex-row">
        <Modes />

        <div className="flex-1">
          <Outlet context={{ chatList, addChat, deleteChat }} />
        </div>
      </div>
    </div>
  );
}

export default App;
