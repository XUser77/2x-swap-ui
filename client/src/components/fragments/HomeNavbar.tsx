import { Link } from "react-router";
import { useState } from "react";

const navPillBase = "flex items-center justify-center h-9 w-36 transition";

export default function HomeNavbar() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);

  return (
    <nav className="w-full relative z-15 flex items-center justify-between px-8 py-6">
      {/* Logo */}
      <Link to="/" className="text-xl font-semibold text-white">
        2xSwap
      </Link>

      {/* Nav Actions */}
      <div className="flex items-center gap-5">
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
                to="/x-account"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                X Account
              </Link>
              <Link
                to="/telegram-chat"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Telegram Chat
              </Link>
              <Link
                to="/telegram-channel"
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
                to="/docs"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Docs
              </Link>
              <Link
                to="/whitepaper"
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
    </nav>
  );
}
