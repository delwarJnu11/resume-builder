import Navbar from '@/components/landing/navbar';
import HeroSection from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import TemplatesSection from '@/components/landing/templates-section';
import HowItWorksSection from '@/components/landing/how-it-works-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import PricingSection from '@/components/landing/pricing-section';
import FAQSection from '@/components/landing/faq-section';
import CTASection from '@/components/landing/cta-section';
import Footer from '@/components/landing/footer';
import AdsterraNative from '@/components/ads/adsterra-native';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      {/* Banner Ad after Hero */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Advertisement</p>
          <AdsterraNative
            adKey="023e73d50c6d43a4b6756f9f0644ea1f"
            width={728}
            height={90}
            className="mx-auto"
          />
        </div>
      </div>

      <FeaturesSection />
      <TemplatesSection />

      {/* Banner Ad after Templates */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Advertisement</p>
          <AdsterraNative
            adKey="023e73d50c6d43a4b6756f9f0644ea1f"
            width={728}
            height={90}
            className="mx-auto"
          />
        </div>
      </div>

      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />

      {/* Banner Ad before CTA */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Advertisement</p>
          <AdsterraNative
            adKey="023e73d50c6d43a4b6756f9f0644ea1f"
            width={728}
            height={90}
            className="mx-auto"
          />
        </div>
      </div>

      <CTASection />
      <Footer />
    </main>
  );
}
