interface IconProps {
  className?: string
}

export function BookmarkCheckIcon({
  className = 'w-6 h-7',
  checkColor = '#B0BA99',
}: IconProps & { checkColor?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2 2h20v28l-10-7-10 7V2z" />
      <path d="M7 12l3.5 3.5L17 9" fill="none" stroke={checkColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EyeIcon({ watched, className = 'w-7 h-7' }: IconProps & { watched: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
      {watched ? (
        <circle cx="12" cy="12" r="3.5" fill="currentColor" />
      ) : (
        <>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M4 20L20 4" />
        </>
      )}
    </svg>
  )
}


export function ReviewIcon({ filled, className = 'w-7 h-7' }: IconProps & { filled: boolean }) {
  return (
    <svg viewBox="0 0 28 26" className={className} aria-hidden="true">
      <path
        d="M3 2h22a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H12l-6 5v-5H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 5l1.6 3.4L19 10l-3.4 1.6L14 15l-1.6-3.4L9 10l3.4-1.6z"
        fill={filled ? '#B0BA99' : 'currentColor'}
      />
    </svg>
  )
}

export function StarIcon({ className = 'w-8 h-8' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    </svg>
  )
}