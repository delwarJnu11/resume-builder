import Link from 'next/link';
import { FileText } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Builder', href: '/builder' },
  ],
  Resources: [
    { label: 'Resume Tips', href: '#' },
    { label: 'CV Format Guide', href: '#' },
    { label: 'Interview Prep', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900">ResumeBuilder</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Professional Bangladeshi resume builder. Create ATS-friendly CVs in minutes.
            </p>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs text-slate-400">
            Made with care for the Bangladeshi job market. All data stays on your device.
          </p>
        </div>
      </div>
    </footer>
  );
}
