import { Link } from 'react-router'
import { useWatchlistStore, type WatchlistItem } from '../store/useWatchlistStore'

function BookmarkCheckIcon() {
  return (
    <svg viewBox="0 0 24 32" className="w-6 h-7" fill="currentColor" aria-hidden="true">
      <path d="M2 2h20v28l-10-7-10 7V2z" />
      <path d="M7 12l3.5 3.5L17 9" fill="none" stroke="#B0BA99" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EyeIcon({ watched }: { watched: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

export default function WatchlistCard({ item }: { item: WatchlistItem }) {
  const toggleWatched = useWatchlistStore((s) => s.toggleWatched)
  const removeFromWatchlist = useWatchlistStore((s) => s.removeFromWatchlist)

  return (
    <li className="rounded-xl bg-accent p-2 shadow-sm">
      <Link to={`/movie/${item.imdbID}`} className="block">
        <img
          src={item.Poster}
          alt={`โปสเตอร์ ${item.Title}`}
          className="w-full aspect-[2/3] object-cover rounded-sm"
          loading="lazy"
        />
      </Link>

      <div className="mt-2 flex items-center gap-1">
        <p className="flex-1 min-w-0 truncate text-xs text-neutral" title={item.Title}>
          {item.Title}
        </p>

        <button
          type="button"
          className="text-accent-content hover:opacity-70 transition-opacity"
          onClick={() => removeFromWatchlist(item.imdbID)}
          title="บันทึกไว้ใน Watch list (กดเพื่อเอาออก)"
          aria-label={`เอา ${item.Title} ออกจาก Watch list`}
        >
          <BookmarkCheckIcon />
        </button>

        <button
          type="button"
          className={`transition-opacity hover:opacity-70 ${
            item.watched ? 'text-accent-content' : 'text-accent-content/60'
          }`}
          onClick={() => toggleWatched(item.imdbID)}
          aria-pressed={item.watched}
          title={item.watched ? 'ดูแล้ว (กดเพื่อยกเลิก)' : 'ยังไม่ได้ดู (กดเพื่อทำเครื่องหมายว่าดูแล้ว)'}
          aria-label={item.watched ? 'ยกเลิกสถานะดูแล้ว' : 'ทำเครื่องหมายว่าดูแล้ว'}
        >
          <EyeIcon watched={item.watched} />
        </button>
      </div>
    </li>
  )
}