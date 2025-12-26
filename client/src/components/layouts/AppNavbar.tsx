import { NavLink } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowLeftRight, Droplets, Star } from "lucide-react";

export default function AppNavbar() {
  return (
    <>
      {/* TOP BAR (Desktop + Mobile) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b bg-white">
        {/* Logo */}
        <NavLink to="/swap" className="text-xl font-semibold">
          2xSwap
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <DesktopLink to="/swap">Swap 2x</DesktopLink>
          <DesktopLink to="/pool">Pool</DesktopLink>
          <DesktopLink to="/points">Points</DesktopLink>
        </div>

        {/* Wallet */}
        <WalletButton />
      </nav>

      {/* BOTTOM NAV (Mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
        <div className="flex justify-around items-center py-3">
          <MobileLink to="/swap" label="Swap 2x" icon={<ArrowLeftRight />} />
          <MobileLink to="/pool" label="Pool" icon={<Droplets />} />
          <MobileLink to="/points" label="Points" icon={<Star />} />
        </div>
      </nav>

      {/* Spacer so content doesn't hide behind nav */}
      <div className="h-17 md:h-17" />
    </>
  );
}

/* Desktop Link */
function DesktopLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "font-semibold text-[#022368] border-b-2 border-[#022368]"
          : "text-gray-500 hover:text-black"
      }
    >
      {children}
    </NavLink>
  );
}

/* Mobile Link */
function MobileLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-xs ${
          isActive ? "text-[#022368]" : "text-gray-400"
        }`
      }
    >
      <div>{icon}</div>
      <span className="mt-1">{label}</span>
    </NavLink>
  );
}

/* Wallet Button */
function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openConnectModal,
        openAccountModal,
        openChainModal,
      }) => {
        if (!mounted) return null;

        if (!account) {
          return (
            <button
              onClick={openConnectModal}
              className="bg-[#022368] text-white font-semibold px-4 py-2 rounded-xl"
            >
              Connect wallet
            </button>
          );
        }

        if (chain?.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl"
            >
              Wrong network
            </button>
          );
        }

        return (
          <button
            onClick={openAccountModal}
            className="flex items-center gap-2 bg-[#022368] text-white px-4 py-2 rounded-xl"
          >
            <span className="text-sm font-medium">{account.displayName}</span>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
