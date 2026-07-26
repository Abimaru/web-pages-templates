import { VehiclesProvider } from "./store/vehiclesStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VehicleDetail from "./components/VehicleDetail";
import CompareBar from "./components/CompareBar";
import Hero from "./sections/Hero";
import IntentSelector from "./sections/IntentSelector";
import Marketplace from "./sections/Marketplace";
import Comparator from "./sections/Comparator";
import Cockpit from "./sections/Cockpit";
import MobilityProfile from "./sections/MobilityProfile";
import Application from "./sections/Application";
import TradeIn from "./sections/TradeIn";
import Cartera from "./sections/Cartera";
import Insurance from "./sections/Insurance";
import Process from "./sections/Process";
import Benefits from "./sections/Benefits";
import UseCases from "./sections/UseCases";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";

export default function App() {
  return (
    <VehiclesProvider>
      <main id="top" className="bg-graphite text-ink">
        <Navbar />
        <Hero />
        <IntentSelector />
        <Marketplace />
        <Comparator />
        <Cockpit />
        <MobilityProfile />
        <Application />
        <TradeIn />
        <Cartera />
        <Insurance />
        <Process />
        <Benefits />
        <UseCases />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <VehicleDetail />
      <CompareBar />
    </VehiclesProvider>
  );
}
