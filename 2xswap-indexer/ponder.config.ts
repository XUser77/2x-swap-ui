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
    X2ETHPool: {
      chain: "x2swap",
      abi: [
        // Deposit
        {
          type: "event",
          name: "Deposit",
          inputs: [
            { name: "caller", type: "address", indexed: true },
            { name: "receiver", type: "address", indexed: true },
            { name: "assets", type: "uint256", indexed: false },
            { name: "shares", type: "uint256", indexed: false },
          ],
        },

        // Withdraw
        {
          type: "event",
          name: "Withdraw",
          inputs: [
            { indexed: true, name: "caller", type: "address" },
            { indexed: true, name: "receiver", type: "address" },
            { indexed: true, name: "owner", type: "address" },
            { indexed: false, name: "assets", type: "uint256" },
            { indexed: false, name: "shares", type: "uint256" },
          ],
        },
      ],
      address: "0xF4C573868c40fe388cBA162806a9c705640386C9",
      startBlock: 24039203,
    },
  },
});
