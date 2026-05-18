'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import EditorPanel from '@/components/editor-panel';
import ResumePreview from '@/components/resume-preview';
import ProgressBar from '@/components/progress-bar';
import { Menu, X, PanelLeft, PanelRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useResumeStore } from '@/store/resume-store';

export default function BuilderPage() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hydrate = useResumeStore((s) => s._hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <header className="lg:hidden bg-white border-b border-slate-200 px-3 py-2.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-1">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold">Resume Builder</span>
          </div>
        </div>
        <div className="flex bg-slate-100 rounded-lg p-0.5">
          <button
            onClick={() => setMobileView('editor')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              mobileView === 'editor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            <PanelLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editor</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`px-3 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              mobileView === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            <PanelRight className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar desktop */}
        <div className="hidden lg:block">
          <Sidebar mode="resume" />
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -288 }}
                animate={{ x: 0 }}
                exit={{ x: -288 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[85vw] max-w-xs"
              >
                <Sidebar mode="resume" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 flex overflow-hidden min-w-0">
          <div className={`flex-1 flex flex-col overflow-hidden min-w-0 ${mobileView === 'editor' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="px-3 py-2 bg-white border-b border-slate-200">
              <ProgressBar />
            </div>
            <div className="flex-1 overflow-hidden">
              <EditorPanel mode="resume" />
            </div>
          </div>

          <div className={`flex-1 overflow-hidden bg-slate-100 border-l border-slate-200 ${mobileView === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
            <div data-resume-preview className="h-full w-full">
              <ResumePreview />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="lg:hidden bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around sticky bottom-0 z-30 safe-area-bottom">
        <button
          onClick={() => { setSidebarOpen(true); }}
          className="flex flex-col items-center gap-0.5 p-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-medium">Sections</span>
        </button>
        <button
          onClick={() => setMobileView('editor')}
          className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${
            mobileView === 'editor' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <PanelLeft className="w-5 h-5" />
          <span className="text-[10px] font-medium">Editor</span>
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${
            mobileView === 'preview' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <PanelRight className="w-5 h-5" />
          <span className="text-[10px] font-medium">Preview</span>
        </button>
      </nav>
    </div>
  );
}
