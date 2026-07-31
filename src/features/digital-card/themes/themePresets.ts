import type {
  ThemeColorOverrides,
  ThemePreset,
} from '../types/card.types'

export type ThemeTokens = Required<ThemeColorOverrides>

export const themePresets: Record<ThemePreset, ThemeTokens> = {
  light: {
    pageBackground: '#eef2f7',
    cardBackground: '#ffffff',
    primaryText: '#111827',
    secondaryText: '#374151',
    mutedText: '#6b7280',
    border: '#d1d5db',
    accent: '#2563eb',
    accentText: '#ffffff',
    primaryActionBackground: '#111827',
    primaryActionText: '#ffffff',
    dialogBackground: '#ffffff',
    focusRing: '#2563eb',
  },

  dark: {
    pageBackground: '#0b1120',
    cardBackground: '#111827',
    primaryText: '#f9fafb',
    secondaryText: '#d1d5db',
    mutedText: '#9ca3af',
    border: '#374151',
    accent: '#60a5fa',
    accentText: '#0b1120',
    primaryActionBackground: '#f9fafb',
    primaryActionText: '#111827',
    dialogBackground: '#1f2937',
    focusRing: '#93c5fd',
  },

  'slateBlue': {
    pageBackground: '#dbe5f1',
    cardBackground: '#f8fafc',
    primaryText: '#172033',
    secondaryText: '#334155',
    mutedText: '#64748b',
    border: '#b9c7d8',
    accent: '#365d8d',
    accentText: '#ffffff',
    primaryActionBackground: '#273f5f',
    primaryActionText: '#ffffff',
    dialogBackground: '#f8fafc',
    focusRing: '#466f9f',
  },

  'warmSand': {
    pageBackground: '#efe5d2',
    cardBackground: '#fffaf0',
    primaryText: '#33281c',
    secondaryText: '#5b4632',
    mutedText: '#806b55',
    border: '#d7c4a7',
    accent: '#9a5b2f',
    accentText: '#ffffff',
    primaryActionBackground: '#4a3524',
    primaryActionText: '#fffaf0',
    dialogBackground: '#fffaf0',
    focusRing: '#a96232',
  },

  forest: {
    pageBackground: '#dbe7df',
    cardBackground: '#f7fbf8',
    primaryText: '#18271f',
    secondaryText: '#31483b',
    mutedText: '#66776d',
    border: '#b7c9bd',
    accent: '#2f6b4f',
    accentText: '#ffffff',
    primaryActionBackground: '#244b38',
    primaryActionText: '#ffffff',
    dialogBackground: '#f7fbf8',
    focusRing: '#3f7f60',
  },
}