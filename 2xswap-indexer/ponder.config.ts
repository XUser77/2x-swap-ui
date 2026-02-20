import { createConfig } from "ponder";

export default createConfig({
  chains: {
    sepolia: {
      id: 11155111,
      rpc: process.env.PONDER_RPC_URL_1, 
      ethGetLogsBlockRange: 2000, // safer for public RPCs
    },
  },

  contracts: {
    X2ETHSwap: {
      chain: "sepolia",
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
      address: "0x354a40B470c888F216F66e14e3C930506C38b788",
      startBlock: 10296604,
    },
    X2BTCSwap: {
      chain: "sepolia",
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
      address: "0x606A69d06C687aaFd6567f8001218F678c21dFf3",
      startBlock: 10296604,
    },
    X2ETHPool: {
      chain: "sepolia",
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
      address: "0xe2c95f4877658a6305247d481d489862baa9a5e1",
      startBlock: 10296604,
    },
  },
});
