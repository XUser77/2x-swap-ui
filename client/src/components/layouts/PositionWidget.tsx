"use client";

import { useAccount } from "wagmi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PositionsTable from "../fragments/PositionsTable";
import HistoryTable from "../fragments/HistoryTable";
import EmptyState from "../fragments/EmptyState";

function PositionWidget() {
  const { isConnected, address } = useAccount();

  return (
    <div className="w-full bg-white rounded-md border border-gray-300 p-4 md:mt-10 mt-5 mb-20">
      <Tabs defaultValue="positions">
        <TabsList className="bg-transparent p-0 border-b border-white rounded-none ">
          <TabsTrigger
            value="positions"
            className="relative rounded-none px-1 pb-3 text-sm font-medium text-gray-500 data-[state=active]:text-blue-900 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-900 data-[state=active]:shadow-none"
          >
            Positions
          </TabsTrigger>
          <TabsTrigger
            className="relative rounded-none px-1 pb-3 text-sm font-medium text-gray-500 data-[state=active]:text-blue-900 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-900 data-[state=active]:shadow-none"
            value="history"
          >
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          {!isConnected ? (
            <EmptyState message="Active Positions Unavailable" />
          ) : (
            <PositionsTable owner={address!} />
          )}
        </TabsContent>

        <TabsContent value="history">
          {!isConnected ? (
            <EmptyState message="Positions History Unavailable" />
          ) : (
            <HistoryTable owner={address!} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PositionWidget;
