import { describe, expect, it } from 'vitest'

import { resolveTheme } from '@/features/digital-card/themes/resolveTheme'
import { themePresets, type ThemeTokens } from '@/features/digital-card/themes/themePresets'
import { THEME_PRESETS } from '@/features/digital-card/types/card.types'

const REQUIRED_THEME_TOKENS = [
  'pageBackground',
  'cardBackground',
  'primaryText',
  'secondaryText',
  'mutedText',
  'border',
  'accent',
  'accentText',
  'primaryActionBackground',
  'primaryActionText',
  'dialogBackground',
  'focusRing',
] as const satisfies readonly (keyof ThemeTokens)[]

function calculateRelativeLuminance(hexColor: string): number {
  const normalizedColor = hexColor.replace('#', '')

  const channels = [0, 2, 4].map((position) => {
    const channel = Number.parseInt(
      normalizedColor.slice(position, position + 2),
      16,
    ) / 255

    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  })

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  )
}

function calculateContrastRatio(
  foreground: string,
  background: string,
): number {
  const foregroundLuminance =
    calculateRelativeLuminance(foreground)

  const backgroundLuminance =
    calculateRelativeLuminance(background)

  const lighter = Math.max(
    foregroundLuminance,
    backgroundLuminance,
  )

  const darker = Math.min(
    foregroundLuminance,
    backgroundLuminance,
  )

  return (lighter + 0.05) / (darker + 0.05)
}

describe('themePresets', () => {
  it('contains every documented preset', () => {
    expect(Object.keys(themePresets)).toEqual([...THEME_PRESETS])
  })

  it('provides every required token as a six-digit hex colour', () => {
    Object.values(themePresets).forEach((theme) => {
      REQUIRED_THEME_TOKENS.forEach((token) => {
        expect(theme[token]).toMatch(/^#[0-9a-f]{6}$/i)
      })
    })
  })

  it('meets normal-text contrast requirements for key combinations', () => {
    Object.values(themePresets).forEach((theme) => {
      expect(
        calculateContrastRatio(
          theme.primaryText,
          theme.cardBackground,
        ),
      ).toBeGreaterThanOrEqual(4.5)

      expect(
        calculateContrastRatio(
          theme.accentText,
          theme.accent,
        ),
      ).toBeGreaterThanOrEqual(4.5)

      expect(
        calculateContrastRatio(
          theme.primaryActionText,
          theme.primaryActionBackground,
        ),
      ).toBeGreaterThanOrEqual(4.5)
    })
  })
})

describe('resolveTheme', () => {
  it('returns the complete selected preset', () => {
    expect(
      resolveTheme({
        preset: 'forest',
      }),
    ).toEqual(themePresets.forest)
  })

  it('replaces only explicitly overridden colours', () => {
    const resolvedTheme = resolveTheme({
      preset: 'light',
      colorOverrides: {
        accent: '#123456',
      },
    })

    expect(resolvedTheme.accent).toBe('#123456')
    expect(resolvedTheme.cardBackground).toBe(
      themePresets.light.cardBackground,
    )
    expect(resolvedTheme.primaryText).toBe(
      themePresets.light.primaryText,
    )
  })
})