export const THEME_PRESETS = [
  'light',
  'dark',
  'slate-blue',
  'warm-sand',
  'forest',
] as const

export type ThemePreset = (typeof THEME_PRESETS)[number]

export const KNOWN_ICON_NAMES = [
  'linkedin',
  'github',
  'instagram',
  'facebook',
  'x',
  'threads',
  'tiktok',
  'snapchat',
  'reddit',
  'pinterest',
  'whatsapp',
  'telegram',
  'discord',
  'messenger',
  'viber',
  'youtube',
  'twitch',
  'spotify',
  'soundcloud',
  'website',
  'email',
  'phone',
  'location',
  'portfolio',
  'blog',
  'resume',
  'calendar',
  'link',
] as const

export type KnownIconName = (typeof KNOWN_ICON_NAMES)[number]

type CustomIconName = string & {
  readonly __customIconName?: never
}

export type IconName = KnownIconName | CustomIconName

export interface CardMetadata {
  pageTitle: string
  pageDescription: string
}

export interface CardProfile {
  fullName: string
  profileImage: string
  nickname?: string
  role: string
  descriptor?: string
  bio?: string
}

export interface PrimaryActionConfig {
  icon: IconName
  label: string
  supportingText?: string
  href: string
}

export interface SocialLinkConfig {
  platform: IconName
  label: string
  href: string
}

export interface QrCodeConfig {
  cardUrl?: string
}

export interface ThemeColorOverrides {
  pageBackground?: string
  cardBackground?: string
  primaryText?: string
  secondaryText?: string
  mutedText?: string
  border?: string
  accent?: string
  accentText?: string
  primaryActionBackground?: string
  primaryActionText?: string
  dialogBackground?: string
  focusRing?: string
}

export interface CardAppearance {
  preset: ThemePreset
  colorOverrides?: ThemeColorOverrides
  backgroundImage?: string
  dividerImage?: string
}

export interface CardConfig {
  metadata: CardMetadata
  profile: CardProfile
  primaryAction: PrimaryActionConfig
  socialLinks: SocialLinkConfig[]
  qrCode: QrCodeConfig
  appearance: CardAppearance
}