import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { ShareCard } from '@/features/digital-card/components/ShareCard'
import type { CardMetadata, QrCodeConfig } from '@/features/digital-card/types/card.types'

const metadata: CardMetadata = {
  pageTitle: 'Digital Business Card',
  pageDescription: 'View my digital business card.',
}

const qrCode: QrCodeConfig = {
  cardUrl: 'https://example.com/card',
  dialogTitle: 'Share This Card',
  dialogDescription: 'Scan the QR code to open this card.',
}

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
})

describe('ShareCard', () => {
  it('opens the QR dialog from the QR Code button', async () => {
    const user = userEvent.setup()

    render(
      <ShareCard
        metadata={metadata}
        qrCode={qrCode}
        themeStyles={{}}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'QR Code' }),
    )

    expect(
      screen.getByRole('dialog', { name: 'Share This Card' }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('https://example.com/card'),
    ).toBeInTheDocument()
  })

  it('uses the QR dialog as the fallback when native sharing is unavailable', async () => {
    const user = userEvent.setup()

    setNavigatorShare(undefined)

    render(
      <ShareCard
        metadata={metadata}
        qrCode={qrCode}
        themeStyles={{}}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'Share' }),
    )

    expect(
      screen.getByRole('dialog', { name: 'Share This Card' }),
    ).toBeInTheDocument()
  })

  it('closes the QR dialog from its close button', async () => {
    const user = userEvent.setup()

    render(
      <ShareCard
        metadata={metadata}
        qrCode={qrCode}
        themeStyles={{}}
      />,
    )

    await user.click(
      screen.getByRole('button', { name: 'QR Code' }),
    )

    await user.click(
      screen.getByRole('button', { name: 'Close QR code' }),
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})