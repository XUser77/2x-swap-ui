import { gql } from "@apollo/client";

export const GET_POOL_ACTIVITY = gql`
  query PoolActivityByUser($owner: String!, $limit: Int!, $offset: Int!) {
    poolActivitys(
      where: { user: $owner }
      orderBy: "timestamp"
      orderDirection: "desc"
      limit: $limit
      offset: $offset
    ) {
      items {
        type
        assets
        timestamp
      }
      totalCount
    }
  }
`;

export const GET_24HR_VOLUME = gql`
  query GetVolume24hRecords($since: BigInt!) {
    volume_24hs(where: { timestamp_gte: $since }) {
      items {
        id
        timestamp
        amount
      }
    }
  }
`;
