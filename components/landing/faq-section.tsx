'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is this resume builder completely free?',
    answer:
      'Yes! The core builder — including all templates, PDF export, DOCX export, and all sections — is 100% free with no hidden charges, no watermarks, and no account required.',
  },
  {
    question: 'What is the difference between a Resume and a CV?',
    answer:
      'A Resume is a concise 1–2 page document tailored for a specific job, highlighting relevant experience and skills. A Curriculum Vitae (CV) is a comprehensive document used mainly in academic, research, and government contexts — it includes all your qualifications, publications, and achievements with no page limit.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No account is needed. Your data is saved automatically in your browser\'s local storage. You can also export your resume as JSON and import it later on any device.',
  },
  {
    question: 'Are the templates ATS-friendly?',
    answer:
      'Yes. All templates are designed with clean, structured HTML that Applicant Tracking Systems can parse correctly. We avoid tables, graphics, and complex layouts that confuse ATS software.',
  },
  {
    question: 'Can I export to both PDF and Word (DOCX)?',
    answer:
      'Absolutely. You can export your resume or CV as a PDF (using your browser\'s native print engine for perfect rendering) or as a DOCX file that you can edit in Microsoft Word or Google Docs.',
  },
  {
    question: 'How do I reorder sections?',
    answer:
      'In the sidebar, you can drag and drop sections using the grip handle, or use the up/down arrow buttons that appear when you hover over a section. The preview updates instantly.',
  },
  {
    question: 'Can I customize the colors and fonts?',
    answer:
      'Yes. Click "Customize Design" in the sidebar to access 6 professional color presets, custom color pickers for primary, heading background, heading text, and body text colors, plus font family and size controls.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      'Your data never leaves your device. Everything is stored in your browser\'s local storage — we have no server, no database, and no access to your personal information.',
  },
  {
    question: 'Can I use this for Bangladeshi job applications?',
    answer:
      'This builder was specifically designed for the Bangladeshi job market. It includes fields like Father\'s Name, Mother\'s Name, NID, Religion, Blood Group, and a Declaration section — all commonly required in BD job applications.',
  },
  {
    question: 'What happens if I accidentally delete something?',
    answer:
      'Use the Undo button (↩) in the sidebar to restore any previous state. We keep up to 20 history steps so you can safely experiment without fear of losing your work.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden hover:border-slate-200 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-slate-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-900">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-slate-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-600 bg-amber-50 rounded-full border border-amber-100 mb-4 uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Everything you need to know about the builder. Can't find an answer?{' '}
            <a href="mailto:support@resumebuilder.com.bd" className="text-blue-600 hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
