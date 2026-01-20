import { TradingService } from "../services/trading.service";
export async function ingestTradeScore(req, res) {
    try {
        if (req.headers.authorization !== `Bearer ${process.env.INDEXER_SECRET}`) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const data = await TradingService.processTrade(req.body);
        return res.json({ success: true, data });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}
