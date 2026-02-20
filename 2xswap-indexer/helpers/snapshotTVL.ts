import { tvl_daily, tvl_hourly, tvl_monthly, tvl_yearly } from "ponder:schema";
import X2PoolAbi from "../abis/X2Pool.json";
import type { Context } from "ponder:registry";
import type { Event } from "ponder:registry";
import {
  floorTo2Months,
  floorTo4H,
  floorTo5Days,
  floorToDay,
} from "./roundingTime";

export async function snapshotTVL(context: Context, event: Event) {
  const { db, client } = context;

  const poolAddress = "0xe2c95f4877658a6305247d481d489862baa9a5e1"; // X2Pool address

  const [assets] = await Promise.all([
    client.readContract({
      address: poolAddress,
      abi: X2PoolAbi,
      functionName: "totalAssets",
    }),
  ]);

  const tvl = (assets as bigint);

  await db
    .insert(tvl_hourly)
    .values({
      id: floorTo4H(event.block.timestamp),
      timestamp: event.block.timestamp,
      tvl,
    })
    .onConflictDoUpdate({
      timestamp: event.block.timestamp,
      tvl: tvl,
    });

  await db
    .insert(tvl_daily)
    .values({
      id: floorToDay(event.block.timestamp),
      timestamp: event.block.timestamp,
      tvl,
    })
    .onConflictDoUpdate({
      timestamp: event.block.timestamp,
      tvl: tvl,
    });

  await db
    .insert(tvl_monthly)
    .values({
      id: floorTo5Days(event.block.timestamp),
      timestamp: event.block.timestamp,
      tvl,
    })
    .onConflictDoUpdate({
      timestamp: event.block.timestamp,
      tvl: tvl,
    });

  await db
    .insert(tvl_yearly)
    .values({
      id: floorTo2Months(event.block.timestamp),
      timestamp: event.block.timestamp,
      tvl,
    })
    .onConflictDoUpdate({
      timestamp: event.block.timestamp,
      tvl: tvl,
    });
}
