'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-slate-900 p-10 md:p-16 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 to-purple-500/20 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/20 to-transparent rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              Join thousands of Bangladeshi professionals who have created their winning CVs. No sign-up required. 100% free.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/builder">
                <Button size="lg" className="px-8 text-base gap-2 bg-white text-slate-900 hover:bg-slate-100">
                  Start Building Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <span className="text-sm text-slate-500">No registration needed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
