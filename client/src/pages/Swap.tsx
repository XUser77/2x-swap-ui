import { useAccount } from "wagmi";

function Swap() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div>
      <p>Connected Address: {address}</p>
      <p>Swap</p>
    </div>
  );
}
export default Swap;
