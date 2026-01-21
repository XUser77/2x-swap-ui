"use strict";
// lib/ponderGraphql.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAY_QUERY = void 0;
exports.fetchFromPonder = fetchFromPonder;
const PONDER_URL = process.env.PONDER_URL;
async function fetchFromPonder(query, variables) {
    console.log(PONDER_URL);
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
exports.DAY_QUERY = `query DailyLpBalances($start: BigInt!, $end: BigInt!) {
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
