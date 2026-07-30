const LOCAL_FALLBACK_URL = 'http://localhost/'

function removeFragment(url: string): string {
  try {
    const parsedUrl = new URL(url)
    parsedUrl.hash = ''

    return parsedUrl.toString()
  } catch {
    return LOCAL_FALLBACK_URL
  }
}

export function resolveCardUrl(
  configuredUrl?: string,
  currentUrl?: string,
): string {
  const trimmedConfiguredUrl = configuredUrl?.trim()

  if (trimmedConfiguredUrl) {
    return trimmedConfiguredUrl
  }

  const browserUrl =
    currentUrl?.trim() ||
    (typeof window !== 'undefined' ? window.location.href : '')

  if (!browserUrl) {
    return LOCAL_FALLBACK_URL
  }

  return removeFragment(browserUrl)
}