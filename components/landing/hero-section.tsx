'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-100/40 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700 mb-6">
              <Star className="w-3 h-3 fill-blue-500 text-blue-500" />
              Professional Bangladeshi CV Maker
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight"
          >
            Build a Professional Resume That{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Gets You Hired
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Create stunning ATS-friendly resumes tailored for the Bangladeshi job market.
            Real-time preview, drag-and-drop sections, multiple templates, and instant PDF export.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/builder">
              <Button size="lg" className="px-8 text-base gap-2">
                Start Building Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Explore Features &rarr;
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No Sign-up Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Free
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Private & Secure
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="rounded-xl border border-slate-200 shadow-2xl overflow-hidden bg-white">
            <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-slate-500">Resume Builder — Preview</span>
            </div>
            <div className="p-4 bg-slate-50">
              <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                <div className="flex gap-6">
                  <div className="w-2/3 space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                    <div className="h-3 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/4 mt-4" />
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <div className="h-3 bg-slate-100 rounded flex-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/3 space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-3 bg-slate-100 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
