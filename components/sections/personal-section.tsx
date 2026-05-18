'use client';

import { useResumeStore } from '@/store/resume-store';
import { PersonalInfo } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { GENDERS, MARITAL_STATUSES, BLOOD_GROUPS } from '@/lib/utils';
import { Upload, UserCircle } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function PersonalSection() {
  const { resumeData, setResumeData } = useResumeStore();
  const personal = resumeData.personalInfo;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateField = (field: keyof PersonalInfo, value: string) => {
    setResumeData({ personalInfo: { ...personal, [field]: value } });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
            {isMounted && personal.photo ? (
              <img src={personal.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-10 h-10 text-slate-300" />
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-1.5 bg-slate-900 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Upload photo"
          >
            <Upload className="w-3 h-3" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-900">Profile Photo</h3>
          <p className="text-xs text-slate-500 mt-0.5">Upload a professional photo (optional)</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            value={personal.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="Md. Abdullah Al Mamun"
            id="fullName"
          />
          <Input
            label="Father&apos;s Name"
            value={personal.fatherName}
            onChange={(e) => updateField('fatherName', e.target.value)}
            placeholder="Md. Abdul Karim"
            id="fatherName"
          />
          <Input
            label="Mother&apos;s Name"
            value={personal.motherName}
            onChange={(e) => updateField('motherName', e.target.value)}
            placeholder="Fatema Begum"
            id="motherName"
          />
          <Input
            label="Date of Birth"
            type="date"
            value={personal.dateOfBirth}
            onChange={(e) => updateField('dateOfBirth', e.target.value)}
            id="dateOfBirth"
          />
          <Select
            label="Gender"
            value={personal.gender}
            onChange={(e) => updateField('gender', e.target.value)}
            options={GENDERS.map((g) => ({ value: g, label: g }))}
            id="gender"
          />
          <Select
            label="Marital Status"
            value={personal.maritalStatus}
            onChange={(e) => updateField('maritalStatus', e.target.value)}
            options={MARITAL_STATUSES.map((m) => ({ value: m, label: m }))}
            id="maritalStatus"
          />
          <Input
            label="Nationality"
            value={personal.nationality}
            onChange={(e) => updateField('nationality', e.target.value)}
            placeholder="Bangladeshi"
            id="nationality"
          />
          <Input
            label="Religion"
            value={personal.religion}
            onChange={(e) => updateField('religion', e.target.value)}
            placeholder="Islam"
            id="religion"
          />
          <Select
            label="Blood Group"
            value={personal.bloodGroup}
            onChange={(e) => updateField('bloodGroup', e.target.value)}
            options={BLOOD_GROUPS.map((b) => ({ value: b, label: b }))}
            id="bloodGroup"
          />
          <Input
            label="NID Number"
            value={personal.nid}
            onChange={(e) => updateField('nid', e.target.value)}
            placeholder="1234567890123"
            id="nid"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Address</h3>
        <div className="space-y-4">
          <Textarea
            label="Present Address"
            value={personal.presentAddress}
            onChange={(e) => updateField('presentAddress', e.target.value)}
            placeholder="House #12, Road #5, Dhanmondi, Dhaka-1205"
            id="presentAddress"
            rows={2}
          />
          <Textarea
            label="Permanent Address"
            value={personal.permanentAddress}
            onChange={(e) => updateField('permanentAddress', e.target.value)}
            placeholder="Village: Uttar Para, P.O: Sadar, Dist: Comilla"
            id="permanentAddress"
            rows={2}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone"
            value={personal.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+880-1712-345678"
            id="phone"
          />
          <Input
            label="Email"
            type="email"
            value={personal.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="mamun@example.com"
            id="email"
          />
        </div>
      </div>
    </div>
  );
}
