// src/components/ErrorState.tsx
interface Props {
  message: string
  onRetry: () => void
  isRetrying?: boolean
}

export default function ErrorState({ message, onRetry, isRetrying = false }: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <span className="text-5xl" aria-hidden="true">🥔💥</span>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-base-content">โหลดข้อมูลไม่สำเร็จ</p>
        <p className="text-sm text-base-content/60 max-w-sm">{message}</p>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={onRetry}
        disabled={isRetrying}
      >
        {isRetrying && <span className="loading loading-spinner loading-xs" />}
        ลองใหม่อีกครั้ง
      </button>
    </div>
  )
}
