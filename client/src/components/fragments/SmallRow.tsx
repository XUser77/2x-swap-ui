function SmallRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-gray-700 text-xs">
      <span>{label}</span>
      <span className=" text-gray-900">{value}</span>
    </div>
  );
}

export default SmallRow;
