import { describe, expect, it } from 'vitest'

import { resolveLinkTarget } from './resolveLinkTarget'

describe('resolveLinkTarget', () => {
  it('keeps email and phone links in the current context', () => {
    expect(resolveLinkTarget('mailto:hello@example.com')).toEqual({})
    expect(resolveLinkTarget('tel:+60123456789')).toEqual({})
  })

  it('keeps internal paths and page fragments in the current context', () => {
    expect(resolveLinkTarget('/contact')).toEqual({})
    expect(resolveLinkTarget('#contact')).toEqual({})
  })

  it('opens external links safely in a new tab', () => {
    expect(resolveLinkTarget('https://example.com')).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    })
  })

  it('ignores surrounding spaces and capitalization when checking protocols', () => {
    expect(resolveLinkTarget('  MAILTO:hello@example.com  ')).toEqual({})
    expect(resolveLinkTarget('  TEL:+60123456789  ')).toEqual({})
  })
})