import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modes from "./components/Modes";
import { Outlet } from "react-router-dom";
import { toast, Toaster } from "sonner";
import axios from "axios";

function App() {
  const [chatList, setChatList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadChats() {
      const res = await axios.get("http://localhost:3000/api/chats", {
        withCredentials: true,
      });
      setChatList(res.data.result);
      // console.log(res.data.result);
    }
    loadChats();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/getNotifications",
          { withCredentials: true },
        );
        setNotifications(res.data);
      } catch (err) {
        console.log("Notification refresh error:", err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function addChat({ chat, setChat }) {
    if (chat.name === "" || chat.uniqueId === "") return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/requests",
        { name: chat.name, friends_id: chat.uniqueId },
        {
          withCredentials: true,
        },
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      console.log("response", response);

      // setChatList((prev) => [response.data, ...prev]);
      toast.success("Friend request sent");
      setChat({ name: "", uniqueId: "" });
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
      <Header notifications={notifications} />

      <div className="flex flex-1 min-h-0">
        <div className="relative shrink-0 h-full overflow-y-auto">
          <Modes />

          <div className="hidden sm:block absolute top-0 right-0 h-full w-px bg-gray-700" />
        </div>

        <div className="flex-1 h-full overflow-y-auto">
          <Outlet
            context={{
              chatList,
              addChat,
              deleteChat,
              notifications,
              setNotifications,
            }}
          />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
