import axios from "axios";

const getProfile = async () => {
  try {
    const res = await axios.get("http://localhost:3000/auth/me", {
      withCredentials: true,
    });

    return { email: res.data.email, uuid: res.data.uuid, name: res.data.name };
  } catch (err) {
    console.log(err);
  }
};

export default getProfile;
