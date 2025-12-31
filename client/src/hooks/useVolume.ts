import { useQuery } from "@apollo/client/react";
import { GET_24HR_VOLUME } from "@/graphql/pool";
import type { VolumeQuery } from "@/graphql/types";

export function useVolume(since: string) {
  return useQuery<VolumeQuery>(GET_24HR_VOLUME, {
    variables: {
      since,
    },
    fetchPolicy: "cache-first",
  });
}
