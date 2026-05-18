'use client';

import { useResumeStore } from '@/store/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Layout } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function CustomSections() {
  const { resumeData, setResumeData } = useResumeStore();

  const addSection = () => {
    setResumeData({
      customSections: [
        ...resumeData.customSections,
        { id: generateId(), title: '', content: '' },
      ],
    });
  };

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    setResumeData({
      customSections: resumeData.customSections.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    });
  };

  const deleteSection = (id: string) => {
    setResumeData({
      customSections: resumeData.customSections.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-4">
      {resumeData.customSections.map((section) => (
        <div
          key={section.id}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
              <Layout className="w-3 h-3 text-slate-500" />
            </div>
            <span className="text-sm font-medium text-slate-700 flex-1">
              {section.title || 'Custom Section'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteSection(section.id)}
              className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="p-4 space-y-4">
            <Input
              label="Section Title"
              value={section.title}
              onChange={(e) => updateSection(section.id, 'title', e.target.value)}
              placeholder="Achievements / Publications / etc."
              id={`custom-title-${section.id}`}
            />
            <Textarea
              label="Content"
              value={section.content}
              onChange={(e) => updateSection(section.id, 'content', e.target.value)}
              placeholder="Enter content..."
              id={`custom-content-${section.id}`}
              rows={4}
            />
          </div>
        </div>
      ))}

      <Button onClick={addSection} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Custom Section
      </Button>
    </div>
  );
}
