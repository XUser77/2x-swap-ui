import { onchainEnum, onchainTable, index } from "ponder";

// Enum for position status
export const position_status = onchainEnum("position_status", [
  "OPEN",
  "CLOSED",
]);

export const asset_enum = onchainEnum("asset_enum", ["BTC", "ETH", "PAXG"]);

// Table: position
export const position = onchainTable(
  "position",
  (t) => ({
    id: t.text().primaryKey(),
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
  })
);

// Table: volume_24h
export const volume_24h = onchainTable("volume_24h", (t) => ({
  id: t.text().primaryKey(),
  timestamp: t.bigint().notNull(),
  amount: t.bigint().notNull(),
}));
