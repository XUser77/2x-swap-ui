import { useState } from "react";
import OutcomeCard from "../fragments/OutcomeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type colorType = "green" | "red" | "yellow";

type OutcomeCardProps = {
  title: string;
  subtitle: string;
  color: colorType;
  bullets: string[];
  footer: string;
}[];

const slides: OutcomeCardProps = [
  {
    title: "Price Goes Up",
    subtitle: "The position is closed with profit",
    color: "green",
    bullets: [
      "The Liquidity Pool receives its share first",
      "User A receives the remaining profit",
      "Profit is shared according to predefined rules",
    ],
    footer:
      "User A benefits from upside while LPs earn from successful positions.",
  },
  {
    title: "Price Drops (up to 50%)",
    subtitle: "Loss is absorbed by User A",
    color: "yellow",
    bullets: [
      "The Liquidity Pool is fully returned",
      "User A absorbs the loss",
      "LP capital remains protected",
    ],
    footer: "Losses are first absorbed by the trader, not the pool.",
  },
  {
    title: "Price Drops Significantly",
    subtitle: "The loss exceeds User A’s deposit",
    color: "red",
    bullets: [
      "All available funds are returned to the Liquidity Pool",
      "User A loses their full deposit",
      "LPs may incur partial loss depending on market movement",
    ],
    footer: "Extreme market moves can impact both sides.",
  },
];

export default function PossibleOutcomes() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <section className="relative py-18 text-center bg-[#DCE5FF] overflow-hidden">
      {/* Title */}
      <h2 className="text-5xl font-semibold text-[#00246B] mb-5">
        Possible Outcomes
      </h2>
      <p className="text-[#00246B]/60 font-semibold text-2xl max-w-130 mx-auto">
        Every position follows clear, predefined rules. Here’s how profits and
        losses are handled.
      </p>

      {/* Slider */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-90 flex items-center justify-center">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="absolute left-1/2 -translate-x-85 z-30
        w-10 h-10 rounded-full bg-white shadow
        flex items-center justify-center text-xl
        hover:scale-105 transition"
          >
            <ChevronLeft />
          </button>

          {/* Slides */}
          {slides.map((slide, index) => {
            const isActive = index === active;
            const isLeft =
              index === (active - 1 + slides.length) % slides.length;
            const isRight = index === (active + 1) % slides.length;

            return (
              <div
                key={index}
                className={`
            absolute transition-all duration-500
            ${
              isActive
                ? "z-20 scale-100 opacity-100 hover:-translate-y-3"
                : "z-10 scale-90 opacity-80 blur-xs pointer-events-none"
            }
            ${isLeft ? "-translate-x-125" : ""}
            ${isRight ? "translate-x-125" : ""}
          `}
              >
                <OutcomeCard {...slide} active={isActive} />
              </div>
            );
          })}

          {/* Right arrow */}
          <button
            onClick={next}
            className="absolute left-1/2 translate-x-75 z-30
        w-10 h-10 rounded-full bg-white shadow
        flex items-center justify-center text-xl
        hover:scale-105 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className=" text-[#00246B]/70 text-xl">
        All outcomes are enforced by smart contracts.
        <br />
        No interest, no liquidations, no manual intervention.
      </p>
    </section>
  );
}
