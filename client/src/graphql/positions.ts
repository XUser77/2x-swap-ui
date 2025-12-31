import { gql } from "@apollo/client";

// Open positions, sorted by newest opened_at desc
export const GET_OPEN_POSITIONS = gql`
  query GetOpenPositions($owner: String!, $limit: Int!, $offset: Int!) {
    positions(
      where: { status: OPEN, owner: $owner }
      orderBy: "opened_at"
      orderDirection: "desc"
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        asset
        asset_amount
        target_amount
        entry_price
        profit_sharing
        opened_at
        maturity
      }
      totalCount
    }
  }
`;

// History positions, only closed, sorted by newest closed_at
export const GET_CLOSED_HISTORY = gql`
  query GetClosedHistory($owner: String!, $limit: Int!, $offset: Int!) {
    positions(
      where: { status: CLOSED, owner: $owner }
      orderBy: "closed_at"
      orderDirection: "desc"
      limit: $limit
      offset: $offset
    ) {
      items {
        id
        asset
        asset_amount
        target_amount
        entry_price
        exit_price
        profit_sharing
        closed_at
      }
      totalCount
    }
  }
`;

export const GET_CLOSED_POSITION = gql`
  query GetClosedPositionsForApy($since: BigInt!) {
    positions(
      where: { status: CLOSED, closed_at_gte: $since }
      orderBy: "closed_at"
      orderDirection: "asc"
    ) {
      items {
        id
        asset_amount
        close_asset_amount
        profit_sharing
        opened_at
        closed_at
      }
    }
  }
`;
