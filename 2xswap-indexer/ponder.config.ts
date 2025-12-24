import { createConfig } from "ponder";

export default createConfig({
  chains: {
    x2swap: {
      id: 31337,
      rpc: "http://185.146.3.206:8545",
    },
  },

  contracts: {
    X2Swap: {
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
      address: "0x30cE1101F89D236E3709408809331794c109bE36",
      startBlock: 0,
    },
  },
});
