import InfoCard from "../fragments/InfoCard";

export default function InfoRow() {
  return (
    <section className="bg-linear-to-b from-[#B8C9FF] to-[#DCE5FF] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-h-[50vh]">
          {/* Card 1 */}
          <InfoCard
            title="Interest-Free Structure"
            content="No interest rate, no funding fees, no compounding debt."
          />
          <InfoCard
            title="Profit-Sharing Structure"
            content="LPs and traders share profits and losses based on performance."
          />
          <InfoCard
            title="No Forced Liquidation"
            content="Eliminating the biggest pain point in marginal trading."
          />
        </div>
      </div>
    </section>
  );
}
