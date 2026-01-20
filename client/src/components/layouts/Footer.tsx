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
    <footer className="relative w-full overflow-hidden bg-linear-to-b from-[#b2c5fc] to-[#C8D6FF] md:h-[400px] h-[180px]">
      {/* Elips circle (Desktop) */}
      <img
        src="/footer-curve.png"
        alt="footer curve"
        className="hidden md:flex
          absolute -bottom-50 left-1/2 -translate-x-[55%] scale-150
          w-full 
        "
      />

      {/* Half circle (Mobile)*/}
      <img
        src="/footer-half-circle.png"
        alt="footer half circle"
        className="flex md:hidden
          absolute bottom-0.5 scale-105
        "
      />

      {/* Content anchored to bottom */}
      <div
        className="
          absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2
          z-10 w-full px-6
          flex flex-col items-center text-center
        "
      >
        {/* Title */}
        <h3 className="text-xs md:text-3xl font-semibold text-white mb-2 md:mb-6">
          Stay Connect with Us
        </h3>

        {/* Buttons */}
        <div className="flex gap-4 mb-2 md:mb-6">
          <div
            className="
               px-2 py-1 md:px-6 md:py-2.5
              rounded-md bg-white text-[#00246B]
              font-medium shadow
              hover:scale-105 transition
              md:min-w-[200px]
              text-[7px] md:text-lg
            "
          >
            <a
              href="https://t.me/twoxswap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <Send className="h-2 w-2 md:h-4 md:w-4" />
              Join Telegram
            </a>
          </div>

          <div
            className=" px-2 py-1 md:px-6 md:py-2.5
              rounded-md bg-white text-[#00246B]
              font-medium shadow
              hover:scale-105 transition
              md:min-w-[200px]
              text-[7px] md:text-lg"
          >
            <a
              href="https://x.com/2xswap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1"
            >
              <XFooterIcon className="h-2 w-2 md:h-4 md:w-4" />
              Join Our X
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[6px] md:text-sm text-white">
          © 2025 2xSwap. All rights reserved.
        </p>

        {/* Description */}
        <p className="text-[6px] md:text-sm text-white mb-2 max-w-xl font-semibold">
          Building a decentralized, transparent, and user-first swapping
          experience.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-2 text-[6px] md:text-sm text-white font-medium">
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <span>|</span>
          <a
            href="https://2xswap.gitbook.io/2xswap-docs/readme-2"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Points Program Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
