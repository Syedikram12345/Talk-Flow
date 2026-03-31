import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faComments,
  faPhone,
  faPlus,
  faGear,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Modes() {
  const modes = [
    { icon: faEnvelope, label: "Messages", to: "/" },
    // { icon: faComments, label: "Status", to: "/status" },
    // { icon: faPhone, label: "Calls", to: "/calls" },
    { icon: faPlus, label: "Add Chat", to: "/add-chat" },

    { icon: faSquarePollVertical, label: "Feedback", to: "/feedback" },
    // { icon: faGear, label: "Settings", to: "/settings" },
  ];

  return (
    <div
      className="
        fixed bottom-2 left-0 w-full z-50 flex flex-row items-center justify-evenly
        sm:static sm:w-[5vw] sm:h-full sm:flex-col
        overflow-visible
      "
    >
      {modes.map((m, index) => (
        <div
          key={index}
          className="group relative cursor-pointer text-3xl flex flex-col items-center my-2"
        >
          <NavLink
            to={m.to}
            className={({ isActive }) =>
              `${isActive ? "text-blue-500" : "text-gray-400"} relative z-10`
            }
          >
            <FontAwesomeIcon icon={m.icon} />
          </NavLink>

          <span
            className="
  fixed
  sm:left-[5.5vw] sm:top-auto
  top-1/2 left-17.5 -translate-y-1/2
  bg-gray-900 text-white px-3 py-1 rounded-md
  text-sm font-medium whitespace-nowrap
  opacity-0 group-hover:opacity-100
  transition-opacity duration-200
  pointer-events-none
  z-50
  shadow-lg
"
          >
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Modes;
