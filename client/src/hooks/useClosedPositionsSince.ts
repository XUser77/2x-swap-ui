import { useQuery } from "@apollo/client/react";
import { GET_CLOSED_POSITION } from "../graphql/positions";
import type { GetClosedPositionsSince } from "@/graphql/types";

export function useClosedPositionsSince(since: string) {
  return useQuery<GetClosedPositionsSince>(GET_CLOSED_POSITION, {
    variables: {
      since,
    },
    fetchPolicy: "cache-first",
  });
}
