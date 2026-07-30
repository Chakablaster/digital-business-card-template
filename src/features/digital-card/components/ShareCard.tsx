import type { CSSProperties } from 'react'
import { useState } from 'react'
import { QrCode } from 'lucide-react'

import type {
  CardMetadata,
  QrCodeConfig,
} from '../types/card.types'
import { resolveCardUrl } from '../utils/resolveCardUrl'
import { QrDialog } from './QrDialog'
import { ShareButton } from './ShareButton'

interface ShareCardProps {
  metadata: CardMetadata
  qrCode: QrCodeConfig
  themeStyles: CSSProperties
}

export function ShareCard({
  metadata,
  qrCode,
  themeStyles,
}: ShareCardProps) {
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false)
  const cardUrl = resolveCardUrl(qrCode.cardUrl)

  return (
    <>
      <section
        className="mt-7 flex gap-3"
        aria-label="Card sharing options"
      >
        <ShareButton
          title={metadata.pageTitle}
          text={metadata.pageDescription}
          url={cardUrl}
          onFallback={() => setIsQrDialogOpen(true)}
        />

        <button
          type="button"
          onClick={() => setIsQrDialogOpen(true)}
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-(--card-border) px-4 py-3 font-medium text-(--secondary-text) transition duration-200 hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--focus-ring)"
        >
          <QrCode aria-hidden="true" className="h-5 w-5" />
          <span>QR Code</span>
        </button>
      </section>

      <QrDialog
        isOpen={isQrDialogOpen}
        url={cardUrl}
        title={qrCode.dialogTitle}
        description={qrCode.dialogDescription}
        themeStyles={themeStyles}
        onClose={() => setIsQrDialogOpen(false)}
      />
    </>
  )
}