'use client';

import { motion } from 'framer-motion';
import {
  Palette,
  Eye,
  FileDown,
  GripHorizontal,
  FileType,
  Save,
  Layout,
  Type,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: <Layout className="w-5 h-5" />,
    title: 'Multiple Templates',
    description: 'Choose from single-column and two-column layouts optimized for ATS systems and Bangladeshi employers.',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'Real-Time Preview',
    description: 'See your resume update instantly as you type. Desktop split-screen with sticky preview panel.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: <GripHorizontal className="w-5 h-5" />,
    title: 'Drag & Drop Sections',
    description: 'Reorder sections and items with smooth drag-and-drop. Full keyboard accessibility support.',
    color: 'bg-purple-50 text-purple-700',
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Customization',
    description: 'Change colors, fonts, spacing, borders. Choose from professional theme presets or create your own.',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    icon: <FileDown className="w-5 h-5" />,
    title: 'PDF Export',
    description: 'Export high-quality A4-optimized PDFs that match your preview exactly. Multi-page support included.',
    color: 'bg-red-50 text-red-700',
  },
  {
    icon: <FileType className="w-5 h-5" />,
    title: 'DOCX Export',
    description: 'Download editable DOCX files with proper formatting preserved. Ready for Microsoft Word editing.',
    color: 'bg-indigo-50 text-indigo-700',
  },
  {
    icon: <Save className="w-5 h-5" />,
    title: 'Auto-Save',
    description: 'Your data is automatically saved to local storage. Never lose your progress. Restore sessions instantly.',
    color: 'bg-cyan-50 text-cyan-700',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy First',
    description: 'No sign-up required. All data stays on your device. Nothing is uploaded to servers or tracked.',
    color: 'bg-teal-50 text-teal-700',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Features
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Everything You Need to Build a{' '}
            <span className="text-blue-600">Winning Resume</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            A complete toolkit designed specifically for Bangladeshi professionals and students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${feature.color} transition-transform group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
