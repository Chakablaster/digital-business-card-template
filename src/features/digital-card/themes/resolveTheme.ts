import type { CardAppearance } from '../types/card.types'
import { themePresets, type ThemeTokens } from './themePresets'

export function resolveTheme(appearance: CardAppearance): ThemeTokens {
  return {
    ...themePresets[appearance.preset],
    ...appearance.colorOverrides,
  }
}