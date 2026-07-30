import type { CSSProperties } from 'react'
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import QRCode from 'react-qr-code'

interface QrDialogProps {
  isOpen: boolean
  url: string
  title: string
  description?: string
  themeStyles: CSSProperties
  onClose: () => void
}

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function hasText(value?: string): value is string {
  return Boolean(value?.trim())
}

export function QrDialog({
  isOpen,
  url,
  title,
  description,
  themeStyles,
  onClose,
}: QrDialogProps) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const dialog = dialogRef.current

      if (!dialog) {
        return
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
      previouslyFocusedElementRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      style={themeStyles}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasText(description) ? descriptionId : undefined}
        className="relative w-full max-w-sm rounded-3xl border border-(--card-border) bg-(--dialog-background) p-6 text-center shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close QR code"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-(--secondary-text) transition hover:bg-black/10 hover:text-(--primary-text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring)"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>

        <div className="pr-10">
          <h2
            id={titleId}
            className="text-xl font-semibold text-(--primary-text)"
          >
            {title.trim()}
          </h2>

          {hasText(description) && (
            <p
              id={descriptionId}
              className="mt-2 text-sm leading-6 text-(--muted-text)"
            >
              {description.trim()}
            </p>
          )}
        </div>

        <div className="mx-auto mt-6 w-fit rounded-2xl bg-white p-4 shadow-sm">
          <QRCode
            value={url}
            size={208}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
          />
        </div>

        <p className="mt-4 break-all text-xs leading-5 text-(--muted-text)">
          {url}
        </p>
      </div>
    </div>,
    document.body,
  )
}