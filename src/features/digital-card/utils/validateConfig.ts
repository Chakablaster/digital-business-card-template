import type {
  CardConfig,
  SocialLinkConfig,
} from '../types/card.types'

const HEX_COLOR_PATTERN =
  /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i

const WEB_PROTOCOLS = new Set(['http:', 'https:'])
const ACTION_PROTOCOLS = new Set([
  'http:',
  'https:',
  'mailto:',
  'tel:',
])

export interface ConfigValidationResult {
  isValid: boolean
  errors: string[]
}

function hasText(value?: string): value is string {
  return Boolean(value?.trim())
}

function isValidUrl(
  value: string,
  allowedProtocols: Set<string>,
  allowInternalPaths = false,
): boolean {
  const trimmedValue = value.trim()

  if (
    allowInternalPaths &&
    (trimmedValue.startsWith('/') || trimmedValue.startsWith('#'))
  ) {
    return true
  }

  try {
    const url = new URL(trimmedValue)

    return allowedProtocols.has(url.protocol)
  } catch {
    return false
  }
}

function validateRequiredText(
  errors: string[],
  fieldName: string,
  value: string,
) {
  if (!hasText(value)) {
    errors.push(`${fieldName} cannot be empty.`)
  }
}

function validatePrimaryAction(
  config: CardConfig,
  errors: string[],
) {
  const { label, href } = config.primaryAction
  const hasLabel = hasText(label)
  const hasHref = hasText(href)

  if (!hasLabel && !hasHref) {
    return
  }

  if (!hasLabel || !hasHref) {
    errors.push(
      'primaryAction must include both a label and destination, or leave both empty to hide it.',
    )

    return
  }

  if (!isValidUrl(href, ACTION_PROTOCOLS, true)) {
    errors.push(
      'primaryAction.href must use http, https, mailto, tel, an internal path, or a page fragment.',
    )
  }
}

function validateSocialLink(
  link: SocialLinkConfig,
  index: number,
  errors: string[],
) {
  const position = index + 1
  const hasLabel = hasText(link.label)
  const hasHref = hasText(link.href)

  if (!hasLabel && !hasHref) {
    return
  }

  if (!hasLabel || !hasHref) {
    errors.push(
      `socialLinks[${position}] must include both a label and destination.`,
    )

    return
  }

  if (!isValidUrl(link.href, ACTION_PROTOCOLS, true)) {
    errors.push(
      `socialLinks[${position}].href uses an unsupported or invalid destination.`,
    )
  }
}

function normalizeDestination(value: string): string {
  return value.trim().toLowerCase().replace(/\/+$/, '')
}

function validateSocialLinks(
  links: SocialLinkConfig[],
  errors: string[],
) {
  const destinations = new Set<string>()

  links.forEach((link, index) => {
    validateSocialLink(link, index, errors)

    if (!hasText(link.href)) {
      return
    }

    const destination = normalizeDestination(link.href)

    if (destinations.has(destination)) {
      errors.push(
        `socialLinks contains a duplicate destination: ${link.href.trim()}`,
      )

      return
    }

    destinations.add(destination)
  })
}

function validateColorOverrides(
  config: CardConfig,
  errors: string[],
) {
  const overrides = config.appearance.colorOverrides

  if (!overrides) {
    return
  }

  Object.entries(overrides).forEach(([token, value]) => {
    if (!value || !HEX_COLOR_PATTERN.test(value.trim())) {
      errors.push(
        `appearance.colorOverrides.${token} must be a valid hexadecimal colour.`,
      )
    }
  })
}

export function validateCardConfig(
  config: CardConfig,
): ConfigValidationResult {
  const errors: string[] = []

  validateRequiredText(
    errors,
    'metadata.pageTitle',
    config.metadata.pageTitle,
  )

  validateRequiredText(
    errors,
    'metadata.pageDescription',
    config.metadata.pageDescription,
  )

  validateRequiredText(
    errors,
    'profile.fullName',
    config.profile.fullName,
  )

  validateRequiredText(
    errors,
    'profile.profileImage',
    config.profile.profileImage,
  )

  validateRequiredText(
    errors,
    'profile.role',
    config.profile.role,
  )

  validateRequiredText(
    errors,
    'qrCode.dialogTitle',
    config.qrCode.dialogTitle,
  )

  if (
    hasText(config.qrCode.cardUrl) &&
    !isValidUrl(config.qrCode.cardUrl, WEB_PROTOCOLS)
  ) {
    errors.push(
      'qrCode.cardUrl must be an absolute http or https URL.',
    )
  }

  validatePrimaryAction(config, errors)
  validateSocialLinks(config.socialLinks, errors)
  validateColorOverrides(config, errors)

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function assertValidCardConfig(config: CardConfig): void {
  const result = validateCardConfig(config)

  if (result.isValid) {
    return
  }

  throw new Error(
    `Invalid digital card configuration:\n${result.errors
      .map((error) => `- ${error}`)
      .join('\n')}`,
  )
}