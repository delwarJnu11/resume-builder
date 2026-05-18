import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  fatherName: z.string().optional().default(''),
  motherName: z.string().optional().default(''),
  dateOfBirth: z.string().optional().default(''),
  gender: z.string().optional().default(''),
  maritalStatus: z.string().optional().default(''),
  nationality: z.string().optional().default(''),
  religion: z.string().optional().default(''),
  bloodGroup: z.string().optional().default(''),
  presentAddress: z.string().optional().default(''),
  permanentAddress: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().email('Invalid email').or(z.literal('')).default(''),
  nid: z.string().optional().default(''),
  photo: z.string().optional().default(''),
});

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  university: z.string().optional().default(''),
  board: z.string().optional().default(''),
  subject: z.string().optional().default(''),
  yearOfPassing: z.string().optional().default(''),
  duration: z.string().optional().default(''),
  result: z.string().optional().default(''),
  cgpa: z.string().optional().default(''),
  grade: z.string().optional().default(''),
});

export const experienceSchema = z.object({
  organization: z.string().min(1, 'Organization is required'),
  designation: z.string().min(1, 'Designation is required'),
  department: z.string().optional().default(''),
  location: z.string().optional().default(''),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
  isCurrent: z.boolean().optional().default(false),
  responsibilities: z.string().optional().default(''),
});

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().min(0).max(100).default(50),
  category: z.string().optional().default('Technical'),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string().optional().default(''),
  technologies: z.string().optional().default(''),
  url: z.string().optional().default(''),
  startDate: z.string().optional().default(''),
  endDate: z.string().optional().default(''),
});

export const certificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  issuingOrganization: z.string().optional().default(''),
  issueDate: z.string().optional().default(''),
  expiryDate: z.string().optional().default(''),
  credentialId: z.string().optional().default(''),
  url: z.string().optional().default(''),
});

export const trainingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  institution: z.string().optional().default(''),
  duration: z.string().optional().default(''),
  year: z.string().optional().default(''),
  description: z.string().optional().default(''),
});

export const languageSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  read: z.boolean().optional().default(false),
  write: z.boolean().optional().default(false),
  speak: z.boolean().optional().default(false),
  proficiency: z.string().optional().default(''),
});

export const referenceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().optional().default(''),
  organization: z.string().optional().default(''),
  relationship: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  email: z.string().email('Invalid email').or(z.literal('')).default(''),
  address: z.string().optional().default(''),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL').or(z.literal('')).default(''),
});

export const interestSchema = z.object({
  interest: z.string().min(1, 'Interest is required'),
});

export const customSectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional().default(''),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
export type ExperienceFormData = z.infer<typeof experienceSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type CertificationFormData = z.infer<typeof certificationSchema>;
export type TrainingFormData = z.infer<typeof trainingSchema>;
export type LanguageFormData = z.infer<typeof languageSchema>;
export type ReferenceFormData = z.infer<typeof referenceSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>;
export type InterestFormData = z.infer<typeof interestSchema>;
export type CustomSectionFormData = z.infer<typeof customSectionSchema>;
