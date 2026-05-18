import { create } from 'zustand';
import {
  ResumeState,
  ResumeData,
  ThemeConfig,
  SECTION_IDS,
} from '@/types';
import {
  sampleResumeData,
  defaultTheme,
  defaultSectionVisibility,
} from '@/lib/sample-data';

const STORAGE_KEY = 'resume-builder-data';
const MAX_HISTORY = 20;

const loadFromStorage = (): Partial<ResumeState> | null => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (state: ResumeState) => {
  if (typeof window === 'undefined') return;
  try {
    const toSave = {
      resumeData: state.resumeData,
      sectionOrder: state.sectionOrder,
      sectionVisibility: state.sectionVisibility,
      theme: state.theme,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Storage full or unavailable
  }
};

const initialState: Omit<ResumeState, 'setResumeData' | 'setSectionOrder' | 'setSectionVisibility' | 'setTheme' | 'setActiveSection' | 'undo' | 'redo' | 'resetResume' | 'importResume' | 'exportResume'> = {
  resumeData: sampleResumeData,
  sectionOrder: [...SECTION_IDS],
  sectionVisibility: { ...defaultSectionVisibility },
  theme: { ...defaultTheme },
  activeSection: 'personal',
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,
};

export const useResumeStore = create<ResumeState>((set, get) => {
  const stored = loadFromStorage();

  const baseState = {
    ...initialState,
    ...(stored || {}),
    history: [],
    historyIndex: -1,
  };

  // Migrate: ensure all current SECTION_IDS are in sectionOrder and sectionVisibility
  const missingSections = SECTION_IDS.filter((id) => !baseState.sectionOrder.includes(id));
  if (missingSections.length > 0) {
    baseState.sectionOrder = [...baseState.sectionOrder, ...missingSections];
  }
  for (const id of SECTION_IDS) {
    if (baseState.sectionVisibility[id] === undefined) {
      baseState.sectionVisibility[id] = defaultSectionVisibility[id] ?? true;
    }
  }

  // Migrate: ensure declaration exists in resumeData
  if (!baseState.resumeData?.declaration) {
    baseState.resumeData = {
      ...baseState.resumeData,
      declaration: { ...sampleResumeData.declaration },
    };
  }

  const pushHistory = (state: Omit<ResumeState, 'history' | 'historyIndex' | 'canUndo' | 'canRedo'>) => {
    const current = get();
    const newHistory = current.history.slice(0, current.historyIndex + 1);
    newHistory.push({
      resumeData: state.resumeData,
      sectionOrder: state.sectionOrder,
      sectionVisibility: state.sectionVisibility,
      theme: state.theme,
      activeSection: state.activeSection,
      history: [],
      historyIndex: -1,
      canUndo: false,
      canRedo: false,
      setResumeData: () => {},
      setSectionOrder: () => {},
      setSectionVisibility: () => {},
      setTheme: () => {},
      setActiveSection: () => {},
      undo: () => {},
      redo: () => {},
      resetResume: () => {},
      importResume: () => {},
      exportResume: () => ({}) as ResumeState,
    });

    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }

    return {
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: newHistory.length > 1,
      canRedo: false,
    };
  };

  return {
    ...baseState,

    setResumeData: (data: Partial<ResumeData>) => {
      const historyUpdate = pushHistory(get());
      const newResumeData = { ...get().resumeData, ...data };
      set({ ...historyUpdate, resumeData: newResumeData });
      saveToStorage(get());
    },

    setSectionOrder: (order: string[]) => {
      const historyUpdate = pushHistory(get());
      set({ ...historyUpdate, sectionOrder: order });
      saveToStorage(get());
    },

    setSectionVisibility: (id: string, visible: boolean) => {
      const historyUpdate = pushHistory(get());
      set({
        ...historyUpdate,
        sectionVisibility: { ...get().sectionVisibility, [id]: visible },
      });
      saveToStorage(get());
    },

    setTheme: (theme: Partial<ThemeConfig>) => {
      set({ theme: { ...get().theme, ...theme } });
      saveToStorage(get());
    },

    setActiveSection: (section: string) => {
      set({ activeSection: section });
    },

    undo: () => {
      const { history, historyIndex } = get();
      if (historyIndex <= 0) return;
      const prevIndex = historyIndex - 1;
      const prevState = history[prevIndex];
      set({
        resumeData: prevState.resumeData,
        sectionOrder: prevState.sectionOrder,
        sectionVisibility: prevState.sectionVisibility,
        theme: prevState.theme,
        historyIndex: prevIndex,
        canUndo: prevIndex > 0,
        canRedo: true,
      });
      saveToStorage(get());
    },

    redo: () => {
      const { history, historyIndex } = get();
      if (historyIndex >= history.length - 1) return;
      const nextIndex = historyIndex + 1;
      const nextState = history[nextIndex];
      set({
        resumeData: nextState.resumeData,
        sectionOrder: nextState.sectionOrder,
        sectionVisibility: nextState.sectionVisibility,
        theme: nextState.theme,
        historyIndex: nextIndex,
        canUndo: true,
        canRedo: nextIndex < history.length - 1,
      });
      saveToStorage(get());
    },

    canUndo: baseState.history.length > 0,
    canRedo: false,

    resetResume: () => {
      set({
        ...initialState,
        history: [],
        historyIndex: -1,
        canUndo: false,
        canRedo: false,
      });
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    },

    importResume: (data: ResumeState) => {
      const historyUpdate = pushHistory(get());
      set({
        ...historyUpdate,
        resumeData: data.resumeData,
        sectionOrder: data.sectionOrder,
        sectionVisibility: data.sectionVisibility,
        theme: data.theme,
      });
      saveToStorage(get());
    },

    exportResume: () => {
      const state = get();
      return {
        resumeData: state.resumeData,
        sectionOrder: state.sectionOrder,
        sectionVisibility: state.sectionVisibility,
        theme: state.theme,
        activeSection: state.activeSection,
        history: [],
        historyIndex: -1,
        canUndo: false,
        canRedo: false,
        setResumeData: () => {},
        setSectionOrder: () => {},
        setSectionVisibility: () => {},
        setTheme: () => {},
        setActiveSection: () => {},
        undo: () => {},
        redo: () => {},
        resetResume: () => {},
        importResume: () => {},
        exportResume: () => ({}) as ResumeState,
      };
    },
  };
});
