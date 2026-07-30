import type { CardProfile } from '../types/card.types'

interface ProfileSectionProps {
  profile: CardProfile
}

function hasText(value?: string): value is string {
  return Boolean(value?.trim())
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <img
        src={profile.profileImage}
        alt={`${profile.fullName} profile`}
        className="h-36 w-36 rounded-full border-4 border-(--card-border) object-cover shadow-lg"
      />

      <div className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-(--primary-text)">
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

        {hasText(profile.bio) && (
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-(--muted-text)">
            {profile.bio}
          </p>
        )}
      </div>
    </section>
  )
}