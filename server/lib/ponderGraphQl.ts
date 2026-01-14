// lib/ponderGraphql.ts

const PONDER_URL = process.env.PONDER_URL!;

export async function fetchFromPonder<T>(
  query: string,
  variables: Record<string, any>
): Promise<T> {
  const res = await fetch(PONDER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch from Ponder GraphQL");
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export const DAY_QUERY = `query DailyLpBalances($start: BigInt!, $end: BigInt!) {
  lpBalanceCheckpoints(
    where: {
      timestamp_gte: $start
      timestamp_lte: $end
    }
    orderBy: "timestamp"
    orderDirection: "asc"
    limit: 1000
  ) {
    items {
    user
    assets
    timestamp
    }
  }
}`;
