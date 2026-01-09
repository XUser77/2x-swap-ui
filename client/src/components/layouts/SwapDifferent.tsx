import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  "/images/different-1.png",
  "/images/different-2.png",
  "/images/different-3.png",
  "/images/different-4.png",
  "/images/different-5.png",
];

export default function SwapDifferent() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const changeSlide = (nextIndex: number) => {
    if (fading || nextIndex === index) return;

    setFading(true);

    // Fade out → change → fade in
    setTimeout(() => {
      setIndex(nextIndex);
      setFading(false);
    }, 250);
  };

  const prev = () => changeSlide(index === 0 ? slides.length - 1 : index - 1);

  const next = () => changeSlide(index === slides.length - 1 ? 0 : index + 1);

  return (
    <section className="relative w-full flex flex-col items-center py-24 bg-[#bcc7fa]">
      <h2 className="text-2xl md:text-5xl font-semibold text-[#00246B] mb-5">
        How 2xSwap Is Different
      </h2>

      {/* Main Card */}
      <div className="relative w-275 max-w-full md:max-w-[70%] mt-3">
        <img
          src={slides[index]}
          alt={`slide-${index}`}
          className={`
            w-full
            transition-opacity duration-300 ease-in-out
            ${fading ? "opacity-0" : "opacity-100"}
          `}
        />

        {/* Left Chevron */}
        <button
          onClick={prev}
          className="absolute right-68 top-79 md:right-44 md:top-20 -translate-y-1/2
                     h-4 w-4 md:h-8 md:w-8 rounded-full bg-blue-100
                     flex items-center justify-center shadow
                     hover:bg-white transition"
        >
          <ChevronLeft className="h-3 w-3 md:h-6 md:w-6 text-blue-700" />
        </button>

        {/* Right Chevron */}
        <button
          onClick={next}
          className="absolute right-35 top-79 md:right-22 md:top-20 -translate-y-1/2
                     h-4 w-4 md:h-8 md:w-8 rounded-full bg-blue-100
                     flex items-center justify-center shadow
                     hover:bg-white transition"
        >
          <ChevronRight className="h-3 w-3 md:h-6 md:w-6 text-blue-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-29 md:bottom-20  flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-blue-600 w-6" : "bg-blue-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
