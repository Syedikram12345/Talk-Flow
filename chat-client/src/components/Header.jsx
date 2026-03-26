import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="w-full bg-gray-800 text-gray-100 p-4 flex justify-between items-center shadow-md">
      <h3 className="text-2xl font-bold">Talk flow</h3>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-100 transition">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-100 transition">
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  );
}

export default Header;
