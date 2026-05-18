import Navbar from "./components/LandingPage/Navbar/Navbar";
import Hero from "./components/LandingPage/Hero/Hero";
import BentoCards from "./components/LandingPage/BentoCards/BentoCards";
import Footer from "./components/LandingPage/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BentoCards />
      <Footer />
    </div>
  );
}
