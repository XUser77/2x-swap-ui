import { createLucideIcon, Send } from "lucide-react";

const XIcon = createLucideIcon("X", [
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
    <footer className="relative w-full overflow-hidden bg-[#C8D6FF]">
      {/* Half circle background */}
      <img
        src="/footer-curve.png"
        alt="footer curve"
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-400"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-10">
        {/* Title */}
        <h3 className="text-3xl font-semibold text-white mb-6">
          Stay Connect with Us
        </h3>

        {/* Buttons */}
        <div className="flex gap-4 mb-6 ">
          <a
            href="#"
            className="
              flex items-center gap-2 px-6 py-2.5
              rounded-lg bg-white text-[#00246B]
              font-medium shadow
              hover:scale-105 transition min-w-50 justify-center
            "
          >
            <Send className="h-4 w-4" />
            Join Telegram
          </a>

          <a
            href="#"
            className="
              flex items-center gap-2 px-6 py-2.5
              rounded-lg bg-white text-[#00246B]
              font-medium shadow
              hover:scale-105 transition min-w-50 justify-center
            "
          >
            <span className="font-bold">
              <XIcon className="h-4 w-4" />
            </span>
            Join Our X
          </a>
        </div>

        {/* Copyright */}
        <p className="text-md text-white/80 mb-2">
          © 2025 2xSwap. All rights reserved.
        </p>

        {/* Description */}
        <p className="text-md text-white mb-4 max-w-xl font-semibold">
          Building a decentralized, transparent, and user-first swapping
          experience.
        </p>

        {/* Links */}
        <div className="flex gap-4 text-md text-white font-medium">
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
