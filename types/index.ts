export interface PersonalInfo {
  fullName: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  religion: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  phone: string;
  email: string;
  nid: string;
  photo: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  university: string;
  board: string;
  subject: string;
  yearOfPassing: string;
  duration: string;
  result: string;
  cgpa: string;
  grade: string;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  designation: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string;
  url: string;
  startDate: string;
  endDate: string;
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  url: string;
}

export interface TrainingEntry {
  id: string;
  title: string;
  institution: string;
  duration: string;
  year: string;
  description: string;
}

export interface LanguageEntry {
  id: string;
  language: string;
  read: boolean;
  write: boolean;
  speak: boolean;
  proficiency: string;
}

export interface ReferenceEntry {
  id: string;
  name: string;
  designation: string;
  organization: string;
  relationship: string;
  phone: string;
  email: string;
  address: string;
}

export interface SocialLinkEntry {
  id: string;
  platform: string;
  url: string;
}

export interface InterestEntry {
  id: string;
  interest: string;
}

export interface CustomSectionEntry {
  id: string;
  title: string;
  content: string;
}

export interface DeclarationEntry {
  text: string;
  date: string;
  signatureImage: string;
  showDeclaration: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  careerObjective: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  trainings: TrainingEntry[];
  languages: LanguageEntry[];
  references: ReferenceEntry[];
  interests: InterestEntry[];
  socialLinks: SocialLinkEntry[];
  customSections: CustomSectionEntry[];
  declaration: DeclarationEntry;
}

export interface SectionConfig {
  id: string;
  label: string;
  visible: boolean;
  order: number;
}

export type TemplateType = 'single-column' | 'two-column';

export interface ThemeConfig {
  primaryColor: string;
  textColor: string;
  headingBgColor: string;
  headingTextColor: string;
  fontFamily: string;
  fontSize: number;
  spacing: number;
  borderRadius: number;
  template: TemplateType;
  themePreset: string;
}

export interface ResumeState {
  resumeData: ResumeData;
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
  theme: ThemeConfig;
  activeSection: string;
  history: ResumeState[];
  historyIndex: number;
  setResumeData: (data: Partial<ResumeData>) => void;
  setSectionOrder: (order: string[]) => void;
  setSectionVisibility: (id: string, visible: boolean) => void;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  setActiveSection: (section: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  resetResume: () => void;
  importResume: (data: ResumeState) => void;
  exportResume: () => ResumeState;
}

export const SECTION_IDS = [
  'personal',
  'objective',
  'education',
  'experience',
  'skills',
  'projects',
  'certifications',
  'trainings',
  'languages',
  'references',
  'interests',
  'social',
  'custom',
  'declaration',
] as const;

export const SECTION_LABELS: Record<string, string> = {
  personal: 'Personal Information',
  objective: 'Career Objective',
  education: 'Education',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  trainings: 'Trainings',
  languages: 'Languages',
  references: 'References',
  interests: 'Interests',
  social: 'Social Links',
  custom: 'Custom Sections',
  declaration: 'Declaration',
};
