import { getMe } from "#/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getMe,
    retry: false,
  });
};
