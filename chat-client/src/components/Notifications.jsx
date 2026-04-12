import { useEffect } from "react";
import React from "react";
import NotificationCard from "./NotificationCard";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function Notifications() {
  const { notifications, setNotifications } = useOutletContext();

  async function handleAccept(id) {
    try {
      await axios.patch(
        `http://localhost:3000/api/requests/${id}/accept`,
        {},
        { withCredentials: true },
      );

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.log("Accept error:", err);
    }
  }

  async function handleReject(id) {
    try {
      await axios.patch(
        `http://localhost:3000/api/requests/${id}/reject`,
        {},
        { withCredentials: true },
      );

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.log("Reject error:", err);
    }
  }

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getNotifications",
          { withCredentials: true },
        );

        setNotifications(response.data);
      } catch (err) {
        console.log("Error loading notifications:", err);
      }
    }

    loadNotifications();
  }, []);

  return (
    <div className="h-full w-full p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-4">Notifications</h1>

        {notifications.length > 0 && (
          <div className="flex justify-center items-center text-xs h-7 w-14 rounded-2xl cursor-pointer bg-blue-500 text-white">
            {notifications.length} new
          </div>
        )}
      </div>

      <p className="text-gray-400 mb-4">FRIEND REQUESTS</p>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No friend requests</p>
      ) : (
        notifications.map((value) => (
          <NotificationCard
            key={value.id}
            name={value.sender_name}
            onAccept={() => {
              handleAccept(value.id);
            }}
            onReject={() => {
              handleReject(value.id);
            }}
          />
        ))
      )}
    </div>
  );
}

export default Notifications;
