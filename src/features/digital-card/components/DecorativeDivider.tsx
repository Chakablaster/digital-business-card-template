interface DecorativeDividerProps {
  imagePath?: string
}

export function DecorativeDivider({
  imagePath,
}: DecorativeDividerProps) {
  const resolvedImagePath = imagePath?.trim()

  if (!resolvedImagePath) {
    return null
  }

  return (
    <div className="my-6 flex justify-center" aria-hidden="true">
      <img
        src={resolvedImagePath}
        alt=""
        className="max-h-12 max-w-full object-contain"
      />
    </div>
  )
}