function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl p-1
        bg-linear-to-b from-[#071b46] to-[#DCE5FF]
        transition-transform duration-300 hover:scale-105
      "
    >
      {/* Inner card */}
      <div
        className="
          relative overflow-hidden rounded-xl bg-white
          py-7 px-10 flex flex-col justify-center gap-4
        "
      >
        {/* Circle fill */}
        <span
          className="
            absolute inset-0
            flex items-center justify-center
            pointer-events-none 
          "
        >
          <span
            className="
              h-3 w-3 rounded-full bg-linear-to-b from-[#0026fd] to-white
              scale-0
              transition-transform ease-in-out duration-700
              group-hover:scale-[35] 
            "
          />
        </span>

        {/* Content */}
        <h3
          className="
            relative z-10 text-xl font-semibold text-black
            transition-colors duration-500 group-hover:text-white
          "
        >
          {title}
        </h3>
        <p
          className="
            relative z-10 text-black leading-relaxed
            transition-colors duration-500 group-hover:text-white
          "
        >
          {content}
        </p>
      </div>
    </div>
  );
}

export default InfoCard;
