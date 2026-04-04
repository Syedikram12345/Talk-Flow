import axios from "axios";

const getProfile = async () => {
  try {
    const res = await axios.get("http://localhost:3000/auth/me", {
      withCredentials: true,
    });
    return res.data.email;
  } catch (err) {
    console.log(err);
  }
};

export default getProfile;
