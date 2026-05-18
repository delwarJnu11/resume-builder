'use client';

import { motion } from 'framer-motion';

const templates = [
  { name: 'Professional', description: 'Clean single-column layout ideal for corporate and government jobs.', color: 'from-blue-500 to-blue-600', cols: '1' },
  { name: 'Modern', description: 'Two-column ATS-friendly layout with skills sidebar for tech professionals.', color: 'from-emerald-500 to-teal-600', cols: '2' },
  { name: 'Classic', description: 'Traditional format preferred by banks, NGOs, and academic institutions.', color: 'from-slate-600 to-slate-800', cols: '1' },
  { name: 'Executive', description: 'Premium design for senior positions with emphasis on experience.', color: 'from-indigo-500 to-purple-600', cols: '2' },
  { name: 'Minimal', description: 'Simple and elegant layout that highlights content over design.', color: 'from-amber-500 to-orange-600', cols: '1' },
  { name: 'Student', description: 'Entry-level focused layout highlighting education and skills.', color: 'from-teal-500 to-cyan-600', cols: '2' },
];

export default function TemplatesSection() {
  return (
    <section id="templates" className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Templates
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Professional Templates for Every{' '}
            <span className="text-blue-600">Career Stage</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Switch between single and two-column layouts instantly. All templates are ATS-optimized.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}>
                <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-3/4">
                    <div className="space-y-2">
                      {template.cols === '2' ? (
                        <div className="flex gap-2">
                          <div className="flex-1 space-y-1.5">
                            <div className="h-2 bg-white/60 rounded w-3/4" />
                            <div className="h-1.5 bg-white/40 rounded w-1/2" />
                            <div className="h-1.5 bg-white/40 rounded w-2/3" />
                          </div>
                          <div className="w-1/3 space-y-1">
                            <div className="h-1.5 bg-white/40 rounded" />
                            <div className="h-1.5 bg-white/40 rounded" />
                            <div className="h-1.5 bg-white/40 rounded" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="h-2 bg-white/60 rounded w-2/3" />
                          <div className="h-1.5 bg-white/40 rounded w-1/2" />
                          <div className="h-1.5 bg-white/40 rounded w-3/4" />
                          <div className="h-1.5 bg-white/40 rounded w-3/5" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-slate-600">{template.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
