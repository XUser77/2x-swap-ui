import { useState } from "react";
import OutcomeCard from "../fragments/OutcomeCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { slides } from "@/lib/OutcomeCardContent";

export default function PossibleOutcomes() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  const CARD_WIDTH = 280; // match OutcomeCard width
  const GAP = 40;
  const PEEK = -20; // how much of next card is visible

  return (
    <section className="relative py-18 text-center bg-[#d3dbff] overflow-hidden">
      {/* Title */}
      <h2 className="text-2xl md:text-5xl font-semibold text-[#00246B] mb-5">
        Possible Outcomes
      </h2>
      <p className="text-[#00246B]/60 font-semibold text-sm md:text-2xl max-w-xs md:max-w-130 mx-auto">
        Every position follows clear, predefined rules. Here’s how profits and
        losses are handled.
      </p>

      {/* Slider */}
      <div className="hidden md:flex relative items-center justify-center">
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

      <div className="md:hidden relative overflow-hidden pt-10 pb-20 md:pb-10">
        {/* Side fade (optional but matches image) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#DCE5FF] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#DCE5FF] to-transparent z-10" />

        <motion.div
          className="flex"
          drag="x"
          dragElastic={0.1}
          dragConstraints={{
            left: -(slides.length - 1) * (CARD_WIDTH + GAP) + PEEK,
            right: PEEK,
          }}
          animate={{
            x: -active * (CARD_WIDTH + GAP) + PEEK,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 28,
          }}
          onDragEnd={(_, info) => {
            const threshold = 60;

            if (info.offset.x < -threshold && active < slides.length - 1) {
              setActive((a) => a + 1);
            }
            if (info.offset.x > threshold && active > 0) {
              setActive((a) => a - 1);
            }
          }}
          style={{
            paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}px)`,
            paddingRight: `calc(50vw - ${CARD_WIDTH / 2}px)`,
          }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="shrink-0"
              style={{
                width: CARD_WIDTH,
                marginRight: GAP,
              }}
              animate={{
                opacity: index === active ? 1 : 0.45,
              }}
              transition={{ duration: 0.2 }}
            >
              <OutcomeCard {...slide} active={index === active} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <p className=" text-[#00246B]/70 text-xs md:text-xl">
        All outcomes are enforced by smart contracts.
        <br />
        No interest, no liquidations, no manual intervention.
      </p>
    </section>
  );
}
