import { useQuery } from "@apollo/client/react";
import { GET_POOL_ACTIVITY } from "@/graphql/pool";
import type { PoolActivityByUserQuery } from "@/graphql/types";

export function usePoolActivity(owner: `0x${string}`, page = 0, limit = 10) {
  return useQuery<PoolActivityByUserQuery>(GET_POOL_ACTIVITY, {
    variables: {
      owner,
      limit,
      offset: page * limit,
    },
    fetchPolicy: "cache-first",
  });
}
