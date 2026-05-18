'use client';

import { useResumeStore } from '@/store/resume-store';
import { SECTION_LABELS } from '@/types';
import PersonalSection from '@/components/sections/personal-section';
import ObjectiveSection from '@/components/sections/objective-section';
import EducationSection from '@/components/sections/education-section';
import ExperienceSection from '@/components/sections/experience-section';
import SkillsSection from '@/components/sections/skills-section';
import { ProjectsSection, CertificationsSection, TrainingsSection, LanguagesSection, ReferencesSection, SocialLinksSection, InterestsSection } from '@/components/sections/other-sections';
import CustomSections from '@/components/sections/custom-sections';
import DeclarationSection from '@/components/sections/declaration-section';
import { motion, AnimatePresence } from 'framer-motion';

const sectionComponents: Record<string, React.ReactNode> = {
  personal: <PersonalSection />,
  objective: <ObjectiveSection />,
  education: <EducationSection />,
  experience: <ExperienceSection />,
  skills: <SkillsSection />,
  projects: <ProjectsSection />,
  certifications: <CertificationsSection />,
  trainings: <TrainingsSection />,
  languages: <LanguagesSection />,
  references: <ReferencesSection />,
  interests: <InterestsSection />,
  social: <SocialLinksSection />,
  custom: <CustomSections />,
  declaration: <DeclarationSection />,
};

export default function EditorPanel({ mode = 'resume' }: { mode?: 'resume' | 'cv' }) {
  const { activeSection } = useResumeStore();

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="px-6 py-4 bg-white border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">
          {SECTION_LABELS[activeSection] || 'Section'}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {mode === 'cv' ? 'Fill in the details below to build your CV' : 'Fill in the details below to build your resume'}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
          >
            <AnimatePresence mode="wait">
              {sectionComponents[activeSection] || (
                <div className="flex items-center justify-center h-32 text-slate-400">
                  Select a section to edit
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
