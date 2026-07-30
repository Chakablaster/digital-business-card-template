import type { PrimaryActionConfig } from '../types/card.types'
import { resolveIcon } from '../icons/resolveIcon'
import { resolveLinkTarget } from '../utils/resolveLinkTarget'

interface PrimaryActionProps {
  action: PrimaryActionConfig
}

function hasText(value?: string): value is string {
  return Boolean(value?.trim())
}

export function PrimaryAction({ action }: PrimaryActionProps) {
  if (!hasText(action.label) || !hasText(action.href)) {
    return null
  }

  const Icon = resolveIcon(action.icon)
  const linkTarget = resolveLinkTarget(action.href)

  return (
    <a
      href={action.href.trim()}
      {...linkTarget}
      className="mt-7 flex w-full items-center gap-4 rounded-2xl bg-(--primary-action-background) px-5 py-4 text-left text-(--primary-action-text) transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--focus-ring)"
    >
      <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />

      <span className="min-w-0">
        <span className="block font-semibold">{action.label.trim()}</span>

        {hasText(action.supportingText) && (
          <span className="mt-0.5 block truncate text-sm opacity-80">
            {action.supportingText.trim()}
          </span>
        )}
      </span>
    </a>
  )
}