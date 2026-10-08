// src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden bg-accent shadow-sm animate-pulse">
      {/* Poster placeholder */}
      <div className="aspect-[3/4] bg-accent-content/10" />
      {/* Title bar */}
      <div className="px-2 py-1.5">
        <div className="h-3 bg-accent-content/20 rounded w-3/4" />
      </div>
    </div>
  )
}
