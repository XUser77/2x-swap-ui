type ActorCardProps = {
  title: string;
  description: string;
};

export function ActorCard({ title, description }: ActorCardProps) {
  return (
    <div
      className="
        w-full max-w-80
        rounded-2xl bg-linear-to-b from-white to-[#e1e8fa]
        px-8 py-7
        shadow-lg hover:-translate-y-1 transition
      "
    >
      <h3 className="text-xl font-bold text-black mb-4 text-center">{title}</h3>

      <div className="h-px w-full bg-gray-200 mb-5" />

      <p className="text-gray-700 text-sm leading-relaxed font-semibold">
        {description}
      </p>
    </div>
  );
}
