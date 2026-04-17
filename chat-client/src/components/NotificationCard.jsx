import React from "react";
import getAvatar from "@/utils/avatar";

function NotificationCard(props) {
  const avatar = getAvatar(props.user);

  return (
    <div className="w-full max-w-sm bg-[#1E2939] shadow-md rounded-xl p-4 flex items-center gap-4 border">
      <img
        src={avatar}
        alt="profile"
        className="w-12 h-12 rounded-full object-cover border"
      />

      <div className="flex-1">
        <p className="font-semibold text-white">{props.user.name}</p>
        <p className="text-sm text-gray-200">sent you a friend request</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={props.onAccept}
          className="px-3 py-1 rounded-md bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-sm"
        >
          Accept
        </button>

        <button
          onClick={props.onReject}
          className="px-3 py-1 rounded-md bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default NotificationCard;
