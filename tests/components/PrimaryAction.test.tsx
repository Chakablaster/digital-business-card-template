import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PrimaryAction } from '@/features/digital-card/components/PrimaryAction'
import type { PrimaryActionConfig } from '@/features/digital-card/types/card.types'

const emailAction: PrimaryActionConfig = {
  icon: 'email',
  label: 'Contact Me',
  supportingText: 'hello@example.com',
  href: 'mailto:hello@example.com',
}

describe('PrimaryAction', () => {
  it('renders its label, supporting text, and destination', () => {
    render(<PrimaryAction action={emailAction} />)

    const link = screen.getByRole('link', { name: /contact me/i })

    expect(link).toHaveAttribute('href', 'mailto:hello@example.com')
    expect(screen.getByText('hello@example.com')).toBeInTheDocument()
  })

  it('does not open email links in a new tab', () => {
    render(<PrimaryAction action={emailAction} />)

    const link = screen.getByRole('link', { name: /contact me/i })

    expect(link).not.toHaveAttribute('target')
    expect(link).not.toHaveAttribute('rel')
  })

  it('opens external web links safely in a new tab', () => {
    const websiteAction: PrimaryActionConfig = {
      icon: 'website',
      label: 'Visit My Website',
      supportingText: 'example.com',
      href: 'https://example.com',
    }

    render(<PrimaryAction action={websiteAction} />)

    const link = screen.getByRole('link', {
      name: /visit my website/i,
    })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('hides optional supporting text when it is empty', () => {
    const actionWithoutSupportingText: PrimaryActionConfig = {
      ...emailAction,
      supportingText: '',
    }

    render(<PrimaryAction action={actionWithoutSupportingText} />)

    expect(screen.queryByText('hello@example.com')).not.toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Contact Me' }),
    ).toBeInTheDocument()
  })

  it('does not render an incomplete action', () => {
    const incompleteAction: PrimaryActionConfig = {
      ...emailAction,
      href: '',
    }

    const { container } = render(
      <PrimaryAction action={incompleteAction} />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})