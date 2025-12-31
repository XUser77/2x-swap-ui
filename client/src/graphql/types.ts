import type { SymbolKey } from "@/hooks/usePrice";

// Base entity shared by open & closed positions
export interface BasePosition {
  id: string;
  asset: SymbolKey;
  asset_amount: string;
  target_amount: string;
  entry_price: string;
  profit_sharing: number;
}

// Open positions (OPEN)
export interface OpenPosition extends BasePosition {
  opened_at: string;
  maturity: string;
}

// Closed positions (CLOSED)
export interface ClosedPosition extends BasePosition {
  exit_price: string;
  closed_at: string;
}

// Generic paginated response wrapper used by Ponder
export interface PaginatedPositions<T> {
  positions: {
    items: T[];
    totalCount: number;
  };
}

export type ClosedPositionAPY = {
  asset_amount: string; // BigInt serialized
  close_asset_amount: string; // BigInt serialized
  profit_sharing: number; // pool share %, e.g. 20 / 30 / 40
  opened_at: string; // unix seconds (BigInt)
  closed_at: string; // unix seconds (BigInt)
};

export type PoolActivityByUserQuery = {
  poolActivitys: {
    items: Array<{
      type: "DEPOSIT" | "WITHDRAW"; // Enum values from your table
      assets: string; // BigInt encoded as string
      timestamp: number;
    }>;
    totalCount: number;
  };
};

export type VolumeQuery = {
  volume_24hs: {
    items: Array<{
      id: string;
      timestamp: string;
      amount: string;
    }>;
  };
};
