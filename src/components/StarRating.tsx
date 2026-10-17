import { StarIcon } from './icons'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  size?: string
}

export default function StarRating({ value, onChange, size = 'w-8 h-8' }: StarRatingProps) {
  const readOnly = !onChange

  return (
    <div className="flex items-center gap-1" role={readOnly ? 'img' : 'group'} aria-label={`คะแนน ${value.toFixed(1)} จาก 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, value - (i - 1)))
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <StarIcon className={`${size} absolute inset-0 text-base-content/20`} />
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <StarIcon className={`${size} text-[#D4A70F]`} />
            </span>
            {onChange && (
              <>
                <button
                  type="button"
                  className="absolute left-0 top-0 h-full w-1/2"
                  onClick={() => onChange(i - 0.5)}
                  aria-label={`${i - 0.5} ดาว`}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full w-1/2"
                  onClick={() => onChange(i)}
                  aria-label={`${i} ดาว`}
                />
              </>
            )}
          </span>
        )
      })}
    </div>
  )
}