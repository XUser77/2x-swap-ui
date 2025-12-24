import { ponder } from "ponder:registry";
import { position, volume_24h } from "ponder:schema";
import { eq } from "drizzle-orm";

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

// Handle OpenPosition events
ponder.on("X2Swap:OpenPosition", async ({ event, context }) => {
  const { db } = context;

  // Insert the new position into the `position` table
  await db.insert(position).values({
    id: event.args.id.toString(),
    owner: event.args.sender,
    asset: "BTC", // TODO:
    asset_amount: event.args.assetAmount,
    target_amount: event.args.targetAmount,
    entry_price: event.args.assetAmount / event.args.targetAmount,
    profit_sharing: Number(event.args.profitSharing),
    opened_at: event.block.timestamp,
    maturity: event.block.timestamp + BigInt(ONE_YEAR_SECONDS), // if needed
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
ponder.on("X2Swap:ClosePosition", async ({ event, context }) => {
  const { db } = context;

  // 1. Read the stored position
  const existing = await db.find(position, {
    id: event.args.id.toString(),
  });

  // (optional) handle missing case
  if (!existing) return;

  const exitPrice =
    Number(event.args.closeAssetAmount) / Number(existing.target_amount);

  // Update the position as closed
  await db.sql
    .update(position)
    .set({
      closed_at: event.block.timestamp,
      close_asset_amount: event.args.closeAssetAmount,
      exit_price: BigInt(exitPrice),
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
