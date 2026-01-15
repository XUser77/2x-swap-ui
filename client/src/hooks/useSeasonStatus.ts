import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useSeasonStatus(enabled: boolean) {
  return useQuery({
    queryKey: ["season-status"],
    queryFn: async () => {
      const { data } = await api.get("/api/user/season-status");

      return data;
    },
    enabled, // only run when logged in
  });
}
