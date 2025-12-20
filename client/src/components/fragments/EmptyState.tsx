import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-16 text-center text-gray-500">
      <p className="mb-4">{message}</p>
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <button
            onClick={openConnectModal}
            className="bg-black text-white font-semibold p-2 rounded-xl"
          >
            Connect Wallet
          </button>
        )}
      </ConnectButton.Custom>
    </div>
  );
}
