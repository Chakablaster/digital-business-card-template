import { useEffect } from 'react'

interface PageMetadata {
  pageTitle: string
  pageDescription: string
}

const DESCRIPTION_SELECTOR = 'meta[name="description"]'

export function usePageMetadata({
  pageTitle,
  pageDescription,
}: PageMetadata) {
  useEffect(() => {
    const title = pageTitle.trim()
    const description = pageDescription.trim()

    if (title) {
      document.title = title
    }

    let descriptionElement =
      document.querySelector<HTMLMetaElement>(DESCRIPTION_SELECTOR)

    if (!descriptionElement) {
      descriptionElement = document.createElement('meta')
      descriptionElement.name = 'description'
      document.head.appendChild(descriptionElement)
    }

    descriptionElement.content = description
  }, [pageDescription, pageTitle])
}