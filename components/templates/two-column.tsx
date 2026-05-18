'use client';

import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Link2 } from 'lucide-react';
import { forwardRef } from 'react';

interface ResumeTemplateProps {
  className?: string;
}

// Sections that belong in the narrow left column
const LEFT_COLUMN = new Set(['skills', 'certifications', 'trainings', 'languages', 'references', 'interests', 'custom']);
// Sections that belong in the wide right column (personal is rendered as full-width header)
const RIGHT_COLUMN = new Set(['objective', 'education', 'experience', 'projects', 'declaration']);

function SectionHeading({ title }: { title: string }) {
  const { theme } = useResumeStore();
  return (
    <div
      className="text-xs font-bold uppercase tracking-wider px-2 py-1 mb-2 rounded-sm"
      style={{
        backgroundColor: theme.headingBgColor,
        color: theme.headingTextColor,
      }}
    >
      {title}
    </div>
  );
}

// ─── Full-width header (personal info) ───────────────────────────────────────

function PersonalInfoHeader() {
  const { resumeData, theme } = useResumeStore();
  const { personalInfo } = resumeData;

  return (
    <div
      className="flex items-center gap-5 px-6 py-5"
      style={{ borderBottom: `2px solid ${theme.primaryColor}20` }}
    >
      {personalInfo.photo && (
        <img
          src={personalInfo.photo}
          alt={personalInfo.fullName}
          className="w-20 h-20 rounded-full object-cover shrink-0"
          style={{ border: `2px solid ${theme.primaryColor}` }}
        />
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold leading-tight" style={{ color: theme.primaryColor }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mt-1.5">
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 shrink-0" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 shrink-0" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.presentAddress && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" /> {personalInfo.presentAddress}
            </span>
          )}
          {resumeData.socialLinks.map((link) => (
            <span key={link.id} className="flex items-center gap-1">
              <Link2 className="w-3 h-3 shrink-0" /> {link.url}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Left column sections ─────────────────────────────────────────────────────

function SkillsPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.skills.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Skills" />
      <div className="space-y-1.5">
        {resumeData.skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2">
            <span className="text-xs text-gray-700 flex-1 truncate">{skill.name}</span>
            <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full rounded-full"
                style={{ width: `${skill.level}%`, backgroundColor: theme.primaryColor }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsPreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.certifications.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Certifications" />
      <div className="space-y-1.5">
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} className="text-xs">
            <p className="font-medium text-gray-900 leading-snug">{cert.title}</p>
            {cert.issuingOrganization && <p className="text-gray-500">{cert.issuingOrganization}</p>}
            {cert.issueDate && <p className="text-gray-400">{cert.issueDate}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingsPreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.trainings.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Trainings" />
      <div className="space-y-1.5">
        {resumeData.trainings.map((t) => (
          <div key={t.id} className="text-xs">
            <p className="font-medium text-gray-900 leading-snug">{t.title}</p>
            {t.institution && <p className="text-gray-500">{t.institution}</p>}
            {t.year && <p className="text-gray-400">{t.year}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagesPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.languages.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Languages" />
      <div className="flex flex-wrap gap-1.5">
        {resumeData.languages.map((lang) => (
          <span
            key={lang.id}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
          >
            {lang.language}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReferencesPreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.references.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="References" />
      <div className="space-y-2.5">
        {resumeData.references.map((ref) => (
          <div key={ref.id} className="text-xs">
            <p className="font-semibold text-gray-900">{ref.name}</p>
            <p className="text-gray-600 leading-snug">{ref.designation}{ref.organization ? `, ${ref.organization}` : ''}</p>
            {ref.phone && <p className="text-gray-400">📞 {ref.phone}</p>}
            {ref.email && <p className="text-gray-400">✉ {ref.email}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function InterestsPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.interests.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Interests" />
      <div className="flex flex-wrap gap-1.5">
        {resumeData.interests.map((interest) => (
          <span
            key={interest.id}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
          >
            {interest.interest}
          </span>
        ))}
      </div>
    </div>
  );
}

function CustomSectionsPreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.customSections.length === 0) return null;
  return (
    <>
      {resumeData.customSections.map((section) => (
        <div key={section.id} className="mb-4">
          <SectionHeading title={section.title} />
          <p className="text-xs whitespace-pre-line text-gray-600 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </>
  );
}

function DeclarationPreview() {
  const { resumeData } = useResumeStore();
  const { declaration } = resumeData;
  if (!declaration.showDeclaration) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Declaration" />
      <p className="text-xs text-gray-600 leading-relaxed">{declaration.text}</p>
      <div className="flex justify-end mt-6">
        <div className="text-center">
          {declaration.signatureImage ? (
            <img src={declaration.signatureImage} alt="Signature" className="h-8 object-contain mb-1" />
          ) : (
            <div className="h-8 border-b border-gray-400 w-24 mb-1" />
          )}
          <div className="text-xs text-gray-700">{declaration.date}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Right column sections ────────────────────────────────────────────────────

function ObjectivePreview() {
  const { resumeData } = useResumeStore();
  if (!resumeData.careerObjective) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Career Objective" />
      <p className="text-xs leading-relaxed text-gray-600">{resumeData.careerObjective}</p>
    </div>
  );
}

function EducationPreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.education.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Education" />
      <div className="space-y-2.5">
        {resumeData.education.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-xs text-gray-900 leading-snug">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}{edu.university ? `, ${edu.university}` : ''}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{edu.yearOfPassing}</span>
            </div>
            {(edu.cgpa || edu.grade) && (
              <p className="text-xs text-gray-400 mt-0.5">
                {edu.cgpa && `CGPA: ${edu.cgpa}`}
                {edu.cgpa && edu.grade && ' | '}
                {edu.grade && `Grade: ${edu.grade}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperiencePreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.experience.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Work Experience" />
      <div className="space-y-3">
        {resumeData.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-xs text-gray-900 leading-snug">{exp.designation}</p>
                <p className="text-xs text-gray-600">{exp.organization}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.responsibilities && (
              <p className="text-xs text-gray-600 mt-1 whitespace-pre-line leading-relaxed">{exp.responsibilities}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPreview() {
  const { resumeData } = useResumeStore();
  if (resumeData.projects.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Projects" />
      <div className="space-y-2.5">
        {resumeData.projects.map((proj) => (
          <div key={proj.id}>
            <p className="font-semibold text-xs text-gray-900">{proj.title}</p>
            {proj.technologies && <p className="text-xs text-gray-500 mt-0.5">Tech: {proj.technologies}</p>}
            {proj.description && <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{proj.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section component map ────────────────────────────────────────────────────

const LEFT_COMPONENTS: Record<string, React.ReactNode> = {
  skills: <SkillsPreview />,
  certifications: <CertificationsPreview />,
  trainings: <TrainingsPreview />,
  languages: <LanguagesPreview />,
  references: <ReferencesPreview />,
  interests: <InterestsPreview />,
  custom: <CustomSectionsPreview />,
};

const RIGHT_COMPONENTS: Record<string, React.ReactNode> = {
  objective: <ObjectivePreview />,
  education: <EducationPreview />,
  experience: <ExperiencePreview />,
  projects: <ProjectsPreview />,
  declaration: <DeclarationPreview />,
};

// ─── Template ─────────────────────────────────────────────────────────────────

export const TwoColumnTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(({ className }, ref) => {
  const { sectionOrder, sectionVisibility, theme } = useResumeStore();

  // Respect sectionOrder within each column
  const leftSections = sectionOrder.filter(
    (id) => LEFT_COLUMN.has(id) && sectionVisibility[id] !== false,
  );
  const rightSections = sectionOrder.filter(
    (id) => RIGHT_COLUMN.has(id) && sectionVisibility[id] !== false,
  );

  const showPersonal = sectionVisibility['personal'] !== false;

  return (
    <div
      ref={ref}
      className={cn('w-full bg-white', className)}
      style={{ fontFamily: theme.fontFamily, fontSize: `${theme.fontSize}px`, lineHeight: 1.5 }}
    >
      {/* Full-width personal info header */}
      {showPersonal && <PersonalInfoHeader />}

      {/* Two-column body */}
      <div className="flex items-start">
        {/* Left narrow column */}
        <div
          className="w-1/3 shrink-0 p-5 pt-4"
          style={{ borderRight: `1px solid ${theme.primaryColor}20` }}
        >
          {leftSections.map((id) => (
            <div key={id}>{LEFT_COMPONENTS[id]}</div>
          ))}
        </div>

        {/* Right wide column */}
        <div className="flex-1 min-w-0 p-5 pt-4 pl-5">
          {rightSections.map((id) => (
            <div key={id}>{RIGHT_COMPONENTS[id]}</div>
          ))}
        </div>
      </div>
    </div>
  );
});
TwoColumnTemplate.displayName = 'TwoColumnTemplate';
