import { createConfig } from "ponder";

export default createConfig({
  chains: {
    mainnet: {
      id: 1,
      rpc: process.env.PONDER_RPC_URL_1, 
      ethGetLogsBlockRange: 2000, // safer for public RPCs
    },
  },

  contracts: {
    X2ETHSwap: {
      chain: "mainnet",
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
      address: "0x3E77Ad644B4F5FF6AE0B9893bd7bD3CD0136A578",
      startBlock: 24534244,
    },
    X2BTCSwap: {
      chain: "mainnet",
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
      address: "0x8d47d68c92C445c4b583cFfAC6016730CB2059e5",
      startBlock: 24534244,
    },
    X2ETHPool: {
      chain: "mainnet",
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
      address: "0x2a315Fef86916B30905086C85A9cB55E5DCD7ED3",
      startBlock: 24534244,
    },
  },
});
