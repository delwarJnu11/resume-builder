import AdsterraNative from "@/components/ads/adsterra-native";
import CTASection from "@/components/landing/cta-section";
import FAQSection from "@/components/landing/faq-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import Navbar from "@/components/landing/navbar";
import PricingSection from "@/components/landing/pricing-section";
import TemplatesSection from "@/components/landing/templates-section";
import TestimonialsSection from "@/components/landing/testimonials-section";

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
						adKey="025dafa42e4cef854a761b233b63dd00"
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
						adKey="025dafa42e4cef854a761b233b63dd00"
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
						adKey="025dafa42e4cef854a761b233b63dd00"
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
