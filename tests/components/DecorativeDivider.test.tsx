import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DecorativeDivider } from '@/features/digital-card/components/DecorativeDivider'

describe('DecorativeDivider', () => {
  it('renders the configured divider image', () => {
    const { container } = render(
      <DecorativeDivider imagePath="/assets/divider.png" />,
    )

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/divider.png',
    )
  })

  it('trims surrounding whitespace from the image path', () => {
    const { container } = render(
      <DecorativeDivider imagePath="  /assets/divider.png  " />,
    )

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/assets/divider.png',
    )
  })

  it('renders nothing when the image path is empty', () => {
    const { container } = render(
      <DecorativeDivider imagePath="" />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when no image path is provided', () => {
    const { container } = render(<DecorativeDivider />)

    expect(container).toBeEmptyDOMElement()
  })
})