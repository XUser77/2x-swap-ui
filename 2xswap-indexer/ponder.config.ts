import { createConfig } from "ponder";

export default createConfig({
  chains: {
    x2swap: {
      id: 31337,
      rpc: process.env.PONDER_RPC_URL_1,
    },
  },

  contracts: {
    X2ETHSwap: {
      chain: "x2swap",
      abi: [
        // OpenPosition
        {
          type: "event",
          name: "OpenPosition",
          inputs: [
            { indexed: true, name: "id", type: "uint256" },
            { indexed: true, name: "sender", type: "address" },
            { name: "assetAmount", type: "uint256" },
            { name: "targetAmount", type: "uint256" },
            { name: "profitSharing", type: "uint256" },
            { name: "feeAmount", type: "uint256" },
          ],
        },
        // ClosePosition
        {
          type: "event",
          name: "ClosePosition",
          inputs: [
            { indexed: true, name: "id", type: "uint256" },
            { name: "closeAssetAmount", type: "uint256" },
            { name: "feeAmount", type: "uint256" },
          ],
        },
      ],
      address: "0xeB02697D88FF777393F3b3c8DE2231038E65828a",
      startBlock: 24039203,
    },
  },
});
