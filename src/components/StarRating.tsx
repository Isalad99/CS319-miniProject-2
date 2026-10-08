// src/components/StarRating.tsx
import { useId } from 'react'

interface Props {
  value: number            // current rating (0 = no rating)
  onChange?: (v: number) => void
  readonly?: boolean
}

export default function StarRating({ value, onChange, readonly = false }: Props) {
  const id = useId()

  return (
    <div className="rating rating-sm" onClick={(e) => e.preventDefault()}>
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          id={`${id}-star-${star}`}
          type="radio"
          name={`rating-${id}`}
          className="mask mask-star-2 bg-warning"
          checked={star === value}
          onChange={() => onChange?.(star)}
          disabled={readonly}
          readOnly={!onChange}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        />
      ))}
    </div>
  )
}
