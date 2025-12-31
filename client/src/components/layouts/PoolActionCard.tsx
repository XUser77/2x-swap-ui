"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DepositPanel from "../fragments/DepositPanel";
import WithdrawPanel from "../fragments/WithdrawPanel";

export default function PoolActionCard() {
  return (
    <div className="bg-white rounded-xl p-6 flex-1">
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="bg-white p-1 rounded-md w-full justify-start">
          <TabsTrigger
            value="deposit"
            className="
              rounded-md px-6 py-4 text-sm font-medium
              text-gray-700
              data-[state=active]:bg-blue-900
              data-[state=active]:text-white
              data-[state=active]:shadow-none
            "
          >
            Deposit
          </TabsTrigger>

          <TabsTrigger
            value="withdraw"
            className="
              rounded-md px-6 py-4 text-sm font-medium
              text-gray-700
              data-[state=active]:bg-blue-900
              data-[state=active]:text-white
              data-[state=active]:shadow-none
            "
          >
            Withdraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deposit" className="mt-2">
          <DepositPanel />
        </TabsContent>

        <TabsContent value="withdraw" className="mt-2">
          <WithdrawPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
