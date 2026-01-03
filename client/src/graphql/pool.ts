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

export const GET_HOURLY_TVL = gql`
  query GetHourlyTVL($minId: BigInt!) {
    tvl_hourlys(
      where: { id_gte: $minId }
      orderBy: "id"
      orderDirection: "asc"
    ) {
      items {
        id
        timestamp
        tvl
      }
    }
  }
`;

export const GET_DAILY_TVL = gql`
  query GetDailyTVL($limit: Int!) {
    tvl_dailys(orderBy: "id", orderDirection: "desc", limit: $limit) {
      items {
        id
        timestamp
        tvl
      }
    }
  }
`;

export const GET_MONTHLY_TVL = gql`
  query Get5DayTVL($limit: Int!) {
    tvl_monthlys(orderBy: "id", orderDirection: "desc", limit: $limit) {
      items {
        id
        timestamp
        tvl
      }
    }
  }
`;

export const GET_YEARLY_TVL = gql`
  query GetYearlyTVL($limit: Int!) {
    tvl_yearlys(orderBy: "id", orderDirection: "desc", limit: $limit) {
      items {
        id
        timestamp
        tvl
      }
    }
  }
`;
