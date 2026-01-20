import { ArrowRight, Check } from "lucide-react";

type Step = {
  label: string;
  value?: string | React.ReactNode;
  done?: boolean;
};

export function PointCard({
  title,
  icon,
  color,
  steps,
  description,
  note,
}: {
  title: string;
  icon: React.ReactNode;
  color: "blue" | "violet" | "green";
  steps: Step[];
  description: string;
  note?: string;
}) {
  const colorMap = {
    blue: "border-blue-900 text-blue-900 bg-blue-900",
    violet: "border-violet-500 text-violet-600 bg-violet-600",
    green: "border-green-600 text-green-600 bg-green-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center mt-4">
        {steps.map((step, i) => (
          <>
            {/* Step */}
            <div key={`step-${i}`} className="flex flex-col items-center">
              <p className="text-xs md:text-sm text-muted-foreground mb-2 text-center">
                {step.label}
              </p>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium
          ${
            step.done
              ? `${colorMap[color]} text-white`
              : `border-2 ${colorMap[color]} bg-white`
          }`}
              >
                {step.done && !step.value ? (
                  <Check className="w-5 h-5" />
                ) : (
                  (step.value ?? "")
                )}
              </div>
            </div>

            {/* Arrow (between steps only) */}
            {i < steps.length - 1 && (
              <ArrowRight
                key={`arrow-${i}`}
                className="w-5 h-5 text-muted-foreground mx-4"
              />
            )}
          </>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-4">{description}</p>

      {/* Note */}
      {note && (
        <div className="mt-3 bg-gray-50 rounded-lg p-3 text-xs text-muted-foreground">
          <span className="font-medium">Note:</span> {note}
        </div>
      )}
    </div>
  );
}
