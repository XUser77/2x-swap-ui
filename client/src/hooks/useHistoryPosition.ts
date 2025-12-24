import { useQuery } from "@apollo/client/react";
import { GET_CLOSED_HISTORY } from "../graphql/positions";
import type { ClosedPosition, PaginatedPositions } from "@/graphql/types";

export function useHistoryPosition(owner: string, page = 0, limit = 10) {
  return useQuery<PaginatedPositions<ClosedPosition>>(GET_CLOSED_HISTORY, {
    variables: {
      owner,
      limit,
      offset: page * limit,
    },
    fetchPolicy: "cache-first",
  });
}
