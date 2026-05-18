'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

const highlights = [
  'No sign-up required',
  'PDF & DOCX export',
  'ATS-friendly templates',
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-medium text-blue-300 tracking-wide uppercase">
                Trusted by 50,000+ professionals
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Build a Resume That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Gets You Hired
              </span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
              Create a professional, ATS-optimized resume in minutes. Choose from
              expert-designed templates, customize every detail, and export to PDF
              or DOCX — completely free.
            </p>

            {/* Highlights */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Start Building — It's Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-xl transition-all hover:-translate-y-0.5"
              >
                View Templates
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-10">
              <div className="flex -space-x-2">
                {['bg-blue-500', 'bg-violet-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'].map(
                  (color, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${color} border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  )
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  4.9/5 from 2,400+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right — resume mockup */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Outer glow card */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                {/* Mock resume header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40" />
                    <div>
                      <div className="h-4 w-36 bg-white/90 rounded mb-2" />
                      <div className="h-2.5 w-24 bg-white/50 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {['w-20', 'w-28', 'w-16'].map((w, i) => (
                      <div key={i} className={`h-2 ${w} bg-white/30 rounded`} />
                    ))}
                  </div>
                </div>

                {/* Mock resume body */}
                <div className="flex">
                  {/* Left col */}
                  <div className="w-2/5 bg-slate-50 p-5 space-y-5">
                    {[
                      { label: 'SKILLS', bars: [90, 75, 85, 60, 70] },
                      { label: 'LANGUAGES', bars: [100, 80] },
                    ].map((section) => (
                      <div key={section.label}>
                        <div className="h-2 w-14 bg-blue-200 rounded mb-3" />
                        <div className="space-y-2">
                          {section.bars.map((w, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-200 rounded-full flex-1">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${w}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right col */}
                  <div className="flex-1 p-5 space-y-5">
                    {['EXPERIENCE', 'EDUCATION', 'PROJECTS'].map((label) => (
                      <div key={label}>
                        <div className="h-2 w-20 bg-blue-200 rounded mb-3" />
                        <div className="space-y-1.5">
                          <div className="h-2 w-full bg-slate-100 rounded" />
                          <div className="h-2 w-4/5 bg-slate-100 rounded" />
                          <div className="h-2 w-3/5 bg-slate-100 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">ATS Optimized</p>
                    <p className="text-xs text-slate-500">98% pass rate</p>
                  </div>
                </div>
              </div>

              {/* Floating export badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">PDF</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">One-click Export</p>
                    <p className="text-xs text-slate-500">PDF & DOCX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
