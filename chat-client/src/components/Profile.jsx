import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import getProfile from "@/utils/getProfile";

function Profile() {
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  async function handleLogout() {
    await axios.post(
      "http://localhost:3000/auth/logout",
      {},
      { withCredentials: true },
    );

    navigate("/signin");
  }

  React.useEffect(() => {
    setEmail(getProfile());
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-items-start sm:justify-between px-6 py-4">
      <div className="flex items-center gap-6 ">
        <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <img
            src=""
            alt="profile"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="text-lg space-y-1">
          <h3>
            <span className="font-semibold text-gray-700">Email : {email}</span>
          </h3>
          <h3>
            <span className="font-semibold text-gray-700">Unique ID : </span>
            sdjkfg489railsf
          </h3>
          <h3>
            <span className="font-semibold text-gray-700">Chats saved : </span>
            52
          </h3>
        </div>
      </div>

      <div className="text-right mt-4 ">
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition shadow mr-1.5 rounded-xl text-white">
          Edit profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
