import { ponder } from "ponder:registry";
import { poolActivity, position, volume_24h } from "ponder:schema";
import { eq } from "drizzle-orm";
import { snapshotTVL } from "../helpers/snapshotTVL";
import { snapshotLpBalance } from "../helpers/snapshotLpBalance";
import { sendTradeScore } from "../helpers/sendTradeScore";

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;
const PRICE_SCALE = 1_000_000_000_000_00n;

// Handle OpenPosition events
ponder.on("X2ETHSwap:OpenPosition", async ({ event, context }) => {
  const { db } = context;

  // Insert the new position into the `position` table
  await db.insert(position).values({
    id: event.args.id.toString(),
    owner: event.args.sender,
    asset: "WETH",
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

  await snapshotTVL(context, event);
});

// Handle OpenPosition events
ponder.on("X2BTCSwap:OpenPosition", async ({ event, context }) => {
  const { db } = context;

  // Insert the new position into the `position` table
  await db.insert(position).values({
    id: event.args.id.toString(),
    owner: event.args.sender,
    asset: "WBTC",
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

  await snapshotTVL(context, event);
});

// // Handle OpenPosition events
// ponder.on("X2PAXGSwap:OpenPosition", async ({ event, context }) => {
//   const { db } = context;

//   // Insert the new position into the `position` table
//   await db.insert(position).values({
//     id: event.args.id.toString(),
//     owner: event.args.sender,
//     asset: "PAXG",
//     asset_amount: event.args.assetAmount,
//     target_amount: event.args.targetAmount,
//     entry_price:
//       (event.args.assetAmount * PRICE_SCALE) / event.args.targetAmount,
//     profit_sharing: 100 - Number(event.args.profitSharing),
//     opened_at: event.block.timestamp,
//     maturity: event.block.timestamp + BigInt(ONE_YEAR_SECONDS),
//     closed_at: null,
//     close_asset_amount: null,
//     exit_price: null,
//     status: "OPEN",
//   });

//   // Track the 24h volume for opens
//   await db.insert(volume_24h).values({
//     id: `${event.block.timestamp}-${event.transaction.hash}`,
//     timestamp: event.block.timestamp,
//     amount: event.args.assetAmount,
//   });

//   await snapshotTVL(context, event);
// }); // TODO:

// Handle ClosePosition events
ponder.on("X2ETHSwap:ClosePosition", async ({ event, context }) => {
  const { db } = context;

  const existing = await db.find(position, { id: event.args.id.toString() });

  if (!existing) return;

  const exitPrice =
    (event.args.closeAssetAmount * PRICE_SCALE) / existing.target_amount;

  const pnl = Number(exitPrice - existing.entry_price);

  const poolPrincipal = existing.asset_amount / 2n;

  const openAssetAmount = existing.asset_amount;
  const assetAmountOut = event.args.closeAssetAmount;
  const profitSharing = BigInt(existing.profit_sharing); // % LP takes

  let poolAmount: bigint;

  if (assetAmountOut >= openAssetAmount) {
    // PROFIT
    const profit = assetAmountOut - openAssetAmount;
    const poolBonus = (profit * profitSharing) / 100n;
    poolAmount = poolPrincipal + poolBonus;
  } else {
    // LOSS
    if (assetAmountOut >= poolPrincipal) {
      // Moderate loss → LP fully repaid
      poolAmount = poolPrincipal;
    } else {
      // Severe loss → LP hurt
      poolAmount = assetAmountOut;
    }
  }

  const lpHurt = poolAmount < poolPrincipal;

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

  await snapshotTVL(context, event);

  await sendTradeScore({
    wallet: existing.owner,
    txHash: event.transaction.hash,
    volume: event.args.closeAssetAmount.toString(),
    pnl,
    lpHurt,
    timestamp: Number(event.block.timestamp),
  });
});

// Handle ClosePosition events
ponder.on("X2BTCSwap:ClosePosition", async ({ event, context }) => {
  const { db } = context;

  // Read the stored position
  const existing = await db.find(position, { id: event.args.id.toString() });

  if (!existing) return;

  const exitPrice =
    (event.args.closeAssetAmount * PRICE_SCALE) / existing.target_amount;

  const pnl = Number(exitPrice - existing.entry_price);

  const poolPrincipal = existing.asset_amount / 2n;

  const openAssetAmount = existing.asset_amount;
  const assetAmountOut = event.args.closeAssetAmount;
  const profitSharing = BigInt(existing.profit_sharing); // % LP takes

  let poolAmount: bigint;

  if (assetAmountOut >= openAssetAmount) {
    // PROFIT
    const profit = assetAmountOut - openAssetAmount;
    const poolBonus = (profit * profitSharing) / 100n;
    poolAmount = poolPrincipal + poolBonus;
  } else {
    // LOSS
    if (assetAmountOut >= poolPrincipal) {
      // Moderate loss → LP fully repaid
      poolAmount = poolPrincipal;
    } else {
      // Severe loss → LP hurt
      poolAmount = assetAmountOut;
    }
  }

  const lpHurt = poolAmount < poolPrincipal;

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

  await snapshotTVL(context, event);

  await sendTradeScore({
    wallet: existing.owner,
    txHash: event.transaction.hash,
    volume: event.args.closeAssetAmount.toString(),
    pnl,
    lpHurt,
    timestamp: Number(event.block.timestamp),
  });
});

// // Handle ClosePosition events
// ponder.on("X2PAXGSwap:ClosePosition", async ({ event, context }) => {
//   const { db } = context;

//   // Read the stored position
//   const positionId = `${event.log.address}-${event.args.id.toString()}`;

//   const existing = await db.find(position, { id: positionId });

//   if (!existing) return;

//   const exitPrice =
//     (event.args.closeAssetAmount * PRICE_SCALE) / existing.target_amount;

//   const pnl = Number(exitPrice - existing.entry_price);

//   const poolPrincipal = existing.asset_amount / 2n;

//   const openAssetAmount = existing.asset_amount;
//   const assetAmountOut = event.args.closeAssetAmount;
//   const profitSharing = BigInt(existing.profit_sharing); // % LP takes

//   let poolAmount: bigint;

//   if (assetAmountOut >= openAssetAmount) {
//     // PROFIT
//     const profit = assetAmountOut - openAssetAmount;
//     const poolBonus = (profit * profitSharing) / 100n;
//     poolAmount = poolPrincipal + poolBonus;
//   } else {
//     // LOSS
//     if (assetAmountOut >= poolPrincipal) {
//       // Moderate loss → LP fully repaid
//       poolAmount = poolPrincipal;
//     } else {
//       // Severe loss → LP hurt
//       poolAmount = assetAmountOut;
//     }
//   }

//   const lpHurt = poolAmount < poolPrincipal;

//   // Update the position as closed
//   await db.sql
//     .update(position)
//     .set({
//       closed_at: event.block.timestamp,
//       close_asset_amount: event.args.closeAssetAmount,
//       exit_price: exitPrice,
//       status: "CLOSED",
//     })
//     .where(eq(position.id, positionId));

//   // Track the 24h volume for closes
//   await db.insert(volume_24h).values({
//     id: `${event.block.timestamp}-${event.transaction.hash}-close`,
//     timestamp: event.block.timestamp,
//     amount: event.args.closeAssetAmount,
//   });

//   await snapshotTVL(context, event);

//   await sendTradeScore({
//     wallet: existing.owner,
//     txHash: event.transaction.hash,
//     volume: event.args.closeAssetAmount.toString(),
//     pnl,
//     lpHurt,
//     timestamp: Number(event.block.timestamp),
//   });
// });

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

  await snapshotTVL(context, event);

  await snapshotLpBalance({
    context,
    pool: "0x9c9784f08dAe28FEdB72490e9a6c739eb731160a",
    user: event.args.receiver,
    event,
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

  await snapshotTVL(context, event);

  await snapshotLpBalance({
    context,
    pool: "0x9c9784f08dAe28FEdB72490e9a6c739eb731160a",
    user: event.args.owner,
    event,
  });
});
