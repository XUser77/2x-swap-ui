import { useAccount } from "wagmi";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import UserSeasonStatus from "../fragments/UserSeasonStatus";

function PointStatus() {
  const { address, isConnected } = useAccount();
  const { login, isLoggedIn } = useWalletAuth();

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!address) return;

    setLoading(true);
    try {
      await login(address);
      toast.success("Logged in successfully");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const loggedIn = isLoggedIn();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Your status this season</h2>

      {/* NOT LOGGED IN */}
      {!loggedIn && (
        <div className="flex flex-col items-center justify-center py-10 ">
          <h3 className="text-lg font-semibold mb-2">
            Click login to continue
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Login to see your points, rank, and rewards
          </p>

          <button
            onClick={handleLogin}
            disabled={!isConnected || loading}
            className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-2 rounded-xl disabled:opacity-50"
          >
            {loading ? "Signing..." : "Login with Wallet"}
          </button>
        </div>
      )}

      {/* LOGGED IN */}
      {loggedIn && <UserSeasonStatus />}
    </div>
  );
}

export default PointStatus;
