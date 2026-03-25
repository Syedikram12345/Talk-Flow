import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faComments,
  faPhone,
  faPlus,
  faUser,
  faGear,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Modes() {
  const modes = [
    { icon: faEnvelope, label: "Messages", to: "/" },
    { icon: faComments, label: "Status", to: "/status" },
    { icon: faPhone, label: "Calls", to: "/calls" },
    { icon: faPlus, label: "Add Chat", to: "/add-chat" },
    { icon: faUser, label: "Profile", to: "/profile" },
    { icon: faSquarePollVertical, label: "Feedback", to: "/feedback" },
    { icon: faGear, label: "Settings", to: "/settings" },
  ];

  return (
    <div
      className="fixed bottom-2 left-0 w-full z-100 flex flex-row items-center justify-evenly 
                 sm:static sm:w-[5vw] sm:h-full sm:flex-col overflow-y-auto"
    >
      {modes.map((m, index) => (
        <div
          key={index}
          className="group relative cursor-pointer text-3xl flex flex-col items-center my-2"
        >
          <NavLink
            to={m.to}
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-gray-400"}`
            }
          >
            <FontAwesomeIcon icon={m.icon} />
          </NavLink>
          <span className="absolute px-2 py-1 left-full ml-3 bg-gray-800 text-white whitespace-nowrap text-xs rounded opacity-0 group-hover:opacity-100 transition z-50">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Modes;
