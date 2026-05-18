import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const THEME_PRESETS = {
  professional: {
    primaryColor: '#2563eb',
    headingBgColor: '#dbeafe',
    headingTextColor: '#1e3a8a',
    textColor: '#1f2937',
  },
  elegant: {
    primaryColor: '#7c3aed',
    headingBgColor: '#ede9fe',
    headingTextColor: '#4c1d95',
    textColor: '#1f2937',
  },
  classic: {
    primaryColor: '#374151',
    headingBgColor: '#f3f4f6',
    headingTextColor: '#111827',
    textColor: '#374151',
  },
  modern: {
    primaryColor: '#059669',
    headingBgColor: '#d1fae5',
    headingTextColor: '#064e3b',
    textColor: '#1f2937',
  },
  minimal: {
    primaryColor: '#6b7280',
    headingBgColor: '#f9fafb',
    headingTextColor: '#374151',
    textColor: '#374151',
  },
  corporate: {
    primaryColor: '#1e40af',
    headingBgColor: '#dbeafe',
    headingTextColor: '#1e3a8a',
    textColor: '#1f2937',
  },
};

export const FONT_FAMILIES = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Open Sans', value: 'Open Sans, sans-serif' },
  { label: 'Lato', value: 'Lato, sans-serif' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Noto Sans', value: 'Noto Sans, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Raleway', value: 'Raleway, sans-serif' },
];

export const BLOOD_GROUPS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const GENDERS = ['Male', 'Female', 'Other'];

export const MARITAL_STATUSES = ['Single', 'Married', 'Widowed', 'Divorced'];

export const LANGUAGE_PROFICIENCIES = [
  'Native',
  'Fluent',
  'Intermediate',
  'Basic',
];

export const SOCIAL_PLATFORMS = [
  'LinkedIn',
  'GitHub',
  'Facebook',
  'Twitter',
  'Portfolio',
  'Other',
];

export const calculateProgress = (data: Record<string, unknown>): number => {
  let filled = 0;
  let total = 0;

  const checkFields = (obj: Record<string, unknown>) => {
    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        total += 1;
        if (value.length > 0) filled += 1;
      } else if (typeof value === 'string') {
        total += 1;
        if (value.trim()) filled += 1;
      } else if (typeof value === 'object' && value !== null) {
        checkFields(value as Record<string, unknown>);
      }
    }
  };

  checkFields(data);
  return total > 0 ? Math.round((filled / total) * 100) : 0;
};
