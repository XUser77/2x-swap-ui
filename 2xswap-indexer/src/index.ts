import { ponder } from "ponder:registry";
import { poolActivity, position, volume_24h } from "ponder:schema";
import { eq } from "drizzle-orm";

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;
const PRICE_SCALE = 1_000_000_000_000_00n;

// Handle OpenPosition events
ponder.on("X2ETHSwap:OpenPosition", async ({ event, context }) => {
  const { db } = context;

  // Insert the new position into the `position` table
  await db.insert(position).values({
    id: event.args.id.toString(),
    owner: event.args.sender,
    asset: "WETH", // TODO:
    asset_amount: event.args.assetAmount,
    target_amount: event.args.targetAmount,
    entry_price:
      (event.args.assetAmount * PRICE_SCALE) / event.args.targetAmount,
    profit_sharing: 100 - Number(event.args.profitSharing),
    opened_at: event.block.timestamp,
    maturity: event.block.timestamp + BigInt(ONE_YEAR_SECONDS),
    closed_at: null,
    close_asset_amount: null,
    exit_price: null,
    status: "OPEN",
  });

  // Track the 24h volume for opens
  await db.insert(volume_24h).values({
    id: `${event.block.timestamp}-${event.transaction.hash}`,
    timestamp: event.block.timestamp,
    amount: event.args.assetAmount,
  });
});

// Handle ClosePosition events
ponder.on("X2ETHSwap:ClosePosition", async ({ event, context }) => {
  const { db } = context;

  // Read the stored position
  const existing = await db.find(position, {
    id: event.args.id.toString(),
  });

  if (!existing) return;

  const exitPrice =
    (event.args.closeAssetAmount * PRICE_SCALE) / existing.target_amount;

  // Update the position as closed
  await db.sql
    .update(position)
    .set({
      closed_at: event.block.timestamp,
      close_asset_amount: event.args.closeAssetAmount,
      exit_price: exitPrice,
      status: "CLOSED",
    })
    .where(eq(position.id, event.args.id.toString()));

  // Track the 24h volume for closes
  await db.insert(volume_24h).values({
    id: `${event.block.timestamp}-${event.transaction.hash}-close`,
    timestamp: event.block.timestamp,
    amount: event.args.closeAssetAmount,
  });
});

// Handle Pool Deposit
ponder.on("X2ETHPool:Deposit", async ({ event, context }) => {
  const { db } = context;

  // Insert the new position into the `poolActivity` table
  await db.insert(poolActivity).values({
    id: event.transaction.hash,
    type: "DEPOSIT",
    user: event.args.caller,
    assets: event.args.assets,
    shares: event.args.shares,
    timestamp: event.block.timestamp,
  });
});

// Handle Pool Withdraw
ponder.on("X2ETHPool:Withdraw", async ({ event, context }) => {
  const { db } = context;

  // Insert the new position into the `poolActivity` table
  await db.insert(poolActivity).values({
    id: event.transaction.hash,
    type: "WITHDRAW",
    user: event.args.owner,
    assets: event.args.assets,
    shares: event.args.shares,
    timestamp: event.block.timestamp,
  });
});
