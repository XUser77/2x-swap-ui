interface FlowBoxProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function FlowBox({
  title,
  subtitle,
  children,
  className = "",
  titleClassName = "",
  onMouseEnter,
  onMouseLeave,
}: FlowBoxProps) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-md ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {title && (
        <div
          className={`bg-linear-to-b from-[#4272FB] to-[#4D4BDB] text-white px-4 py-2 rounded-t-2xl text-center font-semibold ${titleClassName}`}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div className="text-center font-medium px-4 py-3 text-lg">
          {subtitle}
        </div>
      )}
      {children && <div className="px-4 py-3">{children}</div>}
    </div>
  );
}
