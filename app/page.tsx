import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Team from "@/components/Team";
import WhyUs from "@/components/WhyUs";
import Packages from "@/components/Packages";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero (white) */}
        <Hero />

        {/* 3. Services (slate-50) */}
        <Services />

        {/* 4. Our Work (white) */}
        <Work />

        {/* 5. Team (slate-50) */}
        <Team />

        {/* 6. Why Us (white) */}
        <WhyUs />

        {/* 7. Packages (slate-50) */}
        <Packages />

        {/* 8. Reviews (white) */}
        <Reviews />

        {/* 9. Gallery (slate-50) */}
        <Gallery />

        {/* 10. Appointment Booking System (white) */}
        <Booking />
      </main>

      {/* 11. Footer (white with top border) */}
      <Footer />
    </div>
  );
}
