'use client';

import { useResumeStore } from '@/store/resume-store';
import { Textarea } from '@/components/ui/textarea';

export default function ObjectiveSection() {
  const { resumeData, setResumeData } = useResumeStore();

  return (
    <div className="space-y-4">
      <Textarea
        label="Career Objective / Profile Summary"
        value={resumeData.careerObjective}
        onChange={(e) => setResumeData({ careerObjective: e.target.value })}
        placeholder="Write a compelling career objective or profile summary..."
        id="careerObjective"
        rows={6}
      />
      <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
        Keep it concise (2-4 sentences). Highlight your key strengths and career goals.
      </p>
    </div>
  );
}
