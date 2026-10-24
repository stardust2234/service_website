import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQsSection from "@/components/FAQsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import PageMetadata from "@/components/PageMetadata";

const Index = () => {
  const location = useLocation();

  // Handle hash navigation from other pages
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 80;
          
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-background">
      <PageMetadata title="Propel Up | Business support that keeps you moving" description="Flexible admin, customer support, invoicing and bookkeeping for busy small businesses." path="/" />
      <Navbar />
      <main>
        <HeroSection />
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <PricingSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <WhyUsSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <FAQsSection />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <FinalCTASection />
        </ScrollReveal>
      </main>
      <ScrollReveal delay={100}>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
