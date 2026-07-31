import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import ProblemSelector from "./sections/ProblemSelector";
import Capabilities from "./sections/Capabilities";
import AiHumanLed from "./sections/AiHumanLed";
import Packages from "./sections/Packages";
import DeliveryStandard from "./sections/DeliveryStandard";
import CaseStudies from "./sections/CaseStudies";
import ProofRoom from "./sections/ProofRoom";
import NAF from "./sections/NAF";
import Lab from "./sections/Lab";
import Orchestration from "./sections/Orchestration";
import Security from "./sections/Security";
import Technologies from "./sections/Technologies";
import Profile from "./sections/Profile";
import Coequipo from "./sections/Coequipo";
import WayOfWorking from "./sections/WayOfWorking";
import FAQ from "./sections/FAQ";
import Contact from "./sections/Contact";
import FinalCTA from "./sections/FinalCTA";

export default function App() {
  return (
    <div className="bg-exec min-h-screen text-ink">
      <a
        href="#servicios"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cyan focus:px-4 focus:py-2 focus:font-semibold focus:text-graphite"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="top">
        <Hero />
        <ProblemSelector />
        <Capabilities />
        <AiHumanLed />
        <Packages />
        <DeliveryStandard />
        <CaseStudies />
        <ProofRoom />
        <NAF />
        <Lab />
        <Orchestration />
        <Security />
        <Technologies />
        <Profile />
        <Coequipo />
        <WayOfWorking />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
