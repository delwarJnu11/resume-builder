'use client';

import { useResumeStore } from '@/store/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { generateId, LANGUAGE_PROFICIENCIES, SOCIAL_PLATFORMS } from '@/lib/utils';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

function SortableItem({
  entry,
  fields,
  onUpdate,
  onDelete,
  title,
}: {
  entry: Record<string, unknown> & { id: string };
  fields: { key: string; label: string; type?: string; placeholder?: string; options?: { value: string; label: string }[]; rows?: number }[];
  onUpdate: (field: string, value: string | boolean) => void;
  onDelete: () => void;
  title: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entry.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('bg-white rounded-xl border border-slate-200 overflow-hidden', isDragging && 'opacity-50 shadow-lg')}
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100">
        <button {...attributes} {...listeners} className="cursor-grab p-1 hover:bg-slate-200 rounded transition-colors" aria-label="Drag to reorder">
          <GripVertical className="w-4 h-4 text-slate-400" />
        </button>
        <span className="text-sm font-medium text-slate-700 flex-1">
          {(entry.title as string) || (entry.name as string) || (entry.language as string) || (entry.platform as string) || (entry.interest as string) || title}
        </span>
        <Button variant="ghost" size="sm" onClick={onDelete} className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50">
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) =>
            field.type === 'textarea' ? (
              <div key={field.key} className={field.rows ? 'md:col-span-2' : ''}>
                <Textarea
                  label={field.label}
                  value={(entry[field.key] as string) || ''}
                  onChange={(e) => onUpdate(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  id={`${field.key}-${entry.id}`}
                  rows={field.rows || 3}
                />
              </div>
            ) : field.options ? (
              <div key={field.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
                <select
                  value={(entry[field.key] as string) || ''}
                  onChange={(e) => onUpdate(field.key, e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                  aria-label={field.label}
                >
                  <option value="">{field.label}...</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            ) : (
              <Input
                key={field.key}
                label={field.label}
                type={field.type}
                value={(entry[field.key] as string) || ''}
                onChange={(e) => onUpdate(field.key, e.target.value)}
                placeholder={field.placeholder}
                id={`${field.key}-${entry.id}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

const projectFields = [
  { key: 'title', label: 'Project Title *', placeholder: 'E-Commerce Platform' },
  { key: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
  { key: 'url', label: 'URL', type: 'url', placeholder: 'https://github.com/...' },
  { key: 'startDate', label: 'Start Date', type: 'month' },
  { key: 'endDate', label: 'End Date', type: 'month' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the project...', rows: 3 },
];

const certificationFields = [
  { key: 'title', label: 'Certification Title *', placeholder: 'AWS Certified Solutions Architect' },
  { key: 'issuingOrganization', label: 'Issuing Organization', placeholder: 'Amazon Web Services' },
  { key: 'issueDate', label: 'Issue Date', type: 'month' },
  { key: 'expiryDate', label: 'Expiry Date', type: 'month' },
  { key: 'credentialId', label: 'Credential ID', placeholder: 'AWS-123456' },
  { key: 'url', label: 'Credential URL', type: 'url', placeholder: 'https://...' },
];

const trainingFields = [
  { key: 'title', label: 'Training Title *', placeholder: 'Advanced Web Development' },
  { key: 'institution', label: 'Institution', placeholder: 'Bangladesh Computer Council' },
  { key: 'duration', label: 'Duration', placeholder: '3 Months' },
  { key: 'year', label: 'Year', placeholder: '2020' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe the training...', rows: 3 },
];

const referenceFields = [
  { key: 'name', label: 'Name *', placeholder: 'Dr. Mohammad Rahman' },
  { key: 'designation', label: 'Designation', placeholder: 'Professor' },
  { key: 'organization', label: 'Organization', placeholder: 'BUET' },
  { key: 'relationship', label: 'Relationship', placeholder: 'Academic Advisor' },
  { key: 'phone', label: 'Phone', placeholder: '+880-1711-111111' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'rahman@buet.ac.bd' },
  { key: 'address', label: 'Address', placeholder: 'Dhaka, Bangladesh' },
];

const socialFields = [
  { key: 'platform', label: 'Platform *', options: SOCIAL_PLATFORMS.map((p) => ({ value: p, label: p })) },
  { key: 'url', label: 'Profile URL', type: 'url', placeholder: 'https://linkedin.com/in/...' },
];

const interestFields = [
  { key: 'interest', label: 'Interest *', placeholder: 'Open Source Contribution' },
];

function createSection<T extends { id: string }>({
  items,
  fields,
  addEntry,
  updateEntry,
  deleteEntry,
  addButtonLabel,
  title,
}: {
  items: T[];
  fields: typeof projectFields;
  addEntry: () => void;
  updateEntry: (id: string, field: string, value: string) => void;
  deleteEntry: (id: string) => void;
  addButtonLabel: string;
  title: string;
}) {
  return function Section() {
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
      }
    };

    return (
      <div className="space-y-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.map((entry) => (
                <SortableItem
                  key={entry.id}
                  entry={entry as Record<string, unknown> & { id: string }}
                  fields={fields}
                  onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                  onDelete={() => deleteEntry(entry.id)}
                  title={title}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
          <Plus className="w-4 h-4" />
          {addButtonLabel}
        </Button>
      </div>
    );
  };
}

export function ProjectsSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      projects: [...resumeData.projects, { id: generateId(), title: '', description: '', technologies: '', url: '', startDate: '', endDate: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    setResumeData({
      projects: resumeData.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ projects: resumeData.projects.filter((p) => p.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.projects.findIndex((p) => p.id === active.id);
      const newIndex = resumeData.projects.findIndex((p) => p.id === over.id);
      setResumeData({ projects: arrayMove(resumeData.projects, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.projects.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry as unknown as Record<string, unknown> & { id: string }}
                fields={projectFields}
                onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                onDelete={() => deleteEntry(entry.id)}
                title="Project"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Project
      </Button>
    </div>
  );
}

export function CertificationsSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      certifications: [...resumeData.certifications, { id: generateId(), title: '', issuingOrganization: '', issueDate: '', expiryDate: '', credentialId: '', url: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    setResumeData({
      certifications: resumeData.certifications.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ certifications: resumeData.certifications.filter((c) => c.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.certifications.findIndex((c) => c.id === active.id);
      const newIndex = resumeData.certifications.findIndex((c) => c.id === over.id);
      setResumeData({ certifications: arrayMove(resumeData.certifications, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.certifications.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.certifications.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry as unknown as Record<string, unknown> & { id: string }}
                fields={certificationFields}
                onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                onDelete={() => deleteEntry(entry.id)}
                title="Certification"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Certification
      </Button>
    </div>
  );
}

export function TrainingsSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      trainings: [...resumeData.trainings, { id: generateId(), title: '', institution: '', duration: '', year: '', description: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    setResumeData({
      trainings: resumeData.trainings.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ trainings: resumeData.trainings.filter((t) => t.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.trainings.findIndex((t) => t.id === active.id);
      const newIndex = resumeData.trainings.findIndex((t) => t.id === over.id);
      setResumeData({ trainings: arrayMove(resumeData.trainings, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.trainings.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.trainings.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry as unknown as Record<string, unknown> & { id: string }}
                fields={trainingFields}
                onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                onDelete={() => deleteEntry(entry.id)}
                title="Training"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Training
      </Button>
    </div>
  );
}

export function LanguagesSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      languages: [...resumeData.languages, { id: generateId(), language: '', read: false, write: false, speak: false, proficiency: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string | boolean) => {
    setResumeData({
      languages: resumeData.languages.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ languages: resumeData.languages.filter((l) => l.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.languages.findIndex((l) => l.id === active.id);
      const newIndex = resumeData.languages.findIndex((l) => l.id === over.id);
      setResumeData({ languages: arrayMove(resumeData.languages, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.languages.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.languages.map((entry) => (
              <div key={entry.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-700 flex-1">{entry.language || 'Language'}</span>
                  <Button variant="ghost" size="sm" onClick={() => deleteEntry(entry.id)} className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Language"
                      value={entry.language}
                      onChange={(e) => updateEntry(entry.id, 'language', e.target.value)}
                      placeholder="English"
                      id={`lang-${entry.id}`}
                    />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Proficiency</label>
                      <select
                        value={entry.proficiency}
                        onChange={(e) => updateEntry(entry.id, 'proficiency', e.target.value)}
                        className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                        aria-label="Proficiency"
                      >
                        <option value="">Proficiency...</option>
                        {LANGUAGE_PROFICIENCIES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" checked={entry.read} onChange={(e) => updateEntry(entry.id, 'read', e.target.checked)} className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/20" />
                      Read
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" checked={entry.write} onChange={(e) => updateEntry(entry.id, 'write', e.target.checked)} className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/20" />
                      Write
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input type="checkbox" checked={entry.speak} onChange={(e) => updateEntry(entry.id, 'speak', e.target.checked)} className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/20" />
                      Speak
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Language
      </Button>
    </div>
  );
}

export function ReferencesSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      references: [...resumeData.references, { id: generateId(), name: '', designation: '', organization: '', relationship: '', phone: '', email: '', address: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    setResumeData({
      references: resumeData.references.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ references: resumeData.references.filter((r) => r.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.references.findIndex((r) => r.id === active.id);
      const newIndex = resumeData.references.findIndex((r) => r.id === over.id);
      setResumeData({ references: arrayMove(resumeData.references, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.references.map((r) => r.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.references.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry as unknown as Record<string, unknown> & { id: string }}
                fields={referenceFields}
                onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                onDelete={() => deleteEntry(entry.id)}
                title="Reference"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Reference
      </Button>
    </div>
  );
}

export function SocialLinksSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      socialLinks: [...resumeData.socialLinks, { id: generateId(), platform: '', url: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    setResumeData({
      socialLinks: resumeData.socialLinks.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ socialLinks: resumeData.socialLinks.filter((s) => s.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.socialLinks.findIndex((s) => s.id === active.id);
      const newIndex = resumeData.socialLinks.findIndex((s) => s.id === over.id);
      setResumeData({ socialLinks: arrayMove(resumeData.socialLinks, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.socialLinks.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.socialLinks.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry as unknown as Record<string, unknown> & { id: string }}
                fields={socialFields}
                onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                onDelete={() => deleteEntry(entry.id)}
                title="Social Link"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Social Link
      </Button>
    </div>
  );
}

export function InterestsSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      interests: [...resumeData.interests, { id: generateId(), interest: '' }],
    });
  };

  const updateEntry = (id: string, field: string, value: string) => {
    setResumeData({
      interests: resumeData.interests.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ interests: resumeData.interests.filter((i) => i.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.interests.findIndex((i) => i.id === active.id);
      const newIndex = resumeData.interests.findIndex((i) => i.id === over.id);
      setResumeData({ interests: arrayMove(resumeData.interests, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.interests.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.interests.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry as unknown as Record<string, unknown> & { id: string }}
                fields={interestFields}
                onUpdate={(field, value) => updateEntry(entry.id, field, value as string)}
                onDelete={() => deleteEntry(entry.id)}
                title="Interest"
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Interest
      </Button>
    </div>
  );
}
