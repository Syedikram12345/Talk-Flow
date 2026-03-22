import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

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
      className="
    fixed bottom-2 left-0 w-full z-100
    flex flex-row items-center justify-evenly 
    sm:static sm:w-[5vw] sm:h-screen 
    sm:flex-col
  "
    >
      {modes.map((m, index) => (
        <div
          key={index}
          className="group relative cursor-pointer text-3xl flex flex-col items-center"
        >
          <NavLink
            to={m.to}
            className={({ isActive }) =>
              `${isActive ? "text-[#ff3f7f]" : "text-black"}`
            }
          >
            <FontAwesomeIcon icon={m.icon} />
          </NavLink>
          <span className="absolute px-2 py-1 left-full ml-3 bg-black text-white whitespace-nowrap text-xs rounded opacity-0 group-hover:opacity-100 transition z-50">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Modes;
