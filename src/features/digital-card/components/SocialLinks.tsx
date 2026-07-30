import { resolveIcon } from '../icons/resolveIcon'
import type { SocialLinkConfig } from '../types/card.types'
import { resolveLinkTarget } from '../utils/resolveLinkTarget'

interface SocialLinksProps {
  links: SocialLinkConfig[]
}

function isCompleteLink(link: SocialLinkConfig): boolean {
  return Boolean(link.label.trim() && link.href.trim())
}

export function SocialLinks({ links }: SocialLinksProps) {
  const visibleLinks = links.filter(isCompleteLink)

  if (visibleLinks.length === 0) {
    return null
  }

  return (
    <nav className="mt-7" aria-label="Social links">
      <ul className="flex flex-wrap justify-center gap-3">
        {visibleLinks.map((link, index) => {
          const Icon = resolveIcon(link.platform)
          const href = link.href.trim()
          const label = link.label.trim()
          const linkTarget = resolveLinkTarget(href)

          return (
            <li key={`${link.platform}-${href}-${index}`}>
              <a
                href={href}
                aria-label={label}
                {...linkTarget}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-(--card-border) text-(--secondary-text) transition duration-200 hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--focus-ring)"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}