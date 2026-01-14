import X2PoolABI from "../abis/X2Pool.json";
import { lpBalanceCheckpoint } from "ponder:schema";

export async function snapshotLpBalance({
  context,
  pool,
  user,
  event,
}: {
  context: any;
  pool: `0x${string}`;
  user: `0x${string}`;
  event: any;
}) {
  const { db, client } = context;

  const shares = await client.readContract({
    address: pool,
    abi: X2PoolABI,
    functionName: "balanceOf",
    args: [user],
  });

  const assets = await client.readContract({
    address: pool,
    abi: X2PoolABI,
    functionName: "convertToAssets",
    args: [shares],
  });

  await db.insert(lpBalanceCheckpoint).values({
    id: `${event.transaction.hash}-${user}`,
    pool,
    user,
    shares,
    assets,
    blockNumber: event.block.number,
    timestamp: event.block.timestamp,
  });
}
