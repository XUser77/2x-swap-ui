type ReferralStatCardProps = {
  label: string;
  value: string | number;
};

export function ReferralStatCard({ label, value }: ReferralStatCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
