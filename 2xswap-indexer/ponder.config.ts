import { createConfig } from "ponder";
import { http } from "viem";

export default createConfig({
  chains: {
    x2swap: {
      id: 31337,
      rpc: process.env.PONDER_RPC_URL_1,
      ethGetLogsBlockRange: 100,
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
      address: "0xA467e237721370855f71a9F878D90E78defd643d",
      startBlock: 24197879,
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
      address: "0xF3666759fa555DF124D48cA2eab185a1fA37410c",
      startBlock: 24197879,
    },
  },
});
