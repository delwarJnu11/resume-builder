'use client';

import { useResumeStore } from '@/store/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DeclarationEntry } from '@/types';
import { Upload, Image, X } from 'lucide-react';
import { useRef } from 'react';

export default function DeclarationSection() {
  const { resumeData, setResumeData } = useResumeStore();
  const declaration = resumeData.declaration;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof DeclarationEntry, value: string | boolean) => {
    setResumeData({ declaration: { ...declaration, [field]: value } });
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('signatureImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={declaration.showDeclaration}
            onChange={(e) => updateField('showDeclaration', e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/20"
          />
          Show declaration in resume
        </label>
      </div>

      {declaration.showDeclaration && (
        <>
          <Textarea
            label="Declaration Text"
            value={declaration.text}
            onChange={(e) => updateField('text', e.target.value)}
            placeholder="I hereby declare that all the information provided above is true..."
            id="declaration-text"
            rows={3}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Signature
            </label>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-32 h-16 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                  {declaration.signatureImage ? (
                    <img src={declaration.signatureImage} alt="Signature" className="w-full h-full object-contain" />
                  ) : (
                    <Image className="w-6 h-6 text-slate-300" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 p-1 bg-slate-900 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Upload signature"
                >
                  <Upload className="w-3 h-3" />
                </button>
                {declaration.signatureImage && (
                  <button
                    type="button"
                    onClick={() => updateField('signatureImage', '')}
                    className="absolute -top-2 -right-2 p-0.5 bg-red-500 rounded-full text-white"
                    aria-label="Remove signature"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-slate-500">
                Upload your signature image (optional)
              </p>
            </div>
          </div>

          <Input
            label="Date"
            type="date"
            value={declaration.date}
            onChange={(e) => updateField('date', e.target.value)}
            id="declaration-date"
          />

          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
            The declaration section is commonly used in Bangladeshi resumes for government jobs and formal applications.
          </p>
        </>
      )}
    </div>
  );
}
