'use client';

import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Link2 } from 'lucide-react';
import { forwardRef } from 'react';

interface ResumeTemplateProps {
  className?: string;
}

function SectionHeading({ title }: { title: string }) {
  const { theme } = useResumeStore();
  return (
    <div
      className="text-sm font-bold uppercase tracking-wider px-2 py-1.5 mb-3 rounded-sm"
      style={{
        backgroundColor: theme.headingBgColor,
        color: theme.headingTextColor,
      }}
    >
      {title}
    </div>
  );
}

function PersonalInfoPreview() {
  const { resumeData, theme } = useResumeStore();
  const { personalInfo } = resumeData;

  return (
    <div className="text-center mb-5 pb-4" style={{ borderBottom: `1px solid ${theme.primaryColor}30` }}>
      {personalInfo.photo && (
        <img
          src={personalInfo.photo}
          alt={personalInfo.fullName}
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
          style={{ border: `2px solid ${theme.primaryColor}` }}
        />
      )}
      <h1 className="text-2xl font-bold mb-1.5" style={{ color: theme.primaryColor }}>
        {personalInfo.fullName || 'Your Name'}
      </h1>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
        {personalInfo.phone && (
          <span className="flex items-center gap-1">
            <Phone className="w-3 h-3" /> {personalInfo.phone}
          </span>
        )}
        {personalInfo.email && (
          <span className="flex items-center gap-1">
            <Mail className="w-3 h-3" /> {personalInfo.email}
          </span>
        )}
        {personalInfo.presentAddress && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {personalInfo.presentAddress}
          </span>
        )}
      </div>
      {resumeData.socialLinks.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-400 mt-1.5">
          {resumeData.socialLinks.map((link) => (
            <span key={link.id} className="flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              {link.url}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ObjectivePreview() {
  const { resumeData, theme } = useResumeStore();
  if (!resumeData.careerObjective) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="Career Objective" />
      <p className="text-sm leading-relaxed text-gray-600">
        {resumeData.careerObjective}
      </p>
    </div>
  );
}

function EducationPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.education.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="Education" />
      <div className="space-y-2.5">
        {resumeData.education.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institution}{edu.university ? `, ${edu.university}` : ''}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-3">{edu.yearOfPassing}</span>
            </div>
            {(edu.cgpa || edu.grade) && (
              <p className="text-xs text-gray-500 mt-0.5">
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
  const { resumeData, theme } = useResumeStore();
  if (resumeData.experience.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="Work Experience" />
      <div className="space-y-3">
        {resumeData.experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm text-gray-900">{exp.designation}</p>
                <p className="text-sm text-gray-600">{exp.organization}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.responsibilities && (
              <p className="text-xs text-gray-600 mt-1.5 whitespace-pre-line leading-relaxed">{exp.responsibilities}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.skills.length === 0) return null;

  const technicalSkills = resumeData.skills.filter((s) => s.category === 'Technical');
  const softSkills = resumeData.skills.filter((s) => s.category === 'Soft');

  return (
    <div className="mb-4">
      <SectionHeading title="Skills" />
      <div className="grid grid-cols-2 gap-4">
        {technicalSkills.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technical</p>
            <div className="space-y-1.5">
              {technicalSkills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 flex-1">{skill.name}</span>
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${skill.level}%`, backgroundColor: theme.primaryColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {softSkills.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Soft Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {softSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.projects.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="Projects" />
      <div className="space-y-2.5">
        {resumeData.projects.map((proj) => (
          <div key={proj.id}>
            <p className="font-semibold text-sm text-gray-900">{proj.title}</p>
            {proj.technologies && <p className="text-xs text-gray-500">Tech: {proj.technologies}</p>}
            {proj.description && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{proj.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.certifications.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="Certifications" />
      <div className="space-y-1.5">
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between text-sm">
            <span className="text-gray-900">{cert.title}</span>
            <span className="text-gray-400 text-xs">{cert.issueDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingsPreview() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.trainings.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="Trainings" />
      <div className="space-y-1.5">
        {resumeData.trainings.map((t) => (
          <div key={t.id} className="text-sm">
            <span className="text-gray-900">{t.title}</span>
            {t.institution && <span className="text-gray-500"> - {t.institution}</span>}
            {t.year && <span className="text-gray-400 text-xs"> ({t.year})</span>}
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
      <div className="flex flex-wrap gap-2">
        {resumeData.languages.map((lang) => (
          <span
            key={lang.id}
            className="text-xs px-2.5 py-1 rounded-full"
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
  const { resumeData, theme } = useResumeStore();
  if (resumeData.references.length === 0) return null;

  return (
    <div className="mb-4">
      <SectionHeading title="References" />
      <div className="grid grid-cols-2 gap-3">
        {resumeData.references.map((ref) => (
          <div key={ref.id} className="text-sm">
            <p className="font-semibold text-gray-900">{ref.name}</p>
            <p className="text-gray-600 text-xs">{ref.designation}{ref.organization ? `, ${ref.organization}` : ''}</p>
            {ref.phone && <p className="text-gray-400 text-xs">Phone: {ref.phone}</p>}
            {ref.email && <p className="text-gray-400 text-xs">Email: {ref.email}</p>}
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
      <div className="flex flex-wrap gap-2">
        {resumeData.interests.map((interest) => (
          <span
            key={interest.id}
            className="text-xs px-2.5 py-1 rounded-full"
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
  const { resumeData, theme } = useResumeStore();
  if (resumeData.customSections.length === 0) return null;

  return (
    <>
      {resumeData.customSections.map((section) => (
        <div key={section.id} className="mb-4">
          <SectionHeading title={section.title} />
          <p className="text-sm whitespace-pre-line text-gray-600 leading-relaxed">
            {section.content}
          </p>
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
      <p className="text-sm text-gray-600 leading-relaxed">{declaration.text}</p>
      <div className="flex justify-end mt-8">
        <div className="text-center">
          {declaration.signatureImage && (
            <img
              src={declaration.signatureImage}
              alt="Signature"
              className="h-10 object-contain mb-1"
            />
          )}
          {!declaration.signatureImage && (
            <div className="h-10 border-b border-gray-400 w-32 mb-1" />
          )}
          <div className="text-xs text-gray-700">{declaration.date}</div>
        </div>
      </div>
    </div>
  );
}

export const SingleColumnTemplate = forwardRef<HTMLDivElement, ResumeTemplateProps>(({ className }, ref) => {
  const { sectionOrder, sectionVisibility, theme } = useResumeStore();

  const sectionComponents: Record<string, React.ReactNode> = {
    personal: <PersonalInfoPreview />,
    objective: <ObjectivePreview />,
    education: <EducationPreview />,
    experience: <ExperiencePreview />,
    skills: <SkillsPreview />,
    projects: <ProjectsPreview />,
    certifications: <CertificationsPreview />,
    trainings: <TrainingsPreview />,
    languages: <LanguagesPreview />,
    references: <ReferencesPreview />,
    interests: <InterestsPreview />,
    custom: <CustomSectionsPreview />,
    declaration: <DeclarationPreview />,
  };

  return (
    <div
      ref={ref}
      className={cn('w-full bg-white p-8', className)}
      style={{ fontFamily: theme.fontFamily, fontSize: `${theme.fontSize}px`, lineHeight: 1.6 }}
    >
      {sectionOrder.map((sectionId) => {
        if (!sectionVisibility[sectionId]) return null;
        return <div key={sectionId}>{sectionComponents[sectionId]}</div>;
      })}
    </div>
  );
});
SingleColumnTemplate.displayName = 'SingleColumnTemplate';
