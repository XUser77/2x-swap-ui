import { useAccount } from "wagmi";

function Pool() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div>
      <p>Connected Address: {address}</p>
      <p>Pool</p>
    </div>
  );
}
export default Pool;
