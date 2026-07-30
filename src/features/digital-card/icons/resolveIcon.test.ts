import { describe, expect, it } from 'vitest'

import type { IconName } from '../types/card.types'
import { iconRegistry } from './iconRegistry'
import { normalizeIconName, resolveIcon } from './resolveIcon'

describe('normalizeIconName', () => {
  it('normalizes capitalization', () => {
    expect(normalizeIconName('GitHub' as IconName)).toBe('github')
    expect(normalizeIconName('WHATSAPP' as IconName)).toBe('whatsapp')
  })

  it('normalizes spaces and underscores', () => {
    expect(normalizeIconName('generic link' as IconName)).toBe('link')
    expect(normalizeIconName('generic_link' as IconName)).toBe('link')
  })

  it('resolves documented aliases', () => {
    expect(normalizeIconName('twitter' as IconName)).toBe('x')
    expect(normalizeIconName('web' as IconName)).toBe('website')
    expect(normalizeIconName('cv' as IconName)).toBe('resume')
  })

  it('falls back to the generic link icon name', () => {
    expect(normalizeIconName('unsupported-platform' as IconName)).toBe('link')
  })
})

describe('resolveIcon', () => {
  it('returns the registered component for a known icon', () => {
    expect(resolveIcon('linkedin')).toBe(iconRegistry.linkedin)
  })

  it('returns the generic link component for an unknown icon', () => {
    expect(resolveIcon('unsupported-platform' as IconName)).toBe(
      iconRegistry.link,
    )
  })
})