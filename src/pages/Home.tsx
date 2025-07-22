import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Strategies from "@/components/sections/Strategies";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import TestimonialSection from "@/components/sections/TestimonialSection";
import PerformanceMetrics from "@/components/sections/PerformanceMetrics";

import Faq from "@/components/sections/Faq";
import LegalTerms from "@/components/sections/LegalTerms";
import SEO from "@/components/SEO";

const Home = () => {
  // Scroll to hash on load or handle smooth scrolling
  useEffect(() => {
    // Smooth scroll function
    const smoothScroll = (e: MouseEvent, el: HTMLAnchorElement) => {
      e.preventDefault();
      const href = el.getAttribute("href");
      if (href?.startsWith("#")) {
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offsetTop = (targetElement as HTMLElement).offsetTop;
          window.scrollTo({
            top: offsetTop - 80, // Adjust for header height
            behavior: "smooth"
          });
          
          // Update URL without reload
          window.history.pushState({}, "", href);
        }
      }
    };

    // Add event listener to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => smoothScroll(e as unknown as MouseEvent, anchor as HTMLAnchorElement));
    });

    // Handle initial hash in URL
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          const offsetTop = (targetElement as HTMLElement).offsetTop;
          window.scrollTo({
            top: offsetTop - 80,
            behavior: "smooth"
          });
        }, 100);
      }
    }

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', e => smoothScroll(e as unknown as MouseEvent, anchor as HTMLAnchorElement));
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Binary Baseline - Automated Binary Options Trading Platform"
        description="Professional automated binary options trading platform with MT5 to Pocket Option integration. Advanced trading indicators, proven strategies, and real-time performance analytics."
        keywords={[
          "binary options trading",
          "automated trading bot",
          "MT5 to Pocket Option",
          "trading indicators",
          "binary options strategies",
          "MetaTrader 5 bot",
          "Pocket Option automation",
          "forex trading signals",
          "trading performance analytics",
          "binary options software"
        ]}
        canonical={window.location.href}
      />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PerformanceMetrics showComparison={true} />
        <HowItWorks />
        <Strategies />
        <TestimonialSection />
        <Pricing />
        <Testimonials />
        <Faq />
        <LegalTerms />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
