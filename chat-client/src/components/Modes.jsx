import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Modes() {
  const modes = [
    { icon: faEnvelope, label: "Messages" },
    { icon: faComments, label: "Status" },
    { icon: faPhone, label: "Calls" },
    { icon: faPlus, label: "Add Chat" },
    { icon: faUser, label: "Profile" },
    { icon: faSquarePollVertical, label: "Feedback" },
    { icon: faGear, label: "Settings" },
  ];
  return (
    <div
      className="
    fixed bottom-2 left-0 w-full 
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
          <FontAwesomeIcon icon={m.icon} />
          <span className="absolute px-2 py-1 left-full ml-3 bg-black text-white whitespace-nowrap text-xs rounded opacity-0 group-hover:opacity-100 transition">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Modes;
