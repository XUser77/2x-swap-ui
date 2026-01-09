import { useEffect, useState } from "react";
import { FlowTooltip } from "../fragments/FlowTooltip";
import { HorizontalLine, VerticalLine } from "../fragments/Lines";
import { FlowBox } from "../fragments/FlowBox";

export default function HowItWorksFlowchart() {
  const [hoveredFlow, setHoveredFlow] = useState<string | null>(null);
  const [activeCloseAStep, setActiveCloseAStep] = useState(0);
  const [activeClosePoolStep, setActiveClosePoolStep] = useState(0);

  function startCloseAFlow() {
    setHoveredFlow("close-a");
    setActiveCloseAStep(0);

    setTimeout(() => setActiveCloseAStep(1), 100);
    setTimeout(() => setActiveCloseAStep(2), 500);
    setTimeout(() => setActiveCloseAStep(3), 850);
  }

  function stopCloseAFlow() {
    setHoveredFlow(null);
    setActiveCloseAStep(0);
  }

  function startClosePoolFlow() {
    setHoveredFlow("close-pool");
    setActiveClosePoolStep(0);

    setTimeout(() => setActiveClosePoolStep(1), 100);
    setTimeout(() => setActiveClosePoolStep(2), 450);
  }

  function stopClosePoolFlow() {
    setHoveredFlow(null);
    setActiveClosePoolStep(0);
  }

  function useScale(baseWidth: number) {
    const [scale, setScale] = useState(1);

    useEffect(() => {
      function update() {
        const vw = window.innerWidth;

        const rawScale = vw / baseWidth;

        const isMobile = vw < 640; // Tailwind sm breakpoint
        const boost = isMobile ? 1.25 : 1;

        setScale(Math.min(1, rawScale * boost));
      }

      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, [baseWidth]);

    return scale;
  }

  const scale = useScale(1200);

  return (
    <div className="w-full bg-[#B8C9FF] py-16 px-4">
      <h2 className="text-2xl md:text-5xl font-semibold text-center text-[#00246B] mb-5">
        How 2xSwap Works
      </h2>

      <div className="w-full overflow-hidden ">
        <div
          className="relative left-1/2 origin-top"
          style={{
            transform: `translateX(-50%) scale(${scale})`,
            width: 1200, // ORIGINAL desktop width
            height: 750 * scale, // ORIGINAL height
          }}
        >
          <div
            className="max-w-6xl mx-auto relative"
            style={{ height: "550px" }}
          >
            {/* Lines */}
            <div className="absolute inset-0 z-5 pointer-events-auto">
              <VerticalLine
                flowKey="a-choose"
                active={hoveredFlow === "a-choose"}
                setHoveredFlow={setHoveredFlow}
                className="left-[260px] top-[130px] h-[120px]"
              />

              <HorizontalLine
                flowKey="choose-open"
                active={hoveredFlow === "choose-open"}
                setHoveredFlow={setHoveredFlow}
                className="left-[310px] top-[240px] w-[130px]"
              />

              <VerticalLine
                flowKey="b-pool"
                active={hoveredFlow === "b-pool"}
                setHoveredFlow={setHoveredFlow}
                className="right-[240px] top-[135px] h-[120px]"
                arrow="both"
              />

              <HorizontalLine
                flowKey="pool-open"
                active={hoveredFlow === "pool-open"}
                setHoveredFlow={setHoveredFlow}
                className="right-[310px] top-[245px] w-[200px]"
                arrow="left"
              />

              <VerticalLine
                flowKey="open-close"
                active={hoveredFlow === "open-close"}
                setHoveredFlow={setHoveredFlow}
                className="left-1/2 top-[350px] -translate-x-1/2"
                length={100}
              />

              <div onMouseEnter={startCloseAFlow} onMouseLeave={stopCloseAFlow}>
                <HorizontalLine
                  flowKey="close-a"
                  active={hoveredFlow === "close-a" && activeCloseAStep >= 1}
                  setHoveredFlow={() => {}}
                  className="left-[140px] top-[470px] w-[200px]"
                  arrow="left"
                  length={320}
                />
                <VerticalLine
                  flowKey="close-a"
                  active={hoveredFlow === "close-a" && activeCloseAStep >= 2}
                  setHoveredFlow={() => {}}
                  className="left-[140px] top-[110px] h-[100px]"
                  arrow="up"
                  length={380}
                />
                <HorizontalLine
                  flowKey="close-a"
                  active={hoveredFlow === "close-a" && activeCloseAStep >= 3}
                  setHoveredFlow={() => {}}
                  className="left-[140px] top-[110px] w-[140px]"
                  arrow="right"
                  length={80}
                />
              </div>

              <div
                onMouseEnter={startClosePoolFlow}
                onMouseLeave={stopClosePoolFlow}
              >
                <HorizontalLine
                  flowKey="close-pool"
                  active={
                    hoveredFlow === "close-pool" && activeClosePoolStep >= 1
                  }
                  setHoveredFlow={() => {}}
                  className="right-[240px] top-[470px] w-[250px]"
                  length={230}
                />
                <VerticalLine
                  flowKey="close-pool"
                  active={
                    hoveredFlow === "close-pool" && activeClosePoolStep >= 2
                  }
                  setHoveredFlow={() => {}}
                  className="right-[240px] top-[270px] "
                  arrow="up"
                  length={220}
                />
              </div>
            </div>

            {/* Flow Boxes */}
            <div className="relative w-full h-full z-10 pointer-events-none">
              <div className="absolute left-[205px] top-[70px]">
                <FlowBox
                  title="User A"
                  subtitle="Wallet"
                  className="w-33"
                  titleClassName="text-lg"
                />
              </div>

              <div className="absolute left-[200px] top-[210px]">
                <FlowBox
                  subtitle="Choose Asset & $ to Invest"
                  className="w-40"
                  titleClassName="text-lg"
                />
              </div>

              <div className="absolute right-[185px] top-[70px]">
                <FlowBox
                  title="User B"
                  subtitle="Wallet"
                  className="w-33"
                  titleClassName="text-lg"
                />
              </div>

              <div className="absolute right-[165px] top-[230px]">
                <FlowBox
                  subtitle="Liquidity Pool"
                  className="w-44"
                  titleClassName="text-lg"
                />
              </div>

              {/* Smart Contract - Open */}
              <div className="absolute left-1/2 top-[45px] -translate-x-1/2">
                <FlowBox
                  title="Smart Contract - Open"
                  className="w-[300px]"
                  titleClassName="text-lg"
                >
                  <ol className="text-md font-medium space-y-1 text-left leading-relaxed">
                    <li>
                      1. Combine funds (A's deposit + B's liquidity = 2×
                      exposure)
                    </li>
                    <li>2. Swap to asset through DEX router</li>
                    <li>3. Record all terms on-chain</li>
                    <li>4. Lock the asset inside the contract</li>
                    <li>5. Wait until expiry or early close by User A</li>
                  </ol>
                </FlowBox>
              </div>

              {/* Smart Contract - Close */}
              <div className="absolute left-1/2 top-[425px] -translate-x-1/2">
                <FlowBox
                  title="Smart Contract - Close"
                  className="w-[260px]"
                  titleClassName="text-lg"
                >
                  <ol className="text-md font-medium space-y-1 text-left">
                    <li>1. Swap asset back to USDC</li>
                    <li>2. Calculate total profit or loss</li>
                    <li>3. Distribute automatically: </li>
                    <li>• User A receives their share</li>
                    <li>• LPs receives their share (based on LP tokens)</li>
                  </ol>
                </FlowBox>
              </div>
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none">
              <FlowTooltip
                show={hoveredFlow === "a-choose"}
                text="User A selects BTC/ETH and the amount of USDC to invest"
                className="left-[320px] top-[155px]"
              />
              <FlowTooltip
                show={hoveredFlow === "choose-open"}
                text="User A sends the deposit into the smart contract to initiate the position."
                className="left-[340px] top-[275px]"
              />
              <FlowTooltip
                show={hoveredFlow === "open-close"}
                text="When position is closed, settlement logic is executed automatically."
                className="left-[310px] top-[335px]"
              />
              <FlowTooltip
                show={hoveredFlow === "pool-open"}
                text="Pool supplies matching liquidity (1:1) to pair with User A’s deposit."
                className="right-[190px] top-[290px]"
              />
              <FlowTooltip
                show={hoveredFlow === "b-pool"}
                text="User B deposits liquidity and may withdraw at any moment, provided the pool has idle liquidity available."
                className="right-[280px] top-[160px]"
              />
              <FlowTooltip
                show={hoveredFlow === "close-a"}
                text="Trader receives their share of profits or remaining funds after settlement."
                className="left-[190px] top-[380px]"
              />
              <FlowTooltip
                show={hoveredFlow === "close-pool"}
                text="Pool receives share of profit or collateral depending on market outcome."
                className="right-[280px] top-[380px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center px-4">
        <div className="max-w-xs text-[8px] md:text-lg md:max-w-3xl w-full rounded-full bg-linear-to-b from-[#446AF4] to-[#4B53E2] px-6 md:px-10 py-3 text-center text-white shadow-lg">
          This visual flow is simplified for explanation purposes.
          <br />
          The underlying smart contract architecture and execution logic may
          differ.
        </div>
      </div>
    </div>
  );
}
