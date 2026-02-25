import {onchainEnum, onchainTable, index, primaryKey} from "ponder";

// Enum for position status
export const position_status = onchainEnum("position_status", [
  "OPEN",
  "CLOSED",
]);

export const pool_type = onchainEnum("pool_type", ["DEPOSIT", "WITHDRAW"]);

export const asset_enum = onchainEnum("asset_enum", ["WBTC", "WETH", "PAXG"]);

// Table: position
export const position = onchainTable(
  "position",
  (t) => ({
    id: t.text().notNull(),
    owner: t.hex().notNull(),
    asset: asset_enum().notNull(),
    asset_amount: t.bigint().notNull(),
    target_amount: t.bigint().notNull(),
    entry_price: t.bigint().notNull(),
    profit_sharing: t.integer().notNull(),
    opened_at: t.bigint().notNull(),
    maturity: t.bigint().notNull(),
    closed_at: t.bigint(), // optional
    close_asset_amount: t.bigint(), // optional
    exit_price: t.bigint(), // optional
    status: position_status().notNull(), // enum, NOT NULL
  }),
  (table) => ({
    owner_idx: index().on(table.owner),
    pk: primaryKey({ columns: [table.id, table.asset]})
  }),

);

export const poolActivity = onchainTable("poolActivity", (t) => ({
  id: t.text().primaryKey(),
  type: pool_type().notNull(),
  user: t.hex().notNull(),
  assets: t.bigint().notNull(),
  shares: t.bigint().notNull(),
  timestamp: t.bigint().notNull(),
}));

// Table: volume_24h
export const volume_24h = onchainTable("volume_24h", (t) => ({
  id: t.text().primaryKey(),
  timestamp: t.bigint().notNull(),
  amount: t.bigint().notNull(),
}));

export const tvl_hourly = onchainTable("tvl_hourly", (t) => ({
  id: t.bigint().primaryKey(), // timestamp floor to 4h
  timestamp: t.bigint().notNull(),
  tvl: t.bigint().notNull(),
}));

export const tvl_daily = onchainTable("tvl_daily", (t) => ({
  id: t.bigint().primaryKey(), // timestamp floor to 1 day
  timestamp: t.bigint().notNull(),
  tvl: t.bigint().notNull(),
}));

export const tvl_monthly = onchainTable("tvl_monthly", (t) => ({
  id: t.bigint().primaryKey(), // timestamp floor to 5 days
  timestamp: t.bigint().notNull(),
  tvl: t.bigint().notNull(),
}));

export const tvl_yearly = onchainTable("tvl_yearly", (t) => ({
  id: t.bigint().primaryKey(), // timestamp floor to 2 months
  timestamp: t.bigint().notNull(),
  tvl: t.bigint().notNull(),
}));

export const lpBalanceCheckpoint = onchainTable(
  "lp_balance_checkpoint",
  (t) => ({
    id: t.text().primaryKey(),

    pool: t.hex().notNull(), // X2Pool address
    user: t.hex().notNull(), // LP wallet

    shares: t.bigint().notNull(), // LP shares AFTER event
    assets: t.bigint().notNull(), // underlying assets AFTER event (optional but useful)

    blockNumber: t.bigint().notNull(),
    timestamp: t.bigint().notNull(),
  })
);
