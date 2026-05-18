'use client';

import { motion } from 'framer-motion';
import { FileEdit, Eye, Download, PenLine } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: <FileEdit className="w-6 h-6" />,
    title: 'Fill Your Details',
    description: 'Enter your personal info, education, experience, skills, and other details using our structured forms.',
  },
  {
    number: '02',
    icon: <Eye className="w-6 h-6" />,
    title: 'Preview & Customize',
    description: 'Watch your resume update in real-time. Choose templates, change colors, fonts, and layout.',
  },
  {
    number: '03',
    icon: <Download className="w-6 h-6" />,
    title: 'Download & Export',
    description: 'Export as a high-quality PDF or editable DOCX file. A4-optimized, ready to print or email.',
  },
  {
    number: '04',
    icon: <PenLine className="w-6 h-6" />,
    title: 'Update Anytime',
    description: 'Your data is saved locally. Come back anytime to update your resume without starting over.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Build Your Resume in{' '}
            <span className="text-blue-600">4 Simple Steps</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            From blank page to professional resume in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5">
                  <div className="border-t-2 border-dashed border-slate-200 mx-4" />
                </div>
              )}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">{step.number}</span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
