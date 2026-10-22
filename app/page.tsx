import Navbar from "./components/LandingPage/Navbar/Navbar";
import Hero from "./components/LandingPage/Hero/Hero";
import BentoCards from "./components/LandingPage/BentoCards/BentoCards";
import FinePrint from "./components/LandingPage/FinePrint/FinePrint";
import Footer from "./components/LandingPage/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BentoCards />
      <FinePrint />
      <Footer />
    </div>
  );
}
