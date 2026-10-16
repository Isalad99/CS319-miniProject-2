import { useMemo } from 'react'
import { Link } from 'react-router'
import WatchlistCard from '../components/WatchlistCard'
import { useWatchlistStore } from '../store/useWatchlistStore'

export default function WatchlistPage() {
  // เลือก object ตรง ๆ แล้วค่อยแปลงนอก selector กัน re-render วนไม่จบ
  const watchlist = useWatchlistStore((s) => s.watchlist)
  const items = useMemo(
    () => Object.values(watchlist).sort((a, b) => b.addedAt - a.addedAt),
    [watchlist],
  )

  return (
    <section aria-label="Watch list" className="space-y-4">
      <div>
      <h1 className="text-xl font-bold text-base-content">Watch lists</h1>
      <p className="text-sm text-base-content/60">Your personal watch list</p>
      </div>
      {items.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <p className="text-base-content/70">ยังไม่มีหนังใน Watch list</p>
          <Link to="/" className="btn btn-sm btn-secondary">
            ไปเลือกหนัง
          </Link>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 sm:gap-6">
          {items.map((item) => (
            <WatchlistCard key={item.imdbID} item={item} />
          ))}
        </ul>
      )}
    </section>
  )
}