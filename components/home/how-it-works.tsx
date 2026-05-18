import { UserCircle, Sliders, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Fill In Your Details',
    description:
      'Enter your personal info, work experience, education, skills, and more using our guided section editor.',
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    connector: true,
  },
  {
    number: '02',
    icon: Sliders,
    title: 'Customize the Design',
    description:
      'Pick a template, choose a color theme, adjust fonts and spacing — make it uniquely yours in seconds.',
    color: 'text-violet-600 bg-violet-50 border-violet-100',
    connector: true,
  },
  {
    number: '03',
    icon: Download,
    title: 'Export & Apply',
    description:
      'Download your polished resume as PDF or DOCX and start applying to your dream jobs immediately.',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    connector: false,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-violet-600 bg-violet-50 rounded-full border border-violet-100 mb-4 uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Your Resume in 3 Simple Steps
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            No design skills needed. No account required. Just fill, customize, and download.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-200 via-violet-200 to-emerald-200" />

          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center group">
              {/* Step number */}
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 rounded-2xl border-2 ${step.color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
          >
            Start Building Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
