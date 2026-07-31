import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DigitalCard } from '@/features/digital-card/components/DigitalCard'

describe('DigitalCard', () => {
  it('renders profile content from the central configuration', () => {
    render(<DigitalCard />)

    expect(
      screen.getByRole('heading', { name: 'Your Name' }),
    ).toBeInTheDocument()

    expect(screen.getByText('Your Role')).toBeInTheDocument()

    expect(
      screen.getByText('A short description about what you do'),
    ).toBeInTheDocument()
  })

  it('applies the selected theme as CSS custom properties', () => {
    render(<DigitalCard />)

    const main = screen.getByRole('main')

    expect(main.style.getPropertyValue('--page-background')).toBe('#eef2f7')
    expect(main.style.getPropertyValue('--card-background')).toBe('#ffffff')
    expect(main.style.getPropertyValue('--primary-text')).toBe('#111827')
    expect(main.style.getPropertyValue('--accent')).toBe('#2563eb')
  })
})