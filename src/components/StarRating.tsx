// src/components/StarRating.tsx
import { useId } from 'react'

interface Props {
  value: number // current rating (0 = no rating)
  onChange?: (v: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_CLASS: Record<NonNullable<Props['size']>, string> = {
  sm: 'rating-sm',
  md: 'rating-md',
  lg: 'rating-lg',
}

export default function StarRating({ value, onChange, readonly = false, size = 'sm' }: Props) {
  const id = useId()

  return (
    <div className={`rating ${SIZE_CLASS[size]}`}>
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
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        />
      ))}
    </div>
  )
}
