import { createConfig } from "ponder";

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
      address: "0xe026c437DfD4b1e831C55b71ff185B7c510c6101",
      startBlock: 24419616,
    },
    X2BTCSwap: {
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
      address: "0x606A69d06C687aaFd6567f8001218F678c21dFf3",
      startBlock: 24419616,
    },
    // X2PAXGSwap: {
    //   chain: "x2swap",
    //   abi: [
    //     // OpenPosition
    //     {
    //       type: "event",
    //       name: "OpenPosition",
    //       inputs: [
    //         { indexed: true, name: "id", type: "uint256" },
    //         { indexed: true, name: "sender", type: "address" },
    //         { name: "assetAmount", type: "uint256" },
    //         { name: "targetAmount", type: "uint256" },
    //         { name: "profitSharing", type: "uint256" },
    //         { name: "feeAmount", type: "uint256" },
    //       ],
    //     },
    //     // ClosePosition
    //     {
    //       type: "event",
    //       name: "ClosePosition",
    //       inputs: [
    //         { indexed: true, name: "id", type: "uint256" },
    //         { name: "closeAssetAmount", type: "uint256" },
    //         { name: "feeAmount", type: "uint256" },
    //       ],
    //     },
    //   ],
    //   address: "0xe026c437DfD4b1e831C55b71ff185B7c510c6101",
    //   startBlock: 24419616,
    // }, // TODO:
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
      address: "0x9c9784f08dAe28FEdB72490e9a6c739eb731160a",
      startBlock: 24419616,
    },
  },
});
