'use client';

import { useResumeStore } from '@/store/resume-store';
import { SkillEntry } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, Wrench } from 'lucide-react';
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

function SortableSkillItem({
  entry,
  onUpdate,
  onDelete,
}: {
  entry: SkillEntry;
  onUpdate: (field: keyof SkillEntry, value: string | number) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: entry.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200',
        isDragging && 'opacity-50 shadow-lg'
      )}
    >
      <button {...attributes} {...listeners} className="cursor-grab p-1 hover:bg-slate-100 rounded" aria-label="Drag to reorder">
        <GripVertical className="w-4 h-4 text-slate-400" />
      </button>
      <Input
        value={entry.name}
        onChange={(e) => onUpdate('name', e.target.value)}
        placeholder="Skill name"
        className="flex-1"
        id={`skill-${entry.id}`}
      />
      <select
        value={entry.category}
        onChange={(e) => onUpdate('category', e.target.value)}
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
        aria-label="Skill category"
      >
        <option value="Technical">Technical</option>
        <option value="Soft">Soft</option>
        <option value="Language">Language</option>
        <option value="Tool">Tool</option>
      </select>
      <div className="flex items-center gap-2 w-28">
        <input
          type="range"
          min="0"
          max="100"
          value={entry.level}
          onChange={(e) => onUpdate('level', parseInt(e.target.value))}
          className="flex-1 accent-slate-900"
          aria-label="Skill level"
        />
        <span className="text-xs font-medium text-slate-500 w-8 text-right">{entry.level}%</span>
      </div>
      <Button variant="ghost" size="sm" onClick={onDelete} className="h-7 w-7 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50">
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

export default function SkillsSection() {
  const { resumeData, setResumeData } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const addEntry = () => {
    setResumeData({
      skills: [...resumeData.skills, { id: generateId(), name: '', level: 50, category: 'Technical' }],
    });
  };

  const updateEntry = (id: string, field: keyof SkillEntry, value: string | number) => {
    setResumeData({
      skills: resumeData.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  };

  const deleteEntry = (id: string) => {
    setResumeData({ skills: resumeData.skills.filter((s) => s.id !== id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = resumeData.skills.findIndex((s) => s.id === active.id);
      const newIndex = resumeData.skills.findIndex((s) => s.id === over.id);
      setResumeData({ skills: arrayMove(resumeData.skills, oldIndex, newIndex) });
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={resumeData.skills.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {resumeData.skills.map((entry) => (
              <SortableSkillItem
                key={entry.id}
                entry={entry}
                onUpdate={(field, value) => updateEntry(entry.id, field, value)}
                onDelete={() => deleteEntry(entry.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={addEntry} variant="outline" className="w-full justify-center gap-2 border-dashed">
        <Plus className="w-4 h-4" />
        Add Skill
      </Button>
    </div>
  );
}
