'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, ChevronDown, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [builderDropdown, setBuilderDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBuilderDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">
              ResumeBuilder<span className="text-blue-600">BD</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — dropdown */}
          <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setBuilderDropdown(!builderDropdown)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                Start Building
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${builderDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {builderDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
                  >
                    <Link
                      href="/builder"
                      onClick={() => setBuilderDropdown(false)}
                      className="flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-100 transition-colors">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Resume Builder</p>
                        <p className="text-xs text-slate-500 mt-0.5">1–2 page job resume</p>
                      </div>
                    </Link>
                    <div className="border-t border-slate-50" />
                    <Link
                      href="/cv-builder"
                      onClick={() => setBuilderDropdown(false)}
                      className="flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-violet-100 transition-colors">
                        <FileCheck className="w-4 h-4 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">CV Builder</p>
                        <p className="text-xs text-slate-500 mt-0.5">Full Curriculum Vitae</p>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <Link
                  href="/builder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Resume
                </Link>
                <Link
                  href="/cv-builder"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  CV
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
