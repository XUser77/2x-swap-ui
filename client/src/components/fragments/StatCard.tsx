interface StatCardProps {
  title: string;
  content: string;
  info: string;
}

function StatCard({ title, content, info }: StatCardProps) {
  return (
    <div className="w-[48%] md:min-w-[20vw] md:w-auto flex flex-col justify-center h-32 bg-white rounded-xl p-5">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold mt-2 mb-1">{content}</div>
      <div className="text-xs">{info}</div>
    </div>
  );
}
export default StatCard;
