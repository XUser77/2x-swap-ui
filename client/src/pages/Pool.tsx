import toast from "react-hot-toast";
import { useAccount } from "wagmi";

function Pool() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  function showToast() {
    toast.success("Successfully toasted!");
  }

  return (
    <div>
      <p>Connected Address: {address}</p>
      <p>Pool</p>
      <button onClick={showToast}>Press Me</button>
    </div>
  );
}
export default Pool;
