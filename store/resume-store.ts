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

const buildInitialState = (): Omit<
  ResumeState,
  'setResumeData' | 'setSectionOrder' | 'setSectionVisibility' | 'setTheme' |
  'setActiveSection' | 'undo' | 'redo' | 'resetResume' | 'importResume' | 'exportResume' |
  '_hydrate'
> => ({
  resumeData: { ...sampleResumeData },
  sectionOrder: [...SECTION_IDS],
  sectionVisibility: { ...defaultSectionVisibility },
  theme: { ...defaultTheme },
  activeSection: 'personal',
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,
  _hydrated: false,
});

type StoreActions = {
  setResumeData: (data: Partial<ResumeData>) => void;
  setSectionOrder: (order: string[]) => void;
  setSectionVisibility: (id: string, visible: boolean) => void;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  setActiveSection: (section: string) => void;
  undo: () => void;
  redo: () => void;
  resetResume: () => void;
  importResume: (data: ResumeState) => void;
  exportResume: () => ResumeState;
  _hydrate: () => void;
};

type ResumeStore = ResumeState & StoreActions;

export const useResumeStore = create<ResumeStore>((set, get) => {
  const initial = buildInitialState();

  return {
    ...initial,

    setResumeData: (data: Partial<ResumeData>) => {
      const current = get();
      const newHistory = current.history.slice(0, current.historyIndex + 1);
      newHistory.push({
        resumeData: { ...current.resumeData },
        sectionOrder: [...current.sectionOrder],
        sectionVisibility: { ...current.sectionVisibility },
        theme: { ...current.theme },
        activeSection: current.activeSection,
        history: [],
        historyIndex: -1,
        canUndo: false,
        canRedo: false,
        _hydrated: true,
      } as unknown as ResumeStore);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();

      const newResumeData = { ...current.resumeData, ...data };
      set({
        resumeData: newResumeData,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: newHistory.length > 1,
        canRedo: false,
      });
      saveToStorage(get() as unknown as ResumeState);
    },

    setSectionOrder: (order: string[]) => {
      const current = get();
      const newHistory = current.history.slice(0, current.historyIndex + 1);
      newHistory.push({
        resumeData: { ...current.resumeData },
        sectionOrder: [...current.sectionOrder],
        sectionVisibility: { ...current.sectionVisibility },
        theme: { ...current.theme },
        activeSection: current.activeSection,
        history: [],
        historyIndex: -1,
        canUndo: false,
        canRedo: false,
        _hydrated: true,
      } as unknown as ResumeStore);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();

      set({
        sectionOrder: order,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: newHistory.length > 1,
        canRedo: false,
      });
      saveToStorage(get() as unknown as ResumeState);
    },

    setSectionVisibility: (id: string, visible: boolean) => {
      const current = get();
      const newHistory = current.history.slice(0, current.historyIndex + 1);
      newHistory.push({
        resumeData: { ...current.resumeData },
        sectionOrder: [...current.sectionOrder],
        sectionVisibility: { ...current.sectionVisibility },
        theme: { ...current.theme },
        activeSection: current.activeSection,
        history: [],
        historyIndex: -1,
        canUndo: false,
        canRedo: false,
        _hydrated: true,
      } as unknown as ResumeStore);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();

      set({
        sectionVisibility: { ...current.sectionVisibility, [id]: visible },
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: newHistory.length > 1,
        canRedo: false,
      });
      saveToStorage(get() as unknown as ResumeState);
    },

    setTheme: (theme: Partial<ThemeConfig>) => {
      set({ theme: { ...get().theme, ...theme } });
      saveToStorage(get() as unknown as ResumeState);
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
      saveToStorage(get() as unknown as ResumeState);
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
      saveToStorage(get() as unknown as ResumeState);
    },

    resetResume: () => {
      const fresh = buildInitialState();
      set({
        ...fresh,
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
      const current = get();
      const newHistory = current.history.slice(0, current.historyIndex + 1);
      newHistory.push({
        resumeData: { ...current.resumeData },
        sectionOrder: [...current.sectionOrder],
        sectionVisibility: { ...current.sectionVisibility },
        theme: { ...current.theme },
        activeSection: current.activeSection,
        history: [],
        historyIndex: -1,
        canUndo: false,
        canRedo: false,
        _hydrated: true,
      } as unknown as ResumeStore);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();

      set({
        resumeData: data.resumeData,
        sectionOrder: data.sectionOrder,
        sectionVisibility: data.sectionVisibility,
        theme: data.theme,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: newHistory.length > 1,
        canRedo: false,
      });
      saveToStorage(get() as unknown as ResumeState);
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
        _hydrated: state._hydrated,
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

    _hydrate: () => {
      if (get()._hydrated) return;
      const stored = loadFromStorage();
      if (!stored) {
        set({ _hydrated: true });
        return;
      }

      const hydrated = { ...get() };
      if (stored.resumeData) {
        hydrated.resumeData = {
          ...get().resumeData,
          ...stored.resumeData,
          declaration: stored.resumeData.declaration || { ...sampleResumeData.declaration },
        };
      }
      if (stored.sectionOrder) {
        const missing = SECTION_IDS.filter((id) => !stored.sectionOrder!.includes(id));
        hydrated.sectionOrder = [...stored.sectionOrder, ...missing];
      }
      if (stored.sectionVisibility) {
        hydrated.sectionVisibility = { ...defaultSectionVisibility, ...stored.sectionVisibility };
      }
      if (stored.theme) {
        hydrated.theme = { ...get().theme, ...stored.theme };
      }
      hydrated._hydrated = true;

      set(hydrated);
    },
  };
});
