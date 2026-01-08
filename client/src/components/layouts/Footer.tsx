import { Send, createLucideIcon } from "lucide-react";

export const XFooterIcon = createLucideIcon("X", [
  [
    "path",
    {
      d: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
      stroke: "none",
      fill: "currentColor",
    },
  ],
]);

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#C8D6FF] md:h-[400px] h-[300px]">
      {/* Half circle */}
      <img
        src="/footer-curve.png"
        alt="footer curve"
        className="
          absolute -bottom-50 left-1/2 -translate-x-[55%]  -translate-y-[150%] scale-250 md:translate-y-0 md:scale-150
          w-full 
        "
      />

      {/* Content anchored to bottom */}
      <div
        className="
          absolute bottom-10 left-1/2 -translate-x-1/2
          z-10 w-full px-6
          flex flex-col items-center text-center
        "
      >
        {/* Title */}
        <h3 className="text-sm md:text-3xl font-semibold text-white mb-6">
          Stay Connect with Us
        </h3>

        {/* Buttons */}
        <div className="flex flex-row gap-4 mb-6">
          <a
            href="https://t.me/twoxswap"
            className="
              flex items-center gap-2 px-6 py-2.5
              rounded-lg bg-white text-[#00246B]
              font-medium shadow
              hover:scale-105 transition
              md:min-w-[200px] justify-center
              text-xs md:text-lg
            "
          >
            <Send className="h-3 w-3 md:h-4 md:w-4" />
            Join Telegram
          </a>

          <a
            href="https://x.com/2xswap"
            className="
              flex items-center gap-2 px-6 py-2.5
              rounded-lg bg-white text-[#00246B]
              font-medium shadow
              hover:scale-105 transition
              md:min-w-[200px] justify-center
              text-xs md:text-lg
            "
          >
            <XFooterIcon className="h-3 w-3 md:h-4 md:w-4" />
            Join Our X
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] md:text-sm text-white/80 mb-2">
          © 2025 2xSwap. All rights reserved.
        </p>

        {/* Description */}
        <p className="text-[10px] md:text-sm text-white mb-4 max-w-xl font-semibold">
          Building a decentralized, transparent, and user-first swapping
          experience.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-sm text-white font-medium">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Points Program Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
