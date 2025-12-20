"use client";

import { useAccount } from "wagmi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PositionsTable from "../fragments/PositionsTable";
import HistoryTable from "../fragments/HistoryTable";
import EmptyState from "../fragments/EmptyState";

function PositionWidget() {
  const { isConnected } = useAccount();

  return (
    <div className="w-full bg-white rounded-sm border border-gray-300 p-4 mt-10">
      <Tabs defaultValue="positions">
        <TabsList>
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          {!isConnected ? (
            <EmptyState message="No open positions" />
          ) : (
            <PositionsTable />
          )}
        </TabsContent>

        <TabsContent value="history">
          {!isConnected ? (
            <EmptyState message="No position history" />
          ) : (
            <HistoryTable />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PositionWidget;
