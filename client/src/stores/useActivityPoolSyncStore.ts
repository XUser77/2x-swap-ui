import { create } from "zustand";

type ActivityPoolSyncState = {
  trigger: number;
  bump: () => void;
};

export const useActivityPoolSyncStore = create<ActivityPoolSyncState>(
  (set) => ({
    trigger: 0,
    bump: () => set((s) => ({ trigger: s.trigger + 1 })),
  })
);
