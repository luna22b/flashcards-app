import { getMe } from "#/api/auth";
import { useQuery } from "@tanstack/react-query";

// this function is just for log out. maybe there will be more uses in the future
export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getMe,
    retry: false,
  });
};
