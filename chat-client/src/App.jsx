import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "sonner";
import SignUp from "./components/SignUp";
import axios from "axios";

function App() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    async function loadChats() {
      const res = await axios.get("http://localhost:3000/api/chats");
      setChatList(res.data);
    }
    loadChats();
  }, []);

  // console.log("chatList : ", chatList);

  async function addChat(chat) {
    if (chat.name === "" || chat.unique_id === "") return;

    const exists = chatList.some((c) => c.unique_id === chat.unique_id);
    if (exists) {
      toast.error("Chat with the same unique ID already exists!");
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/add-chat",
      chat,
    );
    console.log(response.data);

    setChatList((prev) => [...prev, chat]);
  }

  async function deleteChat(unique_id) {
    try {
      await axios.delete(
        `http://localhost:3000/api/delete-chat/:1${unique_id}`,
      );
      setChatList((prev) =>
        prev.filter((chat) => chat.unique_id !== unique_id),
      );
      toast.success("Chat deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />

      <div className="flex flex-1 min-h-0">
        <div className="relative shrink-0 h-full overflow-y-auto">
          <Modes />

          <div className="hidden sm:block absolute top-0 right-0 h-full w-px bg-gray-700" />
        </div>

        <div className="flex-1 h-full overflow-y-auto">
          <Outlet context={{ chatList, addChat, deleteChat }} />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
