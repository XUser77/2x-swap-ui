export const mockPositions = [
  {
    asset: "BTC-USDC",
    size: 50000,
    entryPrice: 42100,
    currentPrice: 42230,
    pnl: 308,
    pnlPercent: 0.62,
    profitShare: "80%",
    maturity: "364 days",
  },
];

function PositionsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2 pl-2">Asset</th>
            <th className="text-left">Size (USDC)</th>
            <th className="text-left">Entry price</th>
            <th className="text-left">Current price</th>
            <th className="text-left">P&amp;L</th>
            <th className="text-left">Profit Share</th>
            <th className="text-left">Maturity</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {mockPositions.map((p, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="py-3 pl-2 font-medium">{p.asset}</td>
              <td>${p.size.toLocaleString()}</td>
              <td>${p.entryPrice.toLocaleString()}</td>
              <td>${p.currentPrice.toLocaleString()}</td>
              <td className="text-green-500 font-medium">
                +${p.pnl} ({p.pnlPercent}%)
              </td>
              <td>{p.profitShare}</td>
              <td>{p.maturity}</td>
              <td className="text-center">
                <button className="px-3 py-1 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white">
                  Close
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PositionsTable;
