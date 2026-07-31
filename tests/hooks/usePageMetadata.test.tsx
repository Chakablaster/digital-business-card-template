import { render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { usePageMetadata } from '@/hooks/usePageMetadata'
interface TestComponentProps {
  pageTitle: string
  pageDescription: string
}

function TestComponent({
  pageTitle,
  pageDescription,
}: TestComponentProps) {
  usePageMetadata({ pageTitle, pageDescription })

  return null
}

afterEach(() => {
  document.title = ''

  document
    .querySelector('meta[name="description"]')
    ?.remove()
})

describe('usePageMetadata', () => {
  it('updates the document title and description', async () => {
    render(
      <TestComponent
        pageTitle="Alex Morgan | Digital Business Card"
        pageDescription="View Alex Morgan's digital business card."
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe(
        'Alex Morgan | Digital Business Card',
      )

      expect(
        document.querySelector('meta[name="description"]'),
      ).toHaveAttribute(
        'content',
        "View Alex Morgan's digital business card.",
      )
    })
  })

  it('creates the description element when it does not exist', async () => {
    expect(
      document.querySelector('meta[name="description"]'),
    ).not.toBeInTheDocument()

    render(
      <TestComponent
        pageTitle="Digital Business Card"
        pageDescription="A customizable digital business card."
      />,
    )

    await waitFor(() => {
      expect(
        document.querySelector('meta[name="description"]'),
      ).toBeInTheDocument()
    })
  })

  it('trims surrounding whitespace from metadata values', async () => {
    render(
      <TestComponent
        pageTitle="  Digital Business Card  "
        pageDescription="  A customizable card.  "
      />,
    )

    await waitFor(() => {
      expect(document.title).toBe('Digital Business Card')

      expect(
        document.querySelector('meta[name="description"]'),
      ).toHaveAttribute('content', 'A customizable card.')
    })
  })
})