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
