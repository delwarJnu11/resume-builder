'use client';

import { useResumeStore } from '@/store/resume-store';
import { EducationEntry } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, GraduationCap } from 'lucide-react';
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

function SortableEducationItem({
  entry,
  index,
  onUpdate,
  onDelete,
}: {
  entry: EducationEntry;
  index: number;
  onUpdate: (field: keyof EducationEntry, value: string) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: entry.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab p-1 hover:bg-slate-200 rounded transition-colors"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-slate-400" />
        </button>
        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
          <GraduationCap className="w-3 h-3 text-slate-500" />
        </div>
        <span className="text-sm font-medium text-slate-700 flex-1">
          {entry.degree || `Education ${index + 1}`}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Degree / Examination"
            value={entry.degree}
            onChange={(e) => onUpdate('degree', e.target.value)}
            placeholder="B.Sc. in Computer Science"
            id={`degree-${entry.id}`}
          />
          <Input
            label="Institution / College"
            value={entry.institution}
            onChange={(e) => onUpdate('institution', e.target.value)}
            placeholder="BUET"
            id={`institution-${entry.id}`}
          />
          <Input
            label="University"
            value={entry.university}
            onChange={(e) => onUpdate('university', e.target.value)}
            placeholder="BUET"
            id={`university-${entry.id}`}
          />
          <Input
            label="Board (for SSC/HSC)"
            value={entry.board}
            onChange={(e) => onUpdate('board', e.target.value)}
            placeholder="Dhaka"
            id={`board-${entry.id}`}
          />
          <Input
            label="Subject / Group"
            value={entry.subject}
            onChange={(e) => onUpdate('subject', e.target.value)}
            placeholder="CSE / Science"
            id={`subject-${entry.id}`}
          />
          <Input
            label="Year of Passing"
            value={entry.yearOfPassing}
            onChange={(e) => onUpdate('yearOfPassing', e.target.value)}
            placeholder="2018"
            id={`year-${entry.id}`}
          />
          <Input
            label="Duration"
            value={entry.duration}
            onChange={(e) => onUpdate('duration', e.target.value)}
            placeholder="4 Years"
            id={`duration-${entry.id}`}
          />
          <Input
            label="CGPA"
            value={entry.cgpa}
            onChange={(e) => onUpdate('cgpa', e.target.value)}
            placeholder="3.75"
            id={`cgpa-${entry.id}`}
          />
          <Input
            label="Grade / Division"
            value={entry.grade}
            onChange={(e) => onUpdate('grade', e.target.value)}
            placeholder="First Class"
            id={`grade-${entry.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function EducationSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      education: [
        ...resumeData.education,
        {
          id: generateId(),
          degree: '',
          institution: '',
          university: '',
          board: '',
          subject: '',
          yearOfPassing: '',
          duration: '',
          result: '',
          cgpa: '',
          grade: '',
        },
      ],
    });
  };

  const updateEntry = (id: string, field: keyof EducationEntry, value: string) => {
    setResumeData({
      education: resumeData.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      ),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({
      education: resumeData.education.filter((e) => e.id !== id),
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.education.findIndex((e) => e.id === active.id);
      const newIndex = resumeData.education.findIndex((e) => e.id === over.id);
      setResumeData({
        education: arrayMove(resumeData.education, oldIndex, newIndex),
      });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={resumeData.education.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {resumeData.education.map((entry, index) => (
              <SortableEducationItem
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
        Add Education
      </Button>
    </div>
  );
}
