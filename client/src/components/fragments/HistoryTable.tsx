export const mockHistory = [
  {
    asset: "ETH-USDC",
    size: 20000,
    entryPrice: 2200,
    exitPrice: 2300,
    pnl: 900,
    closedAt: "2024-12-01",
  },
];

function HistoryTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Asset</th>
            <th className="text-left">Size (USDC)</th>
            <th className="text-left">Entry Price</th>
            <th className="text-left">Exit Price</th>
            <th className="text-left">P&amp;L</th>
            <th className="text-left">Closed At</th>
          </tr>
        </thead>

        <tbody>
          {mockHistory.map((h, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="py-3 font-medium">{h.asset}</td>
              <td>${h.size.toLocaleString()}</td>
              <td>${h.entryPrice}</td>
              <td>${h.exitPrice}</td>
              <td className="text-green-500 font-medium">+${h.pnl}</td>
              <td>{h.closedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;
