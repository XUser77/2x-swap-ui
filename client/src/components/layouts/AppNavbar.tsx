import { NavLink } from "react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function AppNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
      {/* Left: Logo + nav */}
      <div className="flex items-center gap-8">
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
      </div>

      <ConnectButton />
    </nav>
  );
}
