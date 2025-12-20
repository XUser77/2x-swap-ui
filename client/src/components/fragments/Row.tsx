function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-gray-700">
      <span>{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

export default Row;
