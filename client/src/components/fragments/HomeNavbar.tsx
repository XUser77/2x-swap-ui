import { Link } from "react-router";
import { useState } from "react";
import {
  ChevronUp,
  FileText,
  FolderOpen,
  MessageCirclePlus,
  Send,
} from "lucide-react";
import { XFooterIcon } from "../layouts/Footer";

const navPillBase = "flex items-center justify-center h-9 w-36 transition";

export default function HomeNavbar() {
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [showLearnDropdown, setShowLearnDropdown] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);

  function toggleCommunity() {
    setMobileCommunityOpen((v) => !v);
    setMobileLearnOpen(false);
  }

  function toggleLearn() {
    setMobileLearnOpen((v) => !v);
    setMobileCommunityOpen(false);
  }

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

              <a
                href="https://x.com/2xswap"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                X Account
              </a>

              <a
                href="https://t.me/twoxswapchat"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Telegram Chat
              </a>

              <a
                href="https://t.me/twoxswap"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Telegram Channel
              </a>
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

              <a
                href="https://github.com/XUser77/2x-swap"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Docs
              </a>

              <a
                href="https://2xswap.gitbook.io/2xswap-docs/readme-1"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Whitepaper
              </a>
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
        className={`md:hidden absolute top-20 right-4 w-[180px]
    rounded-2xl bg-white/20 backdrop-blur-xl
    shadow-[0_20px_60px_rgba(0,0,0,0.35)]
     py-4 z-50
    transition-all duration-300 ease-out
    ${
      mobileOpen
        ? "opacity-100 scale-100 pointer-events-auto"
        : "opacity-0 scale-95 pointer-events-none"
    }`}
      >
        {/* Community */}
        <div className="rounded-xl px-3 py-2">
          <button
            onClick={toggleCommunity}
            className={`w-full flex justify-between items-center
                  text-sm px-2 py-2 rounded-lg ${
                    mobileCommunityOpen
                      ? "bg-gray-300 text-[#1E5FD8]"
                      : "text-white"
                  }`}
          >
            Community
            <ChevronUp
              className={`transition-transform duration-300  ${
                mobileCommunityOpen ? "rotate-180" : "rotate-90"
              }`}
              size={16}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileCommunityOpen
                ? "max-h-40 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <a
              href="https://x.com/2xswap"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 text-white/90 text-xs flex justify-start mt-2"
            >
              <XFooterIcon className="w-4 h-4 mr-2" />
              Account
            </a>

            <a
              href="https://t.me/twoxswapchat"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 text-white/90 text-xs flex justify-start mt-2"
            >
              <MessageCirclePlus className="w-4 h-4 mr-2" />
              Telegram Chat
            </a>

            <a
              href="https://t.me/twoxswap"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 text-white/90 text-xs flex justify-start mt-2"
            >
              <Send className="w-4 h-4 mr-2" />
              Telegram Channel
            </a>
          </div>
        </div>

        {/* Learn */}
        <div className=" rounded-xl px-3 py-2">
          <button
            onClick={toggleLearn}
            className={`w-full flex justify-between items-center
                  text-sm px-2 py-2 rounded-lg ${
                    mobileLearnOpen
                      ? "bg-gray-300 text-[#1E5FD8]"
                      : "text-white"
                  }`}
          >
            Learn
            <ChevronUp
              className={`transition-transform duration-300 ${
                mobileLearnOpen ? "rotate-180" : "rotate-90"
              }`}
              size={16}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileLearnOpen
                ? "max-h-32 opacity-100 mt-2"
                : "max-h-0 opacity-0"
            }`}
          >
            <a
              href="https://github.com/XUser77/2x-swap"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 text-white/90 text-xs flex justify-start mt-2"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Docs
            </a>

            <a
              href="https://2xswap.gitbook.io/2xswap-docs/readme-1"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 text-white/90 text-xs flex justify-start mt-2"
            >
              <FileText className="w-4 h-4 mr-2" />
              Whitepaper
            </a>
          </div>
        </div>

        {/* Launch App */}
        <Link
          to="/swap"
          className="block px-5 mt-2 text-center py-3 rounded-xl
              bg-linear-to-r from-[#6756c7] to-[#3421a1] text-white mx-3"
        >
          Launch App
        </Link>
      </div>
    </nav>
  );
}
