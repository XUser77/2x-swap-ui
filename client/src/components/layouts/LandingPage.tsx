import { motion } from "framer-motion";
import HomeNavbar from "../fragments/HomeNavbar";
import { container, itemUp } from "@/lib/animation";
import { useState } from "react";
import { api } from "@/lib/axios";
import {Link} from "react-router";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function LandingPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError(null);
    setSuccess(false);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/waitlist/addWaitlist", {
        email,
      });

      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      const message = err?.response?.data?.error || "Failed to join waitlist";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-linear-to-b from-[#193088] via-[#3045AA] to-[#a9b9ff] text-white pb-20">
      <img
        src="/stars.png"
        className="absolute top-30 opacity-25 rotate-90 scale-250 md:rotate-0 md:scale-125 z-0"
        alt=""
      />

      <HomeNavbar />

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 md:pt-10 text-center"
      >
        <motion.h1
          variants={itemUp}
          className="text-2xl md:text-5xl font-semibold mb-4"
        >
          2× exposure to BTC & ETH & RWAs
        </motion.h1>

        <motion.p
          variants={itemUp}
          className="max-w-xs text-xs md:max-w-xl md:text-xl font-semibold text-white/80 mb-10"
        >
          Decentralized, interest-free, profit-sharing protocol.
          <br />
          No forced liquidation.
        </motion.p>

        <motion.div
          variants={itemUp}
          className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/cTTQW8vIzs4?si=wWj1yWc5bJZjnnK5"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </motion.div>

        {/* Waitlist */}
        <motion.div variants={itemUp} className="mt-15 md:mt-6 w-sm md:w-md">
          <p className="flex flex-col mb-4 text-xl md:text-3xl font-semibold">
            Live on Ethereum mainnet
          </p>

          <div className="flex flex-col gap-4 md:gap-6 items-center mt-10 mx-10">

            <Link
              to="/swap" className="w-full px-6 py-1.5 md:py-3 rounded-full bg-linear-to-b from-[#436FF9] to-[#4C50DF] hover:from-[#3357c1] hover:to-[#4C50DF] transition font-medium shadow-md disabled:opacity-60">
              Launch App
            </Link>

          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}

export default LandingPage;
