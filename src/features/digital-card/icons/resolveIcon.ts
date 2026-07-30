import type {
  IconName,
  KnownIconName,
} from '../types/card.types'
import {
  iconRegistry,
  type CardIconComponent,
} from './iconRegistry'

const iconAliases: Record<string, KnownIconName> = {
  'generic-link': 'link',
  genericlink: 'link',
  twitter: 'x',
  web: 'website',
  cv: 'resume',
}

export function normalizeIconName(iconName: IconName): KnownIconName {
  const normalizedName = iconName
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')

  const resolvedName = iconAliases[normalizedName] ?? normalizedName

  if (Object.prototype.hasOwnProperty.call(iconRegistry, resolvedName)) {
    return resolvedName as KnownIconName
  }

  return 'link'
}

export function resolveIcon(iconName: IconName): CardIconComponent {
  return iconRegistry[normalizeIconName(iconName)]
}