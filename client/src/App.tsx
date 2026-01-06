import "./App.css";
import Footer from "./components/layouts/Footer";
import HowItWorksFlowchart from "./components/layouts/HowItWorksFlowChart";
import InfoRow from "./components/layouts/InfoRow";
import LandingPage from "./components/layouts/LandingPage";
import PointsSection from "./components/layouts/PointsSection";
import PossibleOutcomes from "./components/layouts/PossibleOutcome";
import SwapDifferent from "./components/layouts/SwapDifferent";

function App() {
  return (
    <>
      <LandingPage />
      <HowItWorksFlowchart />
      <InfoRow />
      <PossibleOutcomes />
      <SwapDifferent />
      <PointsSection />
      <Footer />
    </>
  );
}
export default App;
