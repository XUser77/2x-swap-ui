import { NavLink } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function AppNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
      {/* Left: Logo + nav */}
      <NavLink to="/swap" className="text-xl font-bold">
        2xSwap
      </NavLink>

      <div className="flex gap-6">
        <NavLink
          to="/swap"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black"
              : "text-gray-500 hover:text-black"
          }
        >
          Swap
        </NavLink>

        <NavLink
          to="/pool"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-black"
              : "text-gray-500 hover:text-black"
          }
        >
          Pool
        </NavLink>
      </div>

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

          // Not connected
          if (!account) {
            return (
              <button
                onClick={openConnectModal}
                className="bg-black text-white font-semibold px-4 py-2 rounded-xl"
              >
                Connect Wallet
              </button>
            );
          }

          // Wrong network
          if (chain?.unsupported) {
            return (
              <button
                onClick={openChainModal}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl"
              >
                Wrong Network
              </button>
            );
          }

          // Connected
          return (
            <button
              onClick={openAccountModal}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
            >
              <span className="text-sm font-medium">{account.displayName}</span>
            </button>
          );
        }}
      </ConnectButton.Custom>
    </nav>
  );
}
