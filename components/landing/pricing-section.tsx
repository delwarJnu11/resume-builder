'use client';

import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '৳0',
    period: 'forever',
    description: 'Everything you need to build a professional resume.',
    highlight: false,
    cta: 'Start Building Free',
    href: '/builder',
    features: [
      'Resume Builder (all sections)',
      'CV Builder (Curriculum Vitae)',
      'Single & Two-Column templates',
      '6 color theme presets',
      'PDF export',
      'DOCX export',
      'JSON import / export',
      'Real-time live preview',
      'Drag & drop section reorder',
      'Undo / redo history',
    ],
  },
  {
    name: 'Pro',
    price: '৳199',
    period: 'per month',
    description: 'Advanced features for serious job seekers.',
    highlight: true,
    cta: 'Coming Soon',
    href: '#',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Unlimited premium templates',
      'AI-powered content suggestions',
      'ATS score checker',
      'Cover letter builder',
      'LinkedIn profile optimizer',
      'Priority email support',
      'Custom domain sharing',
      'Analytics & view tracking',
      'Remove watermark',
    ],
  },
  {
    name: 'Team',
    price: '৳499',
    period: 'per month',
    description: 'For HR teams and career coaches.',
    highlight: false,
    cta: 'Coming Soon',
    href: '#',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared template library',
      'Bulk resume management',
      'Candidate tracking',
      'White-label branding',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
      'SLA support',
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Start free — no credit card required. Upgrade when you need more power.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                plan.highlight
                  ? 'border-blue-500 bg-blue-600 shadow-2xl shadow-blue-600/20 scale-105'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-amber-500 rounded-full shadow-sm">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-6">
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? 'text-blue-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block text-center py-3 px-6 rounded-xl text-sm font-semibold mb-8 transition-all ${
                  plan.highlight
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : plan.cta === 'Start Building Free'
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-500 cursor-not-allowed'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlight ? 'text-blue-200' : 'text-emerald-500'
                      }`}
                    />
                    <span className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-10">
          All prices in Bangladeshi Taka (BDT). Pro & Team plans launching soon.
        </p>
      </div>
    </section>
  );
}
