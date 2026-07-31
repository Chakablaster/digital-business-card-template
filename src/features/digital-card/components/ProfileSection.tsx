import type { CardProfile } from '../types/card.types'
import { DecorativeDivider } from './DecorativeDivider'

interface ProfileSectionProps {
  profile: CardProfile
  backgroundImage?: string
  dividerImage?: string
}

function hasText(value?: string): value is string {
  return Boolean(value?.trim())
}

export function ProfileSection({
  profile,
  backgroundImage,
  dividerImage,
}: ProfileSectionProps) {
  const resolvedBackgroundImage = backgroundImage?.trim()

  return (
    <section className="text-center">
      <div
        className="h-52 bg-(--page-background) bg-cover bg-center"
        style={
          resolvedBackgroundImage
            ? {
                backgroundImage: `url("${resolvedBackgroundImage}")`,
              }
            : undefined
        }
        aria-hidden="true"
      />

      <div className="-mt-20 px-6 sm:px-8">
        <img
          src={profile.profileImage}
          alt={`${profile.fullName} profile`}
          className="mx-auto h-40 w-40 rounded-full border-4 border-(--card-background) object-cover shadow-lg"
        />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-(--primary-text)">
          {profile.fullName}

          {hasText(profile.nickname) && (
            <span className="ml-2 text-(--secondary-text)">
              ({profile.nickname})
            </span>
          )}
        </h1>

        <p className="mt-2 text-lg font-medium text-(--accent)">
          {profile.role}
        </p>

        {hasText(profile.descriptor) && (
          <p className="mt-1 text-sm text-(--secondary-text)">
            {profile.descriptor}
          </p>
        )}

        <DecorativeDivider imagePath={dividerImage} />

        {hasText(profile.bio) && (
          <p className="mx-auto max-w-md text-sm leading-6 text-(--muted-text)">
            {profile.bio}
          </p>
        )}
      </div>
    </section>
  )
}