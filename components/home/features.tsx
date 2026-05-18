import {
  Zap,
  Layout,
  Download,
  Palette,
  Shield,
  RefreshCw,
  Eye,
  Globe,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
    title: 'Lightning Fast Builder',
    description:
      'Intuitive drag-and-drop editor lets you build a complete, polished resume in under 2 minutes.',
  },
  {
    icon: Layout,
    color: 'bg-blue-50 text-blue-600',
    title: 'Professional Templates',
    description:
      'Choose from single-column and two-column layouts designed by HR professionals for maximum impact.',
  },
  {
    icon: Download,
    color: 'bg-emerald-50 text-emerald-600',
    title: 'One-Click Export',
    description:
      'Export your resume as a pixel-perfect PDF or editable DOCX file instantly — no watermarks.',
  },
  {
    icon: Palette,
    color: 'bg-violet-50 text-violet-600',
    title: 'Full Customization',
    description:
      'Personalize colors, fonts, spacing, and layout with 6 professional theme presets to match your style.',
  },
  {
    icon: Shield,
    color: 'bg-rose-50 text-rose-600',
    title: 'ATS Optimized',
    description:
      'Every template is engineered to pass Applicant Tracking Systems used by top companies worldwide.',
  },
  {
    icon: RefreshCw,
    color: 'bg-cyan-50 text-cyan-600',
    title: 'Undo / Redo History',
    description:
      'Never lose your work. Full undo/redo history lets you experiment freely without fear.',
  },
  {
    icon: Eye,
    color: 'bg-indigo-50 text-indigo-600',
    title: 'Live Preview',
    description:
      'See every change reflected instantly in the real-time preview panel as you type.',
  },
  {
    icon: Globe,
    color: 'bg-teal-50 text-teal-600',
    title: 'Import & Export JSON',
    description:
      'Save your resume data as JSON and reload it anytime — your data stays with you, always.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100 mb-4 uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Everything You Need to Land the Job
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A complete resume-building toolkit designed for Bangladeshi professionals
            — powerful, free, and beautifully simple.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
