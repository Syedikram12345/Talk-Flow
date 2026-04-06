import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "sonner";
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

  async function addChat(chat) {
    if (chat.name === "" || chat.uniqueId === "") return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-chat",
        chat,
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      setChatList((prev) => [response.data, ...prev]);
      toast.success("Chat added");
    } catch (error) {
      const msg = error.response?.data?.error || "Something went wrong";
      toast.error(msg);
    }
  }

  async function deleteChat(unique_id) {
    try {
      await axios.delete(`http://localhost:3000/api/delete-chat/${unique_id}`);
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
