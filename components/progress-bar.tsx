'use client';

import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';

export default function ProgressBar() {
  const { resumeData } = useResumeStore();

  const calculateProgress = () => {
    let filled = 0;
    let total = 10;

    if (resumeData.personalInfo.fullName) filled++;
    if (resumeData.personalInfo.email) filled++;
    if (resumeData.personalInfo.phone) filled++;
    if (resumeData.careerObjective) filled++;
    if (resumeData.education.length > 0) filled++;
    if (resumeData.experience.length > 0) filled++;
    if (resumeData.skills.length > 0) filled++;
    if (resumeData.projects.length > 0) filled++;
    if (resumeData.languages.length > 0) filled++;
    if (resumeData.references.length > 0) filled++;

    return Math.round((filled / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            progress < 30 && 'bg-red-400',
            progress >= 30 && progress < 60 && 'bg-amber-400',
            progress >= 60 && progress < 90 && 'bg-blue-500',
            progress >= 90 && 'bg-emerald-500'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-500 w-8 text-right">{progress}%</span>
    </div>
  );
}
