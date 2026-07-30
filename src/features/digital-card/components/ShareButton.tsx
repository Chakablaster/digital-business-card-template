import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  title: string
  text?: string
  url: string
  onFallback: () => void
}

function hasText(value?: string): value is string {
  return Boolean(value?.trim())
}

export function ShareButton({
  title,
  text,
  url,
  onFallback,
}: ShareButtonProps) {
  async function handleShare() {
    if (
      typeof navigator === 'undefined' ||
      typeof navigator.share !== 'function'
    ) {
      onFallback()
      return
    }

    try {
      await navigator.share({
        title: title.trim(),
        ...(hasText(text) ? { text: text.trim() } : {}),
        url,
      })
    } catch (error) {
      const wasCancelled =
        error instanceof DOMException && error.name === 'AbortError'

      if (!wasCancelled) {
        onFallback()
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-(--card-border) px-4 py-3 font-medium text-(--secondary-text) transition duration-200 hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--focus-ring)"
    >
      <Share2 aria-hidden="true" className="h-5 w-5" />
      <span>Share</span>
    </button>
  )
}