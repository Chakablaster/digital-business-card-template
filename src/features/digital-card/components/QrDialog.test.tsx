import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { QrDialog } from './QrDialog'

const dialogProps = {
  isOpen: true,
  url: 'https://example.com/card',
  title: 'Share This Card',
  description: 'Scan the QR code to open this card.',
  themeStyles: {},
  onClose: vi.fn(),
}

describe('QrDialog', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <QrDialog {...dialogProps} isOpen={false} />,
    )

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders an accessible dialog with its configured content', () => {
    render(<QrDialog {...dialogProps} />)

    const dialog = screen.getByRole('dialog', {
      name: 'Share This Card',
    })

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(
      screen.getByText('Scan the QR code to open this card.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('https://example.com/card'),
    ).toBeInTheDocument()
  })

  it('moves focus to the close button when opened', async () => {
    render(<QrDialog {...dialogProps} />)

    const closeButton = screen.getByRole('button', {
      name: 'Close QR code',
    })

    await waitFor(() => {
      expect(closeButton).toHaveFocus()
    })
  })

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<QrDialog {...dialogProps} onClose={onClose} />)

    await user.click(
      screen.getByRole('button', { name: 'Close QR code' }),
    )

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<QrDialog {...dialogProps} onClose={onClose} />)

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes when the backdrop is pressed', () => {
    const onClose = vi.fn()

    render(<QrDialog {...dialogProps} onClose={onClose} />)

    const dialog = screen.getByRole('dialog')
    const backdrop = dialog.parentElement

    expect(backdrop).not.toBeNull()

    fireEvent.mouseDown(backdrop as HTMLElement)

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not close when the dialog content is pressed', () => {
    const onClose = vi.fn()

    render(<QrDialog {...dialogProps} onClose={onClose} />)

    fireEvent.mouseDown(screen.getByRole('dialog'))

    expect(onClose).not.toHaveBeenCalled()
  })

  it('works without an optional description', () => {
    render(
      <QrDialog
        {...dialogProps}
        description=""
      />,
    )

    const dialog = screen.getByRole('dialog', {
      name: 'Share This Card',
    })

    expect(dialog).not.toHaveAttribute('aria-describedby')
    expect(
      screen.queryByText('Scan the QR code to open this card.'),
    ).not.toBeInTheDocument()
  })
})