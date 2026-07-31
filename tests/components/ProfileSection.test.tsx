import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProfileSection } from '@/features/digital-card/components/ProfileSection'
import type { CardProfile } from '@/features/digital-card/types/card.types'

const completeProfile: CardProfile = {
  fullName: 'Alex Morgan',
  profileImage: '/assets/profile.jpg',
  nickname: 'Alex',
  role: 'Product Designer',
  descriptor: 'Designing thoughtful digital experiences',
  bio: 'I create accessible products that balance clarity, usability, and visual polish.',
}

describe('ProfileSection', () => {
  it('renders the complete profile configuration', () => {
    render(
      <ProfileSection
        profile={completeProfile}
        backgroundImage="/assets/background.jpg"
        dividerImage="/assets/divider.png"
      />,
    )

    expect(
      screen.getByRole('heading', { name: /alex morgan/i }),
    ).toBeInTheDocument()

    expect(screen.getByText('(Alex)')).toBeInTheDocument()
    expect(screen.getByText('Product Designer')).toBeInTheDocument()

    expect(
      screen.getByText('Designing thoughtful digital experiences'),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'I create accessible products that balance clarity, usability, and visual polish.',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('img', { name: 'Alex Morgan profile' }),
    ).toHaveAttribute('src', '/assets/profile.jpg')
  })

  it('shows the configured cover background', () => {
    const { container } = render(
      <ProfileSection
        profile={completeProfile}
        backgroundImage="/assets/background.jpg"
      />,
    )

    const cover = container.querySelector(
      'section > div[aria-hidden="true"]',
    )

    expect(cover).toHaveStyle({
      backgroundImage: 'url("/assets/background.jpg")',
    })
  })

  it('shows the divider before the bio', () => {
    const { container } = render(
      <ProfileSection
        profile={completeProfile}
        dividerImage="/assets/divider.png"
      />,
    )

    const divider = container.querySelector(
      'img[src="/assets/divider.png"]',
    )

    const bio = screen.getByText(
      'I create accessible products that balance clarity, usability, and visual polish.',
    )

    if (!divider) {
      throw new Error('Expected the profile divider to be rendered.')
    }

    expect(
      divider.compareDocumentPosition(bio) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('hides empty optional profile fields', () => {
    const minimalProfile: CardProfile = {
      fullName: 'Alex Morgan',
      profileImage: '/assets/profile.jpg',
      nickname: '',
      role: 'Product Designer',
      descriptor: '',
      bio: '',
    }

    render(<ProfileSection profile={minimalProfile} />)

    expect(screen.queryByText('(Alex)')).not.toBeInTheDocument()

    expect(
      screen.queryByText('Designing thoughtful digital experiences'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText(
        'I create accessible products that balance clarity, usability, and visual polish.',
      ),
    ).not.toBeInTheDocument()
  })
})