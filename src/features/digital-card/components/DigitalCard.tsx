import type { CSSProperties } from 'react'

import cardConfig from '../../../config/card.config'
import { resolveTheme } from '../themes/resolveTheme'
import type { ThemeTokens } from '../themes/themePresets'
import { PrimaryAction } from './PrimaryAction'
import { ProfileSection } from './ProfileSection'
import { ShareCard } from './ShareCard'
import { SocialLinks } from './SocialLinks'

type ThemeStyles = CSSProperties & Record<`--${string}`, string>

function createThemeStyles(theme: ThemeTokens): ThemeStyles {
  return {
    '--page-background': theme.pageBackground,
    '--card-background': theme.cardBackground,
    '--primary-text': theme.primaryText,
    '--secondary-text': theme.secondaryText,
    '--muted-text': theme.mutedText,
    '--card-border': theme.border,
    '--accent': theme.accent,
    '--accent-text': theme.accentText,
    '--primary-action-background': theme.primaryActionBackground,
    '--primary-action-text': theme.primaryActionText,
    '--dialog-background': theme.dialogBackground,
    '--focus-ring': theme.focusRing,
  }
}

export function DigitalCard() {
  const theme = resolveTheme(cardConfig.appearance)
  const themeStyles = createThemeStyles(theme)
  const backgroundImage = cardConfig.appearance.backgroundImage.trim()

  return (
    <main
      className="flex min-h-dvh items-center justify-center bg-(--page-background) px-4 py-8"
      style={{
        ...themeStyles,
        ...(backgroundImage
          ? {
              backgroundImage: `url("${backgroundImage}")`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : {}),
      }}
    >
      <article className="w-full max-w-md rounded-3xl border border-(--card-border) bg-(--card-background) px-6 py-8 shadow-xl sm:px-8">
        <ProfileSection profile={cardConfig.profile} />
        <PrimaryAction action={cardConfig.primaryAction} />
        <SocialLinks links={cardConfig.socialLinks} />

        <ShareCard
          metadata={cardConfig.metadata}
          qrCode={cardConfig.qrCode}
          themeStyles={themeStyles}
        />
      </article>
    </main>
  )
}