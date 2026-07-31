import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ShareButton } from '@/features/digital-card/components/ShareButton'

function setNavigatorShare(
  shareFunction: ((data?: ShareData) => Promise<void>) | undefined,
) {
  Object.defineProperty(window.navigator, 'share', {
    configurable: true,
    value: shareFunction,
  })
}

afterEach(() => {
  setNavigatorShare(undefined)
  vi.restoreAllMocks()
})

describe('ShareButton', () => {
  it('uses the Web Share API when it is available', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockResolvedValue(undefined)
    const onFallback = vi.fn()

    setNavigatorShare(share)

    render(
      <ShareButton
        title="Digital Business Card"
        text="View my digital business card."
        url="https://example.com/card"
        onFallback={onFallback}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Share' }))

    expect(share).toHaveBeenCalledWith({
      title: 'Digital Business Card',
      text: 'View my digital business card.',
      url: 'https://example.com/card',
    })

    expect(onFallback).not.toHaveBeenCalled()
  })

  it('opens the fallback when the Web Share API is unavailable', async () => {
    const user = userEvent.setup()
    const onFallback = vi.fn()

    setNavigatorShare(undefined)

    render(
      <ShareButton
        title="Digital Business Card"
        url="https://example.com/card"
        onFallback={onFallback}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Share' }))

    expect(onFallback).toHaveBeenCalledOnce()
  })

  it('opens the fallback when sharing fails unexpectedly', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockRejectedValue(new Error('Sharing failed'))
    const onFallback = vi.fn()

    setNavigatorShare(share)

    render(
      <ShareButton
        title="Digital Business Card"
        url="https://example.com/card"
        onFallback={onFallback}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Share' }))

    expect(onFallback).toHaveBeenCalledOnce()
  })

  it('does not open the fallback when the user cancels sharing', async () => {
    const user = userEvent.setup()
    const share = vi
      .fn()
      .mockRejectedValue(new DOMException('Share cancelled', 'AbortError'))
    const onFallback = vi.fn()

    setNavigatorShare(share)

    render(
      <ShareButton
        title="Digital Business Card"
        url="https://example.com/card"
        onFallback={onFallback}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Share' }))

    expect(onFallback).not.toHaveBeenCalled()
  })

  it('omits empty optional share text', async () => {
    const user = userEvent.setup()
    const share = vi.fn().mockResolvedValue(undefined)

    setNavigatorShare(share)

    render(
      <ShareButton
        title="Digital Business Card"
        text="   "
        url="https://example.com/card"
        onFallback={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Share' }))

    expect(share).toHaveBeenCalledWith({
      title: 'Digital Business Card',
      url: 'https://example.com/card',
    })
  })
})