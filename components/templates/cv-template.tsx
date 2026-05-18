'use client';

import { useResumeStore } from '@/store/resume-store';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Link2, Calendar, User, Heart, Droplets, Globe, BookOpen } from 'lucide-react';
import { forwardRef } from 'react';

interface CVTemplateProps {
  className?: string;
}

function SectionHeading({ title }: { title: string }) {
  const { theme } = useResumeStore();
  return (
    <div
      className="text-sm font-bold uppercase tracking-widest px-3 py-1.5 mb-3 rounded-sm"
      style={{ backgroundColor: theme.headingBgColor, color: theme.headingTextColor }}
    >
      {title}
    </div>
  );
}

function Divider() {
  const { theme } = useResumeStore();
  return <div className="border-t my-1" style={{ borderColor: `${theme.primaryColor}20` }} />;
}

// ─── CV Header: Title + left contact + right photo ───────────────────────────

function CVHeader() {
  const { resumeData, theme } = useResumeStore();
  const { personalInfo } = resumeData;

  return (
    <div style={{ borderBottom: `3px solid ${theme.primaryColor}` }}>
      {/* "Curriculum Vitae" title bar */}
      <div
        className="text-center py-3"
        style={{ backgroundColor: theme.headingBgColor }}
      >
        <h1
          className="text-2xl font-extrabold tracking-[0.25em] uppercase"
          style={{ color: theme.headingTextColor }}
        >
          Curriculum Vitae
        </h1>
      </div>

      {/* Name bar */}
      <div className="text-center py-3 px-6" style={{ backgroundColor: theme.primaryColor }}>
        <p className="text-xl font-bold text-white tracking-wide">
          {personalInfo.fullName || 'Your Full Name'}
        </p>
      </div>

      {/* Contact left | Photo right */}
      <div className="flex items-stretch px-6 py-4 gap-6" style={{ backgroundColor: `${theme.headingBgColor}60` }}>
        {/* Left — contact & personal details */}
        <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
          {personalInfo.fatherName && (
            <InfoRow icon={<User className="w-3 h-3" />} label="Father's Name" value={personalInfo.fatherName} theme={theme} />
          )}
          {personalInfo.motherName && (
            <InfoRow icon={<User className="w-3 h-3" />} label="Mother's Name" value={personalInfo.motherName} theme={theme} />
          )}
          {personalInfo.dateOfBirth && (
            <InfoRow icon={<Calendar className="w-3 h-3" />} label="Date of Birth" value={personalInfo.dateOfBirth} theme={theme} />
          )}
          {personalInfo.gender && (
            <InfoRow icon={<User className="w-3 h-3" />} label="Gender" value={personalInfo.gender} theme={theme} />
          )}
          {personalInfo.maritalStatus && (
            <InfoRow icon={<Heart className="w-3 h-3" />} label="Marital Status" value={personalInfo.maritalStatus} theme={theme} />
          )}
          {personalInfo.nationality && (
            <InfoRow icon={<Globe className="w-3 h-3" />} label="Nationality" value={personalInfo.nationality} theme={theme} />
          )}
          {personalInfo.religion && (
            <InfoRow icon={<BookOpen className="w-3 h-3" />} label="Religion" value={personalInfo.religion} theme={theme} />
          )}
          {personalInfo.bloodGroup && (
            <InfoRow icon={<Droplets className="w-3 h-3" />} label="Blood Group" value={personalInfo.bloodGroup} theme={theme} />
          )}
          {personalInfo.phone && (
            <InfoRow icon={<Phone className="w-3 h-3" />} label="Phone" value={personalInfo.phone} theme={theme} />
          )}
          {personalInfo.email && (
            <InfoRow icon={<Mail className="w-3 h-3" />} label="Email" value={personalInfo.email} theme={theme} />
          )}
          {personalInfo.presentAddress && (
            <InfoRow icon={<MapPin className="w-3 h-3" />} label="Present Address" value={personalInfo.presentAddress} theme={theme} />
          )}
          {personalInfo.permanentAddress && (
            <InfoRow icon={<MapPin className="w-3 h-3" />} label="Permanent Address" value={personalInfo.permanentAddress} theme={theme} />
          )}
          {personalInfo.nid && (
            <InfoRow icon={<User className="w-3 h-3" />} label="NID" value={personalInfo.nid} theme={theme} />
          )}
          {resumeData.socialLinks.map((link) => (
            <InfoRow key={link.id} icon={<Link2 className="w-3 h-3" />} label={link.platform} value={link.url} theme={theme} />
          ))}
        </div>

        {/* Right — photo */}
        <div className="shrink-0 flex items-center justify-center">
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={personalInfo.fullName}
              className="w-28 h-32 object-cover rounded"
              style={{ border: `2px solid ${theme.primaryColor}` }}
            />
          ) : (
            <div
              className="w-28 h-32 rounded flex items-center justify-center text-xs text-center leading-tight"
              style={{
                border: `2px dashed ${theme.primaryColor}60`,
                color: `${theme.primaryColor}80`,
                backgroundColor: `${theme.headingBgColor}`,
              }}
            >
              <span>Photo<br />Here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  theme,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  theme: { primaryColor: string; textColor: string };
}) {
  return (
    <div className="flex items-start gap-1.5 min-w-0">
      <span className="mt-0.5 shrink-0" style={{ color: theme.primaryColor }}>{icon}</span>
      <div className="min-w-0">
        <span className="font-semibold text-gray-600">{label}: </span>
        <span className="text-gray-800 break-words">{value}</span>
      </div>
    </div>
  );
}

// ─── Body sections ────────────────────────────────────────────────────────────

function ObjectiveSection() {
  const { resumeData } = useResumeStore();
  if (!resumeData.careerObjective) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Career Objective" />
      <p className="text-sm leading-relaxed text-gray-700 px-1">{resumeData.careerObjective}</p>
    </div>
  );
}

function EducationSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.education.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Educational Qualifications" />
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {['Degree / Exam', 'Institution', 'Board/University', 'Year', 'Result'].map((h) => (
              <th key={h} className="text-left px-2 py-1.5 font-semibold text-gray-600 border border-gray-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resumeData.education.map((edu, i) => (
            <tr key={edu.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="px-2 py-1.5 border border-gray-200 font-medium text-gray-900">{edu.degree}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-gray-700">{edu.institution}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-gray-600">{edu.university || edu.board || '—'}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-gray-600 whitespace-nowrap">{edu.yearOfPassing}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-gray-600">
                {edu.cgpa ? `CGPA: ${edu.cgpa}` : edu.grade || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExperienceSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.experience.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Work Experience" />
      <div className="space-y-3">
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="pl-3" style={{ borderLeft: '2px solid #e2e8f0' }}>
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-bold text-sm text-gray-900">{exp.designation}</p>
                <p className="text-sm text-gray-700">{exp.organization}</p>
                {exp.department && <p className="text-xs text-gray-500">{exp.department}</p>}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap shrink-0 bg-gray-100 px-2 py-0.5 rounded">
                {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
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

function SkillsSection() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.skills.length === 0) return null;
  const technical = resumeData.skills.filter((s) => s.category === 'Technical');
  const soft = resumeData.skills.filter((s) => s.category === 'Soft');
  return (
    <div className="mb-4">
      <SectionHeading title="Skills" />
      <div className="grid grid-cols-2 gap-4 px-1">
        {technical.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technical Skills</p>
            <div className="space-y-1.5">
              {technical.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 w-24 shrink-0">{skill.name}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${skill.level}%`, backgroundColor: theme.primaryColor }} />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {soft.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Soft Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {soft.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs px-2.5 py-1 rounded-full"
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

function ProjectsSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.projects.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Projects" />
      <div className="space-y-2.5 px-1">
        {resumeData.projects.map((proj) => (
          <div key={proj.id}>
            <p className="font-semibold text-sm text-gray-900">{proj.title}</p>
            {proj.technologies && <p className="text-xs text-gray-500 mt-0.5">Technologies: {proj.technologies}</p>}
            {proj.description && <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{proj.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificationsSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.certifications.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Certifications" />
      <div className="space-y-1.5 px-1">
        {resumeData.certifications.map((cert) => (
          <div key={cert.id} className="flex justify-between items-start text-sm">
            <div>
              <span className="font-medium text-gray-900">{cert.title}</span>
              {cert.issuingOrganization && <span className="text-gray-500"> — {cert.issuingOrganization}</span>}
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-3">{cert.issueDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingsSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.trainings.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Trainings & Courses" />
      <div className="space-y-1.5 px-1">
        {resumeData.trainings.map((t) => (
          <div key={t.id} className="text-sm">
            <span className="font-medium text-gray-900">{t.title}</span>
            {t.institution && <span className="text-gray-500"> — {t.institution}</span>}
            {t.year && <span className="text-gray-400 text-xs"> ({t.year})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagesSection() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.languages.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Language Proficiency" />
      <table className="w-full text-xs border-collapse px-1">
        <thead>
          <tr className="bg-gray-50">
            {['Language', 'Reading', 'Writing', 'Speaking', 'Proficiency'].map((h) => (
              <th key={h} className="text-left px-2 py-1.5 font-semibold text-gray-600 border border-gray-200">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resumeData.languages.map((lang, i) => (
            <tr key={lang.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <td className="px-2 py-1.5 border border-gray-200 font-medium text-gray-900">{lang.language}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-center">{lang.read ? '✓' : '—'}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-center">{lang.write ? '✓' : '—'}</td>
              <td className="px-2 py-1.5 border border-gray-200 text-center">{lang.speak ? '✓' : '—'}</td>
              <td className="px-2 py-1.5 border border-gray-200" style={{ color: theme.primaryColor }}>{lang.proficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReferencesSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.references.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="References" />
      <div className="grid grid-cols-2 gap-4 px-1">
        {resumeData.references.map((ref) => (
          <div key={ref.id} className="text-sm border border-gray-100 rounded p-3 bg-gray-50/50">
            <p className="font-bold text-gray-900">{ref.name}</p>
            <p className="text-gray-700">{ref.designation}</p>
            {ref.organization && <p className="text-gray-600 text-xs">{ref.organization}</p>}
            {ref.phone && <p className="text-gray-500 text-xs mt-1">Phone: {ref.phone}</p>}
            {ref.email && <p className="text-gray-500 text-xs">Email: {ref.email}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function InterestsSection() {
  const { resumeData, theme } = useResumeStore();
  if (resumeData.interests.length === 0) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Interests & Hobbies" />
      <div className="flex flex-wrap gap-2 px-1">
        {resumeData.interests.map((interest) => (
          <span
            key={interest.id}
            className="text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: `${theme.primaryColor}15`, color: theme.primaryColor }}
          >
            {interest.interest}
          </span>
        ))}
      </div>
    </div>
  );
}

function CustomSectionsSection() {
  const { resumeData } = useResumeStore();
  if (resumeData.customSections.length === 0) return null;
  return (
    <>
      {resumeData.customSections.map((section) => (
        <div key={section.id} className="mb-4">
          <SectionHeading title={section.title} />
          <p className="text-sm whitespace-pre-line text-gray-700 leading-relaxed px-1">{section.content}</p>
        </div>
      ))}
    </>
  );
}

function DeclarationSection() {
  const { resumeData, theme } = useResumeStore();
  const { declaration } = resumeData;
  if (!declaration.showDeclaration) return null;
  return (
    <div className="mb-4">
      <SectionHeading title="Declaration" />
      <p className="text-sm text-gray-700 leading-relaxed px-1 italic">{declaration.text}</p>
      <div className="flex justify-between items-end mt-6 px-1">
        <div>
          {declaration.date && (
            <p className="text-xs text-gray-500">Date: {declaration.date}</p>
          )}
        </div>
        <div className="text-center">
          {declaration.signatureImage ? (
            <img src={declaration.signatureImage} alt="Signature" className="h-10 object-contain mb-1" />
          ) : (
            <div className="h-10 border-b-2 w-36 mb-1" style={{ borderColor: theme.primaryColor }} />
          )}
          <p className="text-xs text-gray-600 font-medium">{resumeData.personalInfo.fullName}</p>
          <p className="text-xs text-gray-400">Signature</p>
        </div>
      </div>
    </div>
  );
}

// ─── Section map ──────────────────────────────────────────────────────────────

const SECTION_COMPONENTS: Record<string, React.ReactNode> = {
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
  custom: <CustomSectionsSection />,
  declaration: <DeclarationSection />,
};

// ─── CV Template ──────────────────────────────────────────────────────────────

export const CVTemplate = forwardRef<HTMLDivElement, CVTemplateProps>(({ className }, ref) => {
  const { sectionOrder, sectionVisibility, theme } = useResumeStore();

  // personal & social are rendered in the header — skip them in the body loop
  const bodySections = sectionOrder.filter(
    (id) => id !== 'personal' && id !== 'social' && sectionVisibility[id] !== false,
  );

  return (
    <div
      ref={ref}
      className={cn('w-full bg-white', className)}
      style={{ fontFamily: theme.fontFamily, fontSize: `${theme.fontSize}px`, lineHeight: 1.6 }}
    >
      {/* Header: CV title + contact + photo */}
      <CVHeader />

      {/* Body: all remaining sections */}
      <div className="px-6 py-5">
        {bodySections.map((id, i) => (
          <div key={id}>
            {SECTION_COMPONENTS[id]}
            {i < bodySections.length - 1 && <Divider />}
          </div>
        ))}
      </div>
    </div>
  );
});
CVTemplate.displayName = 'CVTemplate';
