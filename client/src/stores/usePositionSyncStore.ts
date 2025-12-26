import { create } from "zustand";

type PositionsSyncState = {
  version: number;
  bump: () => void;
};

export const usePositionsSyncStore = create<PositionsSyncState>((set) => ({
  version: 0,
  bump: () => set((s) => ({ version: s.version + 1 })),
}));
