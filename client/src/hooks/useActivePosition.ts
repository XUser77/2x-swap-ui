import { useQuery } from "@apollo/client/react";
import { GET_OPEN_POSITIONS } from "../graphql/positions";
import type { OpenPosition, PaginatedPositions } from "@/graphql/types";

export function useActivePosition(owner: `0x${string}`, page = 0, limit = 10) {
  return useQuery<PaginatedPositions<OpenPosition>>(GET_OPEN_POSITIONS, {
    variables: {
      owner,
      limit,
      offset: page * limit,
    },
    fetchPolicy: "cache-first",
  });
}
