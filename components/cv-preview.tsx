'use client';

import { useResumeStore } from '@/store/resume-store';
import { CVTemplate } from '@/components/templates/cv-template';
import { ZoomIn, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function CVPreview() {
  const { resumeData } = useResumeStore();
  const [zoom, setZoom] = useState(50);
  const printRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 10, 150));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 10, 30));
  const resetZoom = () => setZoom(50);

  const filename = `${resumeData.personalInfo.fullName || 'cv'}-CV.pdf`;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: filename,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 6mm;
      }
      html, body {
        margin: 0;
        padding: 0;
        background: white;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      [data-resume-page] {
        transform: none !important;
        width: auto !important;
        min-height: auto !important;
        box-shadow: none !important;
      }
    `,
  });

  const onPrintEvent = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  useEffect(() => {
    window.addEventListener('resume:print', onPrintEvent);
    return () => window.removeEventListener('resume:print', onPrintEvent);
  }, [onPrintEvent]);

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-violet-600 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold leading-none">CV</span>
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-700 hidden sm:inline">CV Preview</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomOut}
            disabled={zoom <= 30}
            className="h-7 w-7 p-0"
            aria-label="Zoom out"
          >
            <ZoomIn className="w-3.5 h-3.5 rotate-180" />
          </Button>
          <button
            onClick={resetZoom}
            className="h-7 px-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            {zoom}%
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomIn}
            disabled={zoom >= 150}
            className="h-7 w-7 p-0"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Scrollable preview */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 pb-safe">
        <div
          ref={printRef}
          data-resume-page
          className="mx-auto bg-white shadow-lg transition-transform duration-200"
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          <CVTemplate />
        </div>
      </div>
    </div>
  );
}
