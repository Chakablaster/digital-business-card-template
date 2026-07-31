import { describe, expect, it } from 'vitest'

import cardConfig from '@/config/card.config'
import type { CardConfig } from '@/features/digital-card/types/card.types'
import { assertValidCardConfig, validateCardConfig } from '@/features/digital-card/utils/validateConfig'

function createConfig(): CardConfig {
  return structuredClone(cardConfig)
}

describe('validateCardConfig', () => {
  it('accepts the default card configuration', () => {
    const result = validateCardConfig(createConfig())

    expect(result).toEqual({
      isValid: true,
      errors: [],
    })
  })

  it('rejects empty required text fields', () => {
    const config = createConfig()

    config.metadata.pageTitle = ''
    config.profile.fullName = '   '
    config.profile.role = ''

    const result = validateCardConfig(config)

    expect(result.isValid).toBe(false)
    expect(result.errors).toContain(
      'metadata.pageTitle cannot be empty.',
    )
    expect(result.errors).toContain(
      'profile.fullName cannot be empty.',
    )
    expect(result.errors).toContain(
      'profile.role cannot be empty.',
    )
  })

  it('allows the primary action to be hidden completely', () => {
    const config = createConfig()

    config.primaryAction.label = ''
    config.primaryAction.href = ''

    expect(validateCardConfig(config).isValid).toBe(true)
  })

  it('rejects an incomplete primary action', () => {
    const config = createConfig()

    config.primaryAction.href = ''

    const result = validateCardConfig(config)

    expect(result.errors).toContain(
      'primaryAction must include both a label and destination, or leave both empty to hide it.',
    )
  })

  it('rejects unsupported primary-action protocols', () => {
    const config = createConfig()

    config.primaryAction.href = 'javascript:alert("test")'

    const result = validateCardConfig(config)

    expect(result.errors).toContain(
      'primaryAction.href must use http, https, mailto, tel, an internal path, or a page fragment.',
    )
  })

  it('rejects an invalid configured QR URL', () => {
    const config = createConfig()

    config.qrCode.cardUrl = 'example.com/card'

    const result = validateCardConfig(config)

    expect(result.errors).toContain(
      'qrCode.cardUrl must be an absolute http or https URL.',
    )
  })

  it('rejects incomplete and duplicate social links', () => {
    const config = createConfig()

    config.socialLinks = [
      {
        platform: 'github',
        label: 'GitHub',
        href: 'https://github.com/example',
      },
      {
        platform: 'linkedin',
        label: '',
        href: 'https://linkedin.com/in/example',
      },
      {
        platform: 'link',
        label: 'Duplicate',
        href: 'https://github.com/example/',
      },
    ]

    const result = validateCardConfig(config)

    expect(result.errors).toContain(
      'socialLinks[2] must include both a label and destination.',
    )
    expect(result.errors).toContain(
      'socialLinks contains a duplicate destination: https://github.com/example/',
    )
  })

  it('rejects invalid colour overrides', () => {
    const config = createConfig()

    config.appearance.colorOverrides = {
      accent: 'blue',
      primaryText: '#123456',
    }

    const result = validateCardConfig(config)

    expect(result.errors).toContain(
      'appearance.colorOverrides.accent must be a valid hexadecimal colour.',
    )
    expect(result.errors).not.toContain(
      'appearance.colorOverrides.primaryText must be a valid hexadecimal colour.',
    )
  })
})

describe('assertValidCardConfig', () => {
  it('does not throw for a valid configuration', () => {
    expect(() => {
      assertValidCardConfig(createConfig())
    }).not.toThrow()
  })

  it('throws a readable combined error for invalid configuration', () => {
    const config = createConfig()

    config.profile.fullName = ''
    config.qrCode.cardUrl = 'invalid-url'

    expect(() => {
      assertValidCardConfig(config)
    }).toThrow(
      [
        'Invalid digital card configuration:',
        '- profile.fullName cannot be empty.',
        '- qrCode.cardUrl must be an absolute http or https URL.',
      ].join('\n'),
    )
  })
})