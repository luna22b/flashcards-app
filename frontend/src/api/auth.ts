import axios from "axios";
import { API_URL } from "#/api";

export const getMe = async () => {
  try {
    const res = await axios.get(`${API_URL}/auth/me`, {
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
      `${API_URL}/auth/logout`,
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
