import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { CardProfile } from '../types/card.types'
import { ProfileSection } from './ProfileSection'

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
    render(<ProfileSection profile={completeProfile} />)

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