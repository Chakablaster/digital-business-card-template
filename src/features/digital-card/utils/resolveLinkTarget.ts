export interface LinkTargetAttributes {
  target?: '_blank'
  rel?: 'noopener noreferrer'
}

export function resolveLinkTarget(href: string): LinkTargetAttributes {
  const normalizedHref = href.trim().toLowerCase()

  const shouldStayInCurrentContext =
    normalizedHref.startsWith('mailto:') ||
    normalizedHref.startsWith('tel:') ||
    normalizedHref.startsWith('/') ||
    normalizedHref.startsWith('#')

  if (shouldStayInCurrentContext) {
    return {}
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  }
}