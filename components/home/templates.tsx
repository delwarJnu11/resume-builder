import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const templates = [
  {
    name: 'Professional',
    tag: 'Most Popular',
    tagColor: 'bg-blue-100 text-blue-700',
    accent: '#2563eb',
    headingBg: '#dbeafe',
    headingText: '#1e3a8a',
    layout: 'two-column',
  },
  {
    name: 'Elegant',
    tag: 'Creative',
    tagColor: 'bg-violet-100 text-violet-700',
    accent: '#7c3aed',
    headingBg: '#ede9fe',
    headingText: '#4c1d95',
    layout: 'single-column',
  },
  {
    name: 'Modern',
    tag: 'Fresh',
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: '#059669',
    headingBg: '#d1fae5',
    headingText: '#064e3b',
    layout: 'two-column',
  },
  {
    name: 'Minimal',
    tag: 'Clean',
    tagColor: 'bg-slate-100 text-slate-600',
    accent: '#6b7280',
    headingBg: '#f9fafb',
    headingText: '#374151',
    layout: 'single-column',
  },
];

function ResumeCard({ template }: { template: (typeof templates)[0] }) {
  const isTwoCol = template.layout === 'two-column';

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Tag */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${template.tagColor}`}>
          {template.tag}
        </span>
      </div>

      {/* Resume preview mockup */}
      <div className="aspect-[3/4] bg-white p-3">
        <div className="w-full h-full bg-white border border-slate-100 rounded-lg overflow-hidden shadow-sm flex flex-col">
          {/* Header */}
          <div className="px-3 py-2.5 border-b" style={{ borderColor: `${template.accent}20` }}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full shrink-0"
                style={{ backgroundColor: `${template.accent}20`, border: `1.5px solid ${template.accent}40` }}
              />
              <div className="flex-1 min-w-0">
                <div className="h-2 w-20 rounded mb-1" style={{ backgroundColor: template.accent }} />
                <div className="h-1.5 w-28 rounded bg-slate-200" />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              {['w-12', 'w-16', 'w-10'].map((w, i) => (
                <div key={i} className={`h-1 ${w} rounded bg-slate-200`} />
              ))}
            </div>
          </div>

          {/* Body */}
          {isTwoCol ? (
            <div className="flex flex-1 overflow-hidden">
              {/* Left col */}
              <div className="w-2/5 p-2 space-y-2.5" style={{ borderRight: `1px solid ${template.accent}15` }}>
                {['SKILLS', 'LANGUAGES'].map((label) => (
                  <div key={label}>
                    <div
                      className="h-1.5 w-10 rounded mb-1.5 px-0.5"
                      style={{ backgroundColor: template.headingBg }}
                    />
                    <div className="space-y-1">
                      {[80, 65, 90].map((w, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <div className="h-1 flex-1 bg-slate-100 rounded-full">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${w}%`, backgroundColor: template.accent }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Right col */}
              <div className="flex-1 p-2 space-y-2.5">
                {['EXPERIENCE', 'EDUCATION'].map((label) => (
                  <div key={label}>
                    <div
                      className="h-1.5 rounded mb-1.5"
                      style={{ backgroundColor: template.headingBg, width: '100%' }}
                    />
                    <div className="space-y-1">
                      {[100, 80, 60].map((w, i) => (
                        <div key={i} className="h-1 rounded bg-slate-100" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 p-2 space-y-2.5">
              {['OBJECTIVE', 'EXPERIENCE', 'EDUCATION', 'SKILLS'].map((label) => (
                <div key={label}>
                  <div
                    className="h-1.5 rounded mb-1.5"
                    style={{ backgroundColor: template.headingBg, width: '100%' }}
                  />
                  <div className="space-y-1">
                    {[100, 85, 70].map((w, i) => (
                      <div key={i} className="h-1 rounded bg-slate-100" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-50 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{template.name}</p>
          <p className="text-xs text-slate-400 capitalize">{template.layout.replace('-', ' ')}</p>
        </div>
        <Link
          href="/"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
          style={{ backgroundColor: template.accent }}
        >
          Use This
        </Link>
      </div>
    </div>
  );
}

export default function Templates() {
  return (
    <section id="templates" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full border border-emerald-100 mb-4 uppercase tracking-wider">
            Templates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Designed to Impress Recruiters
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Every template is crafted by HR experts and optimized for both human
            readers and ATS software.
          </p>
        </div>

        {/* Template grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, i) => (
            <ResumeCard key={i} template={template} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Explore all templates in the builder
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
