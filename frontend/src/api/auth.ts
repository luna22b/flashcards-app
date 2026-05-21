import axios from "axios";

export const getMe = async () => {
  try {
    const res = await axios.get("http://localhost:5000/auth/me", {
      withCredentials: true,
    });

    return res.data;
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    return res.data;
  } catch {
    return null;
  }
};
