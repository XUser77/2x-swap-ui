interface FlowTooltipProps {
  show: boolean;
  text: string;
  className?: string;
}

export function FlowTooltip({ show, text, className = "" }: FlowTooltipProps) {
  if (!show) return null;

  return (
    <div
      className={` absolute z-50 rounded-2xl bg-gradient-to-b from-[#E8EDFF] to-[#DCE5FF] p-2 text-sm text-black shadow-white shadow-md border border-white/60 backdrop-blur-sm max-w-60 ${className} font-medium`}
    >
      {text}
    </div>
  );
}
