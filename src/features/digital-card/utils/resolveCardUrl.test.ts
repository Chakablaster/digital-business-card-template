import { describe, expect, it } from 'vitest'

import { resolveCardUrl } from './resolveCardUrl'

describe('resolveCardUrl', () => {
  it('uses the configured card URL when provided', () => {
    expect(
      resolveCardUrl(
        'https://example.com/card',
        'https://fallback.example.com/',
      ),
    ).toBe('https://example.com/card')
  })

  it('ignores surrounding whitespace in the configured URL', () => {
    expect(
      resolveCardUrl(
        '  https://example.com/card  ',
        'https://fallback.example.com/',
      ),
    ).toBe('https://example.com/card')
  })

  it('uses the current browser URL when no card URL is configured', () => {
    expect(
      resolveCardUrl('', 'https://example.com/digital-card'),
    ).toBe('https://example.com/digital-card')
  })

  it('removes fragments from the browser URL fallback', () => {
    expect(
      resolveCardUrl(
        '',
        'https://example.com/digital-card#contact',
      ),
    ).toBe('https://example.com/digital-card')
  })

  it('preserves query parameters in the browser URL fallback', () => {
    expect(
      resolveCardUrl(
        '',
        'https://example.com/digital-card?source=qr#contact',
      ),
    ).toBe('https://example.com/digital-card?source=qr')
  })

  it('returns a safe local fallback when the current URL is invalid', () => {
    expect(resolveCardUrl('', 'not-a-valid-url')).toBe(
      'http://localhost/',
    )
  })
})