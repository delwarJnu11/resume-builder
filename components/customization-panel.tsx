'use client';

import { useResumeStore } from '@/store/resume-store';
import { THEME_PRESETS, FONT_FAMILIES } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Palette, Type, Ruler, Check } from 'lucide-react';
import { useState } from 'react';

export default function CustomizationPanel({ mode = 'resume' }: { mode?: 'resume' | 'cv' }) {
  const { theme, setTheme } = useResumeStore();
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'spacing'>('colors');

  const tabs = [
    { id: 'colors' as const, label: 'Colors', icon: Palette },
    { id: 'fonts' as const, label: 'Fonts', icon: Type },
    { id: 'spacing' as const, label: 'Layout', icon: Ruler },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-0.5 p-0.5 bg-slate-100 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all',
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Presets</p>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(THEME_PRESETS).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => setTheme({ ...preset, themePreset: name })}
                  className={cn(
                    'p-2 rounded-lg border transition-all text-left',
                    theme.themePreset === name
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <div className="flex gap-1 mb-1.5">
                    <div className="w-3.5 h-3.5 rounded-full ring-1 ring-black/5" style={{ backgroundColor: preset.primaryColor }} />
                    <div className="w-3.5 h-3.5 rounded-full ring-1 ring-black/5" style={{ backgroundColor: preset.headingBgColor }} />
                  </div>
                  <span className="text-xs capitalize text-slate-700">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { label: 'Primary', key: 'primaryColor' as const },
              { label: 'Heading BG', key: 'headingBgColor' as const },
              { label: 'Heading Text', key: 'headingTextColor' as const },
              { label: 'Body Text', key: 'textColor' as const },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="text-xs font-medium text-slate-600 mb-1.5 block">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme[key]}
                    onChange={(e) => setTheme({ [key]: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                  />
                  <Input
                    value={theme[key]}
                    onChange={(e) => setTheme({ [key]: e.target.value })}
                    className="flex-1 h-8 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fonts' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Font Family</label>
            <select
              value={theme.fontFamily}
              onChange={(e) => setTheme({ fontFamily: e.target.value })}
              className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-600">Font Size</label>
              <span className="text-xs text-slate-500">{theme.fontSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="18"
              value={theme.fontSize}
              onChange={(e) => setTheme({ fontSize: parseInt(e.target.value) })}
              className="w-full accent-slate-900"
            />
          </div>
        </div>
      )}

      {activeTab === 'spacing' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-600">Line Spacing</label>
              <span className="text-xs text-slate-500">{theme.spacing}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              value={theme.spacing}
              onChange={(e) => setTheme({ spacing: parseInt(e.target.value) })}
              className="w-full accent-slate-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-600">Border Radius</label>
              <span className="text-xs text-slate-500">{theme.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={theme.borderRadius}
              onChange={(e) => setTheme({ borderRadius: parseInt(e.target.value) })}
              className="w-full accent-slate-900"
            />
          </div>

          {mode !== 'cv' && (
            <div>
              <label className="text-xs font-medium text-slate-600 mb-2 block">Layout</label>
              <div className="grid grid-cols-2 gap-2">
                {(['single-column', 'two-column'] as const).map((layout) => (
                  <button
                    key={layout}
                    onClick={() => setTheme({ template: layout })}
                    className={cn(
                      'p-2.5 rounded-lg border transition-all text-center',
                      theme.template === layout
                        ? 'border-slate-900 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <div className="flex gap-0.5 justify-center mb-1.5">
                      {layout === 'single-column' ? (
                        <div className="w-6 h-4 rounded border border-slate-300" />
                      ) : (
                        <>
                          <div className="w-4 h-4 rounded border border-slate-300" />
                          <div className="w-2 h-4 rounded border border-slate-300" />
                        </>
                      )}
                    </div>
                    <span className="text-xs text-slate-700">
                      {layout === 'single-column' ? 'Single' : 'Two Column'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
