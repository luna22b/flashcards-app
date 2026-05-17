import axios from "axios";

export async function getMe() {
  const response = await axios.get("http://localhost:5000/api/me", {
    withCredentials: true,
  });

  return response.data;
}
