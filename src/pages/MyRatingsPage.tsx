import './style.css'

import { useMemo } from 'react'
import { Link } from 'react-router'
import { EyeIcon, ReviewIcon } from '../components/icons'
import { useMyReviewStore } from '../store/useMyReviewStore'
import { useWatchlistStore, type WatchlistMovie } from '../store/useWatchlistStore'


interface Entry {
  movie: WatchlistMovie
  watched: boolean
  reviewed: boolean
  sortKey: number
}

export default function MyReviewPage() {
  const watchlist = useWatchlistStore((s) => s.watchlist)
  const setWatched = useWatchlistStore((s) => s.setWatched)
  const reviews = useMyReviewStore((s) => s.reviews)

  const entries = useMemo(() => {
    const map = new Map<string, Entry>()

    for (const w of Object.values(watchlist)) {
      if (!w.watched) continue
      map.set(w.imdbID, { movie: w, watched: true, reviewed: false, sortKey: w.addedAt })
    }
    for (const r of Object.values(reviews)) {
      map.set(r.imdbID, {
        movie: r,
        watched: watchlist[r.imdbID]?.watched ?? false,
        reviewed: true,
        sortKey: r.updatedAt,
      })
    }
    return [...map.values()].sort((a, b) => b.sortKey - a.sortKey)
  }, [watchlist, reviews])

  return (
    <section aria-label="My review" className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-base-content">My review</h1>
        <p className="text-sm text-base-content/60">Select watched movies to reviews</p>
      </div>

      {entries.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <p className="text-base-content/70">
            No watched or reviewed movies yet. Go to Watch list to mark movies as watched or write reviews.
          </p>
          <Link to="/watchlist" className="btn btn-sm btn-secondary">
            ไปที่ Watch list
          </Link>
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 sm:gap-6">
          {entries.map(({ movie, watched, reviewed }) => {
            const reviewPath = `/my-ratings/${movie.imdbID}`
            return (
              <li key={movie.imdbID} className="w-40 sm:w-44 rounded-xl bg-accent p-2 shadow-sm">
                <Link to={reviewPath} className="block">
                  <img
                    src={movie.Poster}
                    alt={`โปสเตอร์ ${movie.Title}`}
                    className="w-full aspect-[2/3] object-cover rounded-sm"
                    loading="lazy"
                  />
                </Link>

                <div className="mt-2 flex items-center gap-1">
                  <Link
                    to={reviewPath}
                    className="flex-1 min-w-0 truncate text-xs text-neutral"
                    title={movie.Title}
                  >
                    {movie.Title}
                  </Link>

                  <Link
                    to={reviewPath}
                    className="text-accent-content hover:opacity-70 transition-opacity"
                    title={reviewed ? 'ดูรีวิวของฉัน' : 'เขียนรีวิว'}
                    aria-label={reviewed ? `ดูรีวิว ${movie.Title}` : `เขียนรีวิว ${movie.Title}`}
                  >
                    <ReviewIcon filled={reviewed} />
                  </Link>

                  <button
                    type="button"
                    className={`transition-opacity hover:opacity-70 ${
                      watched ? 'text-accent-content' : 'text-accent-content/60'
                    }`}
                    onClick={() =>
                      setWatched(
                        {
                          imdbID: movie.imdbID,
                          Title: movie.Title,
                          Year: movie.Year,
                          Poster: movie.Poster,
                        },
                        !watched,
                      )
                    }
                    aria-pressed={watched}
                    title={watched ? 'ดูแล้ว (กดเพื่อยกเลิก)' : 'ยังไม่ได้ดู (กดเพื่อทำเครื่องหมายว่าดูแล้ว)'}
                    aria-label={watched ? 'ยกเลิกสถานะดูแล้ว' : 'ทำเครื่องหมายว่าดูแล้ว'}
                  >
                    <EyeIcon watched={watched} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}