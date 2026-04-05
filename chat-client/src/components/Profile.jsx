import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import getProfile from "@/utils/getProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Profile() {
  const [me, setMe] = React.useState("");
  const [isCopied, setIsCopied] = React.useState(false);

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
    const myProfile = async () => {
      const res = await getProfile();
      setMe(res);
    };
    myProfile();
  }, []);

  async function handleCopy(text) {
    setIsCopied(true);

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }

  return (
    <div className="h-full w-full flex flex-col justify-items-start sm:justify-between px-6 py-4">
      <div className="flex items-center gap-6 flex-col sm:flex-row ">
        <div className=" rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${me.uuid || me.email || me.name}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="text-lg space-y-1">
          <h3>
            Name :
            <span className="font-semibold text-gray-400"> {me.name}</span>
          </h3>
          <h3>
            Email :
            <span className="font-semibold text-gray-400 "> {me.email}</span>
          </h3>
          <div className="flex gap-2 sm:gap-7">
            <h3>
              Unique ID :
              <span className="font-semibold text-gray-400"> {me.uuid}</span>
            </h3>
            <div
              onClick={() => handleCopy(me.uuid)}
              className="bg-blue-500 hover:bg-blue-400 rounded-md h-7 w-7 
             flex justify-center items-center cursor-pointer
             transition-all duration-300 "
            >
              <span
                className={`absolute transition-all duration-300 
                ${isCopied ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
              >
                🗍
              </span>

              <span
                className={`absolute transition-all duration-300 
                ${isCopied ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              >
                ✓
              </span>
            </div>
          </div>
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
