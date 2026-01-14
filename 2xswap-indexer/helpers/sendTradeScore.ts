async function sendTradeScore(payload: {
  wallet: string;
  txHash: string;
  volume: string;
  pnl: number;
  lpHurt: boolean;
  timestamp: number;
}) {
  try {
    await fetch(
      `${process.env.BACKEND_BASE_URL}/api/trading/internal/trading/score`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.INDEXER_SECRET}`,
        },
        body: JSON.stringify(payload),
      }
    );
  } catch (err) {
    console.error("Failed to send trade score", err);
  }
}
