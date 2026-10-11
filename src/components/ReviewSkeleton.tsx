// src/components/ReviewSkeleton.tsx
export default function ReviewSkeleton() {
  return (
    <ul className="space-y-3 animate-pulse" aria-busy="true" aria-label="กำลังโหลดรีวิว">
      {[0, 1, 2].map((i) => (
        <li key={i} className="rounded-box border border-base-300 bg-base-100 p-4 space-y-4">
          <div className="h-4 w-3/4 rounded bg-base-300" />
          <div className="flex items-center justify-between gap-4">
            <div className="h-4 w-12 rounded bg-base-300" />
            <div className="flex items-center gap-2">
              <div className="h-3 w-24 rounded bg-base-300" />
              <div className="size-7 rounded-full bg-base-300" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
