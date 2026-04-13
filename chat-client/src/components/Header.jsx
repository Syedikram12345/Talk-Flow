import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Header({ notifications = [] }) {
  return (
    <header className="w-full bg-gray-800 text-gray-100 p-4 flex justify-between items-center shadow-md">
      <h3 className="text-2xl font-bold">Talk flow</h3>
      <div className="flex items-center gap-4">
        <NavLink to="/notifications">
          <div className="relative">
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-100 transition">
              <FontAwesomeIcon icon={faBell} />
            </button>

            {/* BADGE */}
            {notifications.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-2 py-[2px] rounded-full shadow ">
                {notifications.length}
              </div>
            )}
          </div>
        </NavLink>

        {/* PROFILE ICON */}
        <NavLink to="/profile">
          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-100 transition">
            <FontAwesomeIcon icon={faUser} />
          </button>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
