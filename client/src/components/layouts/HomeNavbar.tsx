import { Link } from "react-router";

export default function HomeNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        2xSwap
      </Link>

      {/* Links */}
      <div className="flex gap-6">
        <a href="#features" className="text-gray-600 hover:text-black">
          Features
        </a>
        <a href="#how-it-works" className="text-gray-600 hover:text-black">
          How it Works
        </a>
        <a href="#faq" className="text-gray-600 hover:text-black">
          FAQ
        </a>
      </div>

      {/* CTA */}
      <Link
        to="/swap"
        className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
      >
        Launch App
      </Link>
    </nav>
  );
}
