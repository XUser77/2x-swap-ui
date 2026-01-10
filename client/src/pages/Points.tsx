import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReferralsTab from "@/components/layouts/ReferralsTab";
import HowPointsWorkTab from "@/components/layouts/HowPointWorksTab";
import LeaguesTab from "@/components/layouts/LeaguesTab";
import LeaderboardTab from "@/components/layouts/LeaderboardTab";
import PointStatus from "@/components/layouts/PointStatus";

export default function Points() {
  return (
    <section className="bg-[#DCE9FF] py-10">
      <div className="max-w-6xl mx-auto px-4">
        <PointStatus />

        <div className="rounded-md mt-6">
          <Tabs defaultValue="referrals" className="w-full">
            <TabsList className="bg-transparent p-0 border-b border-gray-200 rounded-none px-6 gap-4">
              <TabsTrigger
                value="referrals"
                className="relative rounded-none px-1 pb-3 text-sm font-medium text-gray-500
                  data-[state=active]:text-black
                  data-[state=active]:border-b-2
                  data-[state=active]:border-b-black
                  data-[state=active]:shadow-none"
              >
                Referrals
              </TabsTrigger>

              <TabsTrigger
                value="how"
                className="relative rounded-none px-1 pb-3 text-sm font-medium text-gray-500
                  data-[state=active]:text-black
                  data-[state=active]:border-b-2
                  data-[state=active]:border-b-black
                  data-[state=active]:shadow-none"
              >
                How points work
              </TabsTrigger>

              <TabsTrigger
                value="leagues"
                className="relative rounded-none px-1 pb-3 text-sm font-medium text-gray-500
                  data-[state=active]:text-black
                  data-[state=active]:border-b-2
                  data-[state=active]:border-b-black
                  data-[state=active]:shadow-none"
              >
                Leagues
              </TabsTrigger>

              <TabsTrigger
                value="leaderboard"
                className="relative rounded-none px-1 pb-3 text-sm font-medium text-gray-500
                  data-[state=active]:text-black
                  data-[state=active]:border-b-2
                  data-[state=active]:border-b-black
                  data-[state=active]:shadow-none"
              >
                Leaderboard
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="referrals">
                <ReferralsTab />
              </TabsContent>

              <TabsContent value="how">
                <HowPointsWorkTab />
              </TabsContent>

              <TabsContent value="leagues">
                <LeaguesTab />
              </TabsContent>

              <TabsContent value="leaderboard">
                <LeaderboardTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
