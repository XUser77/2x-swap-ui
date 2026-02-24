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
          alt="How 2xSwap is different"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          className={`w-full transition-opacity duration-300 ease-in-out ${fading ? "opacity-0" : "opacity-100"}`}
        />

        {/* Left Chevron */}
        <button
          onClick={prev}
          className="
    absolute top-[91%] left-[30%] md:top-[12%] md:left-[75%]
    -translate-y-1/2
    h-6 w-6 md:h-10 md:w-10
    rounded-full bg-blue-100
    flex items-center justify-center shadow
    hover:bg-white transition
  "
        >
          <ChevronLeft className="h-3 w-3 md:h-6 md:w-6 text-blue-700" />
        </button>

        {/* Right Chevron */}
        <button
          onClick={next}
          className="
    absolute top-[91%] right-[30%] md:top-[12%] md:right-[10%]
    -translate-y-1/2
    h-6 w-6 md:h-10 md:w-10
    rounded-full bg-blue-100
    flex items-center justify-center shadow
    hover:bg-white transition
  "
        >
          <ChevronRight className="h-3 w-3 md:h-6 md:w-6 text-blue-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-30.5 md:bottom-20  flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`h-1 w-1 md:h-2 md:w-2 rounded-full transition ${
              i === index ? "bg-blue-600 w-3 md:w-6" : "bg-blue-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
