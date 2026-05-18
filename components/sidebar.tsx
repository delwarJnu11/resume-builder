"use client";

import CustomizationPanel from "@/components/customization-panel";
import { Button } from "@/components/ui/button";
import { exportToDOCX } from "@/lib/export-docx";
import { exportToPDF } from "@/lib/export-pdf";
import { cn } from "@/lib/utils";
import { useResumeStore as useStore } from "@/store/resume-store";
import { ResumeState, SECTION_LABELS } from "@/types";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import {
	Award,
	BookOpen,
	Briefcase,
	CheckSquare,
	ChevronDown,
	ChevronUp,
	Download,
	Eye,
	EyeOff,
	FileDown,
	FileText,
	FileType,
	FolderGit2,
	GraduationCap,
	GripVertical,
	Heart,
	Languages,
	Layout,
	Link as LinkIcon,
	Redo2,
	RotateCcw,
	Settings2,
	Undo2,
	Upload,
	User,
	Users,
	Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const sectionIcons: Record<string, React.ReactNode> = {
	personal: <User className="w-4 h-4" />,
	objective: <FileText className="w-4 h-4" />,
	education: <GraduationCap className="w-4 h-4" />,
	experience: <Briefcase className="w-4 h-4" />,
	skills: <Wrench className="w-4 h-4" />,
	projects: <FolderGit2 className="w-4 h-4" />,
	certifications: <Award className="w-4 h-4" />,
	trainings: <BookOpen className="w-4 h-4" />,
	languages: <Languages className="w-4 h-4" />,
	references: <Users className="w-4 h-4" />,
	interests: <Heart className="w-4 h-4" />,
	social: <LinkIcon className="w-4 h-4" />,
	custom: <Layout className="w-4 h-4" />,
	declaration: <CheckSquare className="w-4 h-4" />,
};

function SortableSectionItem({
	id,
	index,
	total,
	label,
	isActive,
	isVisible,
	onClick,
	onToggleVisibility,
	onMoveUp,
	onMoveDown,
}: {
	id: string;
	index: number;
	total: number;
	label: string;
	isActive: boolean;
	isVisible: boolean;
	onClick: () => void;
	onToggleVisibility: () => void;
	onMoveUp: () => void;
	onMoveDown: () => void;
}) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	const style = { transform: CSS.Transform.toString(transform), transition };
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const showVisible = isMounted ? isVisible : true;
	const showActive = isMounted ? isActive : false;

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				"group flex items-center gap-1.5 px-2 py-2 rounded-lg cursor-pointer transition-all duration-150",
				isDragging && "opacity-40 z-50",
				showActive ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
			)}
			onClick={onClick}
			role="button"
			tabIndex={0}
			aria-label={`Select ${label} section`}
			onKeyDown={(e) => e.key === "Enter" && onClick()}>

			{/* Drag handle */}
			<button
				{...attributes}
				{...listeners}
				className="cursor-grab p-0.5 rounded opacity-0 group-hover:opacity-50 transition-opacity shrink-0"
				aria-label="Drag to reorder"
				onClick={(e) => e.stopPropagation()}
				suppressHydrationWarning>
				<GripVertical className="w-3.5 h-3.5" />
			</button>

			{/* Icon */}
			<span className={cn("transition-colors shrink-0", showActive ? "text-white/80" : "text-slate-400")}>
				{sectionIcons[id]}
			</span>

			{/* Label */}
			<span className="text-sm font-medium flex-1 truncate">{label}</span>

			{/* Up / Down buttons */}
			<div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
				<button
					onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
					disabled={index === 0}
					className={cn(
						"p-0.5 rounded transition-colors leading-none",
						showActive ? "hover:bg-white/20 disabled:opacity-20" : "hover:bg-slate-200 disabled:opacity-20",
					)}
					aria-label={`Move ${label} up`}>
					<ChevronUp className="w-3 h-3" />
				</button>
				<button
					onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
					disabled={index === total - 1}
					className={cn(
						"p-0.5 rounded transition-colors leading-none",
						showActive ? "hover:bg-white/20 disabled:opacity-20" : "hover:bg-slate-200 disabled:opacity-20",
					)}
					aria-label={`Move ${label} down`}>
					<ChevronDown className="w-3 h-3" />
				</button>
			</div>

			{/* Visibility toggle */}
			<button
				onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
				className={cn("p-1 rounded transition-colors shrink-0", showActive ? "hover:bg-white/20" : "hover:bg-slate-200")}
				aria-label={showVisible ? `Hide ${label}` : `Show ${label}`}>
				{showVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 opacity-40" />}
			</button>
		</div>
	);
}

export default function Sidebar() {
	const {
		sectionOrder,
		sectionVisibility,
		activeSection,
		setActiveSection,
		setSectionOrder,
		setSectionVisibility,
		undo,
		redo,
		canUndo,
		canRedo,
		resetResume,
		resumeData,
		exportResume,
		importResume,
	} = useStore();

	const [showCustomization, setShowCustomization] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = sectionOrder.indexOf(active.id as string);
			const newIndex = sectionOrder.indexOf(over.id as string);
			setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
		}
	};

	const handleMoveUp = (index: number) => {
		if (index === 0) return;
		setSectionOrder(arrayMove(sectionOrder, index, index - 1));
	};

	const handleMoveDown = (index: number) => {
		if (index === sectionOrder.length - 1) return;
		setSectionOrder(arrayMove(sectionOrder, index, index + 1));
	};

	const handleExportPDF = () => {
		try {
			exportToPDF(null);
		} catch (error) {
			toast.error("Failed to export PDF");
			console.error("PDF export error:", error);
		}
	};

	const handleExportDOCX = async () => {
		try {
			toast.loading("Generating DOCX...");
			await exportToDOCX(
				resumeData,
				`${resumeData.personalInfo.fullName || "resume"}.docx`,
				useStore.getState().theme,
				sectionOrder,
				sectionVisibility,
			);
			toast.dismiss();
			toast.success("DOCX exported successfully!");
		} catch (error) {
			toast.dismiss();
			toast.error("Failed to export DOCX");
			console.error("DOCX export error:", error);
		}
	};

	const handleExportJSON = () => {
		const data = exportResume();
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${resumeData.personalInfo.fullName || "resume"}.json`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("JSON exported successfully!");
	};

	const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const data = JSON.parse(event.target?.result as string) as ResumeState;
					importResume(data);
					toast.success("Resume imported successfully!");
				} catch {
					toast.error("Invalid JSON file");
				}
			};
			reader.readAsText(file);
		}
	};

	const handleReset = () => {
		if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
			resetResume();
			toast.success("Resume reset successfully");
		}
	};

	return (
		<aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full">
			{/* Header */}
			<div className="px-5 py-4 border-b border-slate-100">
				<div className="flex items-center gap-2.5">
					<div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
						<FileText className="w-4 h-4 text-white" />
					</div>
					<div>
						<h1 className="text-sm font-bold text-slate-900">Resume Builder</h1>
						<p className="text-xs text-slate-500">Professional CV Maker</p>
					</div>
				</div>
			</div>

			{/* Section label */}
			<div className="px-4 pt-3 pb-1">
				<p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sections</p>
				<p className="text-xs text-slate-400 mt-0.5">Drag or use arrows to reorder</p>
			</div>

			{/* Sortable section list */}
			<div className="flex-1 overflow-y-auto px-3 py-1">
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}>
					<SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
						<div className="space-y-0.5">
							{sectionOrder.map((sectionId, index) => (
								<SortableSectionItem
									key={sectionId}
									id={sectionId}
									index={index}
									total={sectionOrder.length}
									label={SECTION_LABELS[sectionId] || sectionId}
									isActive={activeSection === sectionId}
									isVisible={sectionVisibility[sectionId] !== false}
									onClick={() => setActiveSection(sectionId)}
									onToggleVisibility={() => setSectionVisibility(sectionId, !sectionVisibility[sectionId])}
									onMoveUp={() => handleMoveUp(index)}
									onMoveDown={() => handleMoveDown(index)}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			</div>

			{/* Bottom actions */}
			<div className="px-4 py-3 border-t border-slate-100 space-y-2">
				<Button
					variant="outline"
					size="sm"
					className={cn("w-full justify-start gap-2", showCustomization && "bg-slate-50 border-slate-300")}
					onClick={() => setShowCustomization(!showCustomization)}>
					<Settings2 className="w-4 h-4" />
					Customize Design
				</Button>

				<AnimatePresence>
					{showCustomization && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="overflow-hidden">
							<div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
								<CustomizationPanel />
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="flex gap-1.5">
					<Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo} className="flex-1" aria-label="Undo">
						<Undo2 className="w-3.5 h-3.5" />
					</Button>
					<Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo} className="flex-1" aria-label="Redo">
						<Redo2 className="w-3.5 h-3.5" />
					</Button>
				</div>

				<div className="grid grid-cols-2 gap-1.5">
					<Button variant="outline" size="sm" onClick={handleExportPDF} className="justify-center gap-1.5">
						<FileDown className="w-3.5 h-3.5" />
						PDF
					</Button>
					<Button variant="outline" size="sm" onClick={handleExportDOCX} className="justify-center gap-1.5">
						<FileType className="w-3.5 h-3.5" />
						DOCX
					</Button>
				</div>

				<div className="flex gap-1.5">
					<Button variant="ghost" size="sm" onClick={handleExportJSON} className="flex-1" title="Export JSON">
						<Download className="w-3.5 h-3.5" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => fileInputRef.current?.click()}
						className="flex-1"
						title="Import JSON">
						<Upload className="w-3.5 h-3.5" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleReset}
						className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50"
						title="Reset">
						<RotateCcw className="w-3.5 h-3.5" />
					</Button>
					<input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
				</div>
			</div>
		</aside>
	);
}
