import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SocialLinks } from '@/features/digital-card/components/SocialLinks'
import type { SocialLinkConfig } from '@/features/digital-card/types/card.types'

const links: SocialLinkConfig[] = [
  {
    platform: 'github',
    label: 'GitHub',
    href: 'https://github.com/example',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/example',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/example',
  },
]

describe('SocialLinks', () => {
  it('renders links in their configured order', () => {
    render(<SocialLinks links={links} />)

    const navigation = screen.getByRole('navigation', {
      name: 'Social links',
    })

    const renderedLinks = within(navigation).getAllByRole('link')

    expect(renderedLinks).toHaveLength(3)
    expect(renderedLinks[0]).toHaveAccessibleName('GitHub')
    expect(renderedLinks[1]).toHaveAccessibleName('LinkedIn')
    expect(renderedLinks[2]).toHaveAccessibleName('Instagram')
  })

  it('removes entries with an empty label or destination', () => {
    const incompleteLinks: SocialLinkConfig[] = [
      ...links,
      {
        platform: 'facebook',
        label: '',
        href: 'https://facebook.com/example',
      },
      {
        platform: 'youtube',
        label: 'YouTube',
        href: '',
      },
    ]

    render(<SocialLinks links={incompleteLinks} />)

    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(
      screen.queryByRole('link', { name: 'Facebook' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'YouTube' }),
    ).not.toBeInTheDocument()
  })

  it('opens external links safely in a new tab', () => {
    render(<SocialLinks links={links} />)

    const githubLink = screen.getByRole('link', { name: 'GitHub' })

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/example',
    )
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    )
  })

  it('still renders unsupported platforms using the icon fallback', () => {
    const unsupportedLink: SocialLinkConfig = {
      platform: 'custom-community',
      label: 'Community',
      href: 'https://example.com/community',
    }

    render(<SocialLinks links={[unsupportedLink]} />)

    expect(
      screen.getByRole('link', { name: 'Community' }),
    ).toBeInTheDocument()
  })

  it('renders nothing when no complete links exist', () => {
    const emptyLinks: SocialLinkConfig[] = [
      {
        platform: 'github',
        label: '',
        href: '',
      },
    ]

    const { container } = render(<SocialLinks links={emptyLinks} />)

    expect(container).toBeEmptyDOMElement()
  })
})