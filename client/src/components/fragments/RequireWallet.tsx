import { useWalletAuth } from "@/hooks/useWalletAuth";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type RequireWalletProps = {
  isConnected: boolean;
  children: React.ReactNode;
};

export default function RequireWallet({
  isConnected,
  children,
}: RequireWalletProps) {
  const { isLoggedIn } = useWalletAuth();

  const loggedIn = isLoggedIn();

  if (!isConnected)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl">
        <h3 className="text-lg font-semibold mb-2">
          Connect your wallet to continue
        </h3>

        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Points, referrals, leagues, and leaderboard data are only available
          once your wallet is connected.
        </p>

        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="bg-blue-900 text-white font-semibold p-2 rounded-xl"
            >
              Connect Wallet
            </button>
          )}
        </ConnectButton.Custom>
      </div>
    );

  if (!loggedIn)
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Click login to continue</h3>

        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Points, referrals, leagues, and leaderboard data are only available
          once you logged in.
        </p>
      </div>
    );

  return <>{children}</>;
}
