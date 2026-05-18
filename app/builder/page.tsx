'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import EditorPanel from '@/components/editor-panel';
import ResumePreview from '@/components/resume-preview';
import ProgressBar from '@/components/progress-bar';
import { Menu, X, PanelLeft, PanelRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function BuilderPage() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mobileView === 'editor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            <PanelLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mobileView === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            <PanelRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-40 bg-black/20"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -288 }}
                animate={{ x: 0 }}
                exit={{ x: -288 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 flex overflow-hidden">
          <div className={`flex-1 flex flex-col overflow-hidden min-w-0 ${mobileView === 'editor' ? 'block' : 'hidden lg:flex'}`}>
            <div className="px-6 py-3 bg-white border-b border-slate-200">
              <ProgressBar />
            </div>
            <div className="flex-1 overflow-hidden">
              <EditorPanel />
            </div>
          </div>

          <div className={`flex-1 overflow-hidden bg-slate-100 border-l border-slate-200 ${mobileView === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div data-resume-preview className="h-full">
              <ResumePreview />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
