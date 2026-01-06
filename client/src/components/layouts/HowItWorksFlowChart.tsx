import { useState } from "react";

interface FlowBoxProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function FlowBox({
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
          className={`bg-[#5B6EF5] text-white px-4 py-2 rounded-t-2xl text-center font-semibold ${titleClassName}`}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div className="text-center font-medium px-4 py-3 text-sm">
          {subtitle}
        </div>
      )}
      {children && <div className="px-4 py-3">{children}</div>}
    </div>
  );
}

export default function HowItWorksFlowchart() {
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null);

  return (
    <div className="w-full bg-linear-to-b from-[#a9b9ff] to-[#B8C9FF] py-16 px-4">
      <h2 className="text-5xl font-semibold text-center text-[#00246B] mb-5">
        How 2xSwap Works
      </h2>

      <div className="max-w-6xl mx-auto relative" style={{ height: "550px" }}>
        {/* Flow Lines/Curves - Designer's SVG assets with hover states */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* 1. User A → Choose Asset */}
          <img
            src={
              hoveredFlow === "a-choose"
                ? "/a-choose-on.png"
                : "/a-choose-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              left: "120px",
              top: "70px",
              width: "300px",
              height: "300px",
            }}
          />

          {/* 2. User B → Liquidity Pool */}
          <img
            src={
              hoveredFlow === "b-pool" ? "/b-pool-on.png" : "/b-pool-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              right: "120px",
              top: "70px",
              width: "auto",
              height: "auto",
            }}
          />

          {/* 3. Choose Asset → Smart Contract Open */}
          <img
            src={
              hoveredFlow === "choose-open"
                ? "/choose-open-on.png"
                : "/choose-open-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              left: "264px",
              top: "220px",
              width: "auto",
              height: "auto",
            }}
          />

          {/* 4. Smart Contract Close → User A */}
          <img
            src={
              hoveredFlow === "close-a" ? "/close-a-on.png" : "/close-a-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              left: "80px",
              top: "80px",
              width: "400px",
              height: "400px",
            }}
          />

          {/* 5. Smart Contract Close → Liquidity Pool */}
          <img
            src={
              hoveredFlow === "close-pool"
                ? "/close-pool-on.png"
                : "/close-pool-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              right: "80px",
              top: "80px",
              width: "300px",
              height: "300px",
            }}
          />

          {/* 6. Smart Contract Open → Smart Contract Close */}
          <img
            src={
              hoveredFlow === "open-close"
                ? "/open-close-on.png"
                : "/open-close-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              left: "50%",
              top: "280px",
              transform: "translateX(-50%)",
              width: "auto",
              height: "auto",
            }}
          />

          {/* 7. Liquidity Pool → Smart Contract Open */}
          <img
            src={
              hoveredFlow === "pool-open"
                ? "/pool-open-on.png"
                : "/pool-open-off.png"
            }
            alt=""
            className="absolute transition-opacity duration-300"
            style={{
              right: "264px",
              top: "220px",
              width: "auto",
              height: "auto",
            }}
          />
        </div>

        {/* Content Boxes - Absolutely positioned with hover handlers */}
        <div className="relative w-full h-full" style={{ zIndex: 1 }}>
          {/* User A - Top Left */}
          <div
            className="absolute"
            style={{ left: "120px", top: "70px" }}
            onMouseEnter={() => setHoveredFlow("a-choose")}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <FlowBox title="User A" subtitle="Wallet" className="w-44" />
          </div>

          {/* Choose Asset - Middle Left */}
          <div
            className="absolute"
            style={{ left: "120px", top: "200px" }}
            onMouseEnter={() => setHoveredFlow("choose-open")}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <FlowBox subtitle="Choose Asset & $ to Invest" className="w-44" />
          </div>

          {/* User B - Top Right */}
          <div
            className="absolute"
            style={{ right: "120px", top: "70px" }}
            onMouseEnter={() => setHoveredFlow("b-pool")}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <FlowBox title="User B" subtitle="Wallet" className="w-44" />
          </div>

          {/* Liquidity Pool - Middle Right */}
          <div
            className="absolute"
            style={{ right: "120px", top: "200px" }}
            onMouseEnter={() => setHoveredFlow("pool-open")}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <FlowBox subtitle="Liquidity Pool" className="w-44" />
          </div>

          {/* Smart Contract Open - Top Center */}
          <div
            className="absolute"
            style={{ left: "50%", top: "80px", transform: "translateX(-50%)" }}
            onMouseEnter={() => setHoveredFlow("open-close")}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <FlowBox
              title="Smart Contract - Open"
              className="w-[320px]"
              titleClassName="text-sm"
            >
              <ol className="text-xs space-y-1 text-left leading-relaxed">
                <li className="mb-1">
                  <span className="font-medium">1.</span> Combine funds (A's
                  deposit + B's liquidity = 2× exposure)
                </li>
                <li className="mb-1">
                  <span className="font-medium">2.</span> Swap to asset through
                  DEX router
                </li>
                <li className="mb-1">
                  <span className="font-medium">3.</span> Record all terms
                  on-chain
                </li>
                <li className="mb-1">
                  <span className="font-medium">4.</span> Lock the asset inside
                  the contract
                </li>
                <li>
                  <span className="font-medium">5.</span> Wait until expiry or
                  early close by User A
                </li>
              </ol>
            </FlowBox>
          </div>

          {/* Smart Contract Close - Bottom Center */}
          <div
            className="absolute"
            style={{ left: "50%", top: "360px", transform: "translateX(-50%)" }}
            onMouseEnter={() => setHoveredFlow("close-a")}
            onMouseLeave={() => setHoveredFlow(null)}
          >
            <FlowBox
              title="Smart Contract - Close"
              className="w-[320px]"
              titleClassName="text-sm"
            >
              <ol className="text-xs space-y-1 text-left leading-relaxed">
                <li className="mb-1">
                  <span className="font-medium">1.</span> Swap asset back to
                  USDC
                </li>
                <li className="mb-1">
                  <span className="font-medium">2.</span> Calculate total profit
                  or loss
                </li>
                <li className="mb-1">
                  <span className="font-medium">3.</span> Distribute
                  automatically:
                </li>
                <ul className="list-none ml-4 space-y-0.5 text-xs">
                  <li>• User A receives their share</li>
                  <li>• LPs receive their share (based on LP tokens)</li>
                </ul>
              </ol>
            </FlowBox>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-12 bg-[#5B6EF5] text-white text-center py-4 px-8 rounded-full max-w-3xl mx-auto">
        <p className="text-sm leading-relaxed">
          This visual flow is simplified for explanation purposes.
          <br />
          The underlying smart contract architecture and execution logic may
          differ.
        </p>
      </div>
    </div>
  );
}
