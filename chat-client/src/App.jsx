import React, { useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";

function App() {
  const [chatList, setChatList] = useState([
    { name: "Ikram", lastMsg: "You: Hello ", uniqueId: 100 },
    { name: "Ateeb", lastMsg: "Bro where are you?", uniqueId: 101 },
    { name: "Aliza", lastMsg: "Okay ", uniqueId: 102 },
  ]);

  function addChat(chat) {
    if (chat.name === "" || chat.uniqueId === "") {
      return;
    }
    setChatList((prev) => [...prev, chat]);
  }

  return (
    <div className="min-h-screen min-w-screen  bg-[#FFAFCC]">
      <Header />
      <div className="flex flex-col-reverse sm:flex-row">
        <Modes />

        <div className="flex-1">
          <Outlet context={{ chatList, addChat }} />
        </div>
      </div>
    </div>
  );
}

export default App;
