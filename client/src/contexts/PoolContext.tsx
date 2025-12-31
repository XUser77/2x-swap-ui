"use client";

import { createContext, useContext } from "react";

type PoolContextType = {
  apy: number;
};

const PoolContext = createContext<PoolContextType | undefined>(undefined);

export function PoolProvider({
  apy,
  children,
}: {
  apy: number;
  children: React.ReactNode;
}) {
  return (
    <PoolContext.Provider value={{ apy }}>{children}</PoolContext.Provider>
  );
}

export function usePool() {
  const context = useContext(PoolContext);
  if (!context) {
    throw new Error("usePool must be used within PoolProvider");
  }
  return context;
}
