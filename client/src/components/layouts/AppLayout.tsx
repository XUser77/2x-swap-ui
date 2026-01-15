import { Outlet } from "react-router";
import AppNavbar from "./AppNavbar";
import { Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import ReferralModal from "../fragments/ReferralModal";
import { api } from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

export default function AppLayout() {
  const { address, isConnected } = useAccount();
  const { wallet: authWallet, logout } = useAuth();

  const checkedRef = useRef(false);
  const [showReferral, setShowReferral] = useState(false);

  useEffect(() => {
    if (!authWallet) return;

    // Wallet disconnected
    if (!isConnected || !address) {
      logout();
      return;
    }

    // Wallet switched
    if (address.toLowerCase() !== authWallet.toLowerCase()) {
      logout();
    }
  }, [address, isConnected, authWallet, logout]);

  useEffect(() => {
    checkedRef.current = false;
    setShowReferral(false);
  }, [address]);

  useEffect(() => {
    if (!isConnected || !address) return;
    if (checkedRef.current) return;

    checkedRef.current = true;

    async function checkUser() {
      const { data } = await api.get("/api/user/exists", {
        params: { wallet: address?.toLowerCase() },
      });

      if (!data.exists) {
        setShowReferral(true);
      }
    }

    checkUser();
  }, [isConnected, address]);

  return (
    <>
      <AppNavbar />
      <main>
        <Outlet />
        <Toaster />

        <ReferralModal
          open={showReferral}
          wallet={address!}
          onComplete={() => setShowReferral(false)}
        />
      </main>
    </>
  );
}
