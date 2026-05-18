import Navbar from '@/components/landing/navbar';
import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import TemplatesSection from '@/components/landing/templates-section';
import HowItWorksSection from '@/components/landing/how-it-works-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import CTASection from '@/components/landing/cta-section';
import Footer from '@/components/landing/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
