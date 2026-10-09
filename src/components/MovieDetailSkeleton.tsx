// src/components/MovieDetailSkeleton.tsx
export default function MovieDetailSkeleton() {
  return (
    <div
      className="max-w-3xl mx-auto animate-pulse space-y-6"
      aria-busy="true"
      aria-label="กำลังโหลดรายละเอียดหนัง"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-3/4 rounded bg-base-300" />
        <div className="h-5 w-16 rounded bg-base-300" />
      </div>
      <div className="mx-auto w-48 sm:w-60 aspect-[2/3] rounded-lg bg-base-300" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-base-300" />
        <div className="h-4 w-full rounded bg-base-300" />
        <div className="h-4 w-5/6 rounded bg-base-300" />
        <div className="h-4 w-2/3 rounded bg-base-300" />
      </div>
    </div>
  )
}
