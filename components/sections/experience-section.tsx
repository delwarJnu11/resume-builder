'use client';

import { useResumeStore } from '@/store/resume-store';
import { ExperienceEntry } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, Briefcase } from 'lucide-react';
import { generateId } from '@/lib/utils';
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

function SortableExperienceItem({
  entry,
  index,
  onUpdate,
  onDelete,
}: {
  entry: ExperienceEntry;
  index: number;
  onUpdate: (field: keyof ExperienceEntry, value: string | boolean) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: entry.id,
  });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative bg-white rounded-xl border border-slate-200 overflow-hidden',
        isDragging && 'opacity-50 shadow-lg'
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100">
        <button {...attributes} {...listeners} className="cursor-grab p-1 hover:bg-slate-200 rounded transition-colors" aria-label="Drag to reorder">
          <GripVertical className="w-4 h-4 text-slate-400" />
        </button>
        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
          <Briefcase className="w-3 h-3 text-slate-500" />
        </div>
        <span className="text-sm font-medium text-slate-700 flex-1">
          {entry.designation || `Experience ${index + 1}`}
        </span>
        <Button variant="ghost" size="sm" onClick={onDelete} className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50">
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Organization / Company *"
            value={entry.organization}
            onChange={(e) => onUpdate('organization', e.target.value)}
            placeholder="Tech Solutions Ltd."
            id={`org-${entry.id}`}
          />
          <Input
            label="Designation *"
            value={entry.designation}
            onChange={(e) => onUpdate('designation', e.target.value)}
            placeholder="Software Engineer"
            id={`desig-${entry.id}`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Department"
              value={entry.department}
              onChange={(e) => onUpdate('department', e.target.value)}
              placeholder="Engineering"
              id={`dept-${entry.id}`}
            />
            <Input
              label="Location"
              value={entry.location}
              onChange={(e) => onUpdate('location', e.target.value)}
              placeholder="Dhaka, Bangladesh"
              id={`loc-${entry.id}`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={entry.startDate}
              onChange={(e) => onUpdate('startDate', e.target.value)}
              id={`start-${entry.id}`}
            />
            <div className="space-y-3">
              <Input
                label="End Date"
                type="month"
                value={entry.endDate}
                onChange={(e) => onUpdate('endDate', e.target.value)}
                disabled={entry.isCurrent}
                id={`end-${entry.id}`}
              />
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={entry.isCurrent}
                  onChange={(e) => onUpdate('isCurrent', e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900/20 w-4 h-4"
                />
                Currently working here
              </label>
            </div>
          </div>
        </div>

        <Textarea
          label="Responsibilities / Achievements"
          value={entry.responsibilities}
          onChange={(e) => onUpdate('responsibilities', e.target.value)}
          placeholder="• Led development of...&#10;• Improved performance by...&#10;• Collaborated with..."
          id={`resp-${entry.id}`}
          rows={4}
        />
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      experience: [
        ...resumeData.experience,
        {
          id: generateId(),
          organization: '',
          designation: '',
          department: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          responsibilities: '',
        },
      ],
    });
  };

  const updateEntry = (id: string, field: keyof ExperienceEntry, value: string | boolean) => {
    setResumeData({
      experience: resumeData.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ experience: resumeData.experience.filter((e) => e.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.experience.findIndex((e) => e.id === active.id);
      const newIndex = resumeData.experience.findIndex((e) => e.id === over.id);
      setResumeData({ experience: arrayMove(resumeData.experience, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.experience.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {resumeData.experience.map((entry, index) => (
              <SortableExperienceItem
                key={entry.id}
                entry={entry}
                index={index}
                onUpdate={(field, value) => updateEntry(entry.id, field, value)}
                onDelete={() => deleteEntry(entry.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
}
