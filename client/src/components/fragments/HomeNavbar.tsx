import { Link } from "react-router";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

const navPillBase = "flex items-center justify-center h-9 w-36 transition";

export default function HomeNavbar() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);

  return (
    <nav className="w-full relative z-15 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <Link to="/" className="text-xl font-semibold text-white">
        2xSwap
      </Link>

      {/* Nav Actions */}
      <div className="hidden md:flex items-center gap-5">
        {/* Community */}
        <div
          className="relative"
          onMouseEnter={() => setShowCommunityDropdown(true)}
          onMouseLeave={() => setShowCommunityDropdown(false)}
        >
          <div
            className={`${navPillBase} 
              ${
                showCommunityDropdown
                  ? "bg-white text-gray-800 rounded-t-2xl"
                  : "bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_5px_rgba(255,255,255,0.35)] rounded-full"
              }
              hover:bg-white cursor-pointer`}
          >
            Community
          </div>

          {showCommunityDropdown && (
            <div className="absolute top-full left-0 w-36 bg-white rounded-b-2xl shadow-lg overflow-hidden pt-1">
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gray-300" />

              <Link
                to="https://x.com/2xswap"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                X Account
              </Link>
              <Link
                to="https://t.me/twoxswap"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Telegram Chat
              </Link>
              <Link
                to="https://t.me/twoxswap"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Telegram Channel
              </Link>
            </div>
          )}
        </div>

        {/* Learn */}
        <div
          className="relative"
          onMouseEnter={() => setShowLearnDropdown(true)}
          onMouseLeave={() => setShowLearnDropdown(false)}
        >
          <div
            className={`${navPillBase} 
              ${
                showLearnDropdown
                  ? "bg-white text-gray-800 rounded-t-2xl"
                  : "bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_5px_rgba(255,255,255,0.35)] rounded-full"
              }
              hover:bg-white hover:text-gray-800 cursor-pointer`}
          >
            Learn
          </div>

          {showLearnDropdown && (
            <div className="absolute top-full left-0 w-36 bg-white rounded-b-2xl shadow-lg overflow-hidden pt-1">
              <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gray-300" />

              <Link
                to="https://github.com/Migra-orange"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Docs
              </Link>
              <Link
                to="https://docs.google.com/document/d/1GJZweWVdxrDBjw43zoN3OXPjR2ZJ_ZsOHn_8MEmCum4/edit?usp=sharing/"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Whitepaper
              </Link>
            </div>
          )}
        </div>

        {/* Launch App */}
        <Link
          to="/swap"
          className="flex items-center justify-center cursor-pointer h-9 w-36 rounded-full 
            bg-white text-[#1E5FD8] font-medium
            shadow-[0_0_10px_rgba(255,255,255,0.6)]
            hover:shadow-[0_0_35px_rgba(255,255,255,0.8)]
            transition "
        >
          Launch App
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex items-center justify-center
             w-11 h-11 rounded-full
             bg-white/10 backdrop-blur-md border border-white/30
             text-white transition"
      >
        <div className="relative w-6 h-6">
          {/* Top line */}
          <span
            className={`absolute left-0 top-1/2 w-6 h-[2px] bg-white
        transition-transform duration-300
        ${mobileOpen ? "rotate-45" : "-translate-y-2"}`}
          />

          {/* Middle line */}
          <span
            className={`absolute left-0 top-1/2 w-6 h-[2px] bg-white
        transition-opacity duration-200
        ${mobileOpen ? "opacity-0" : "opacity-100"}`}
          />

          {/* Bottom line */}
          <span
            className={`absolute left-0 top-1/2 w-6 h-[2px] bg-white
        transition-transform duration-300
        ${mobileOpen ? "-rotate-45" : "translate-y-2"}`}
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full
    bg-[#0B1F4A]/95 backdrop-blur-xl
    border-t border-white/10
    px-6 py-6 space-y-4 z-50
    transition-all duration-300 ease-out
    ${
      mobileOpen
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-4 pointer-events-none"
    }`}
      >
        {/* Community */}
        <div>
          <button
            onClick={() => setMobileCommunityOpen(!mobileCommunityOpen)}
            className="w-full flex justify-between items-center
                   text-white text-lg font-medium"
          >
            Community
            <span
              className={`transition-transform duration-300
    ${mobileCommunityOpen ? "rotate-180" : ""}`}
            >
              <ChevronUp />
            </span>
          </button>

          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ease-out ${
              mobileCommunityOpen
                ? "max-h-40 opacity-100 mt-3 space-y-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link to="https://x.com/2xswap" className="block text-white/80">
              X Account
            </Link>
            <Link to="https://t.me/twoxswap" className="block text-white/80">
              Telegram Chat
            </Link>
            <Link to="https://t.me/twoxswap" className="block text-white/80">
              Telegram Channel
            </Link>
          </div>
        </div>

        {/* Learn */}
        <div>
          <button
            onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
            className="w-full flex justify-between items-center
                   text-white text-lg font-medium"
          >
            Learn
            <span
              className={`transition-transform duration-300 ${
                mobileLearnOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronUp />
            </span>{" "}
          </button>

          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ease-out ${
              mobileLearnOpen
                ? "max-h-32 opacity-100 mt-3 space-y-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <Link
              to="https://github.com/Migra-orange"
              className="block text-white/80"
            >
              Docs
            </Link>
            <Link
              to="https://docs.google.com/document/d/1GJZweWVdxrDBjw43zoN3OXPjR2ZJ_ZsOHn_8MEmCum4/edit?usp=sharing/"
              className="block text-white/80"
            >
              Whitepaper
            </Link>
          </div>
        </div>

        {/* Launch App */}
        <Link
          to="/swap"
          className="block text-center mt-4 py-3 rounded-full
                 bg-white text-[#1E5FD8] font-medium
                 shadow-[0_0_15px_rgba(255,255,255,0.6)]"
        >
          Launch App
        </Link>
      </div>
    </nav>
  );
}
