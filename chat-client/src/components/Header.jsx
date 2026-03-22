import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-start gap-2 ml-1">
        <FontAwesomeIcon icon={faRocketchat} />
        <p className="text-sm">Talk flow</p>
      </div>
    </div>
  );
}
export default Header;
