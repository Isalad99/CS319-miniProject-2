import { Link, useParams } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { useRatingStore } from "../store/useRatingStore";
import { useWatchlistStore } from "../store/useWatchlistStore";
import ErrorState from "../components/ErrorState";
import MovieDetailSkeleton from "../components/MovieDetailSkeleton";
import ReviewSection from "../components/ReviewSection";
import type { OmdbMovieDetail } from "../types/movie";

const NO_POSTER = "https://placehold.co/400x600/B0BA99/3D1F0E?text=No+Poster";

/** OMDb returns "N/A" for missing fields */
function valueOrNull(v: string | undefined): string | null {
  return v && v !== "N/A" ? v : null;
}

interface InfoRowProps {
  label: string;
  value: string | null;
}

function InfoRow({ label, value }: InfoRowProps) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-x-4 gap-y-0.5 py-2">
      <dt className="text-sm font-semibold text-base-content/60">{label}</dt>
      <dd className="text-sm text-base-content break-words">{value}</dd>
    </div>
  );
}

interface MovieDetailContentProps {
  movie: OmdbMovieDetail;
}

function MovieDetailContent({ movie }: MovieDetailContentProps) {
  // Selectors subscribe to only the slice they need (re-render on change)
  const myRating = useRatingStore(
    (s) => s.ratings[movie.imdbID]?.userRating ?? 0,
  );
  const setRating = useRatingStore((s) => s.setRating);
  const removeRating = useRatingStore((s) => s.removeRating);
  const inWatchlist = useWatchlistStore((s) => movie.imdbID in s.watchlist);
  const toggleWatchlist = useWatchlistStore((s) => s.toggleWatchlist);

  const poster = valueOrNull(movie.Poster) ?? NO_POSTER;
  const genres = (valueOrNull(movie.Genre) ?? "")
    .split(",")
    .map((g) => g.trim())
    .filter((g) => g.length > 0);
  const plot = valueOrNull(movie.Plot);
  const meta = [
    valueOrNull(movie.Rated),
    valueOrNull(movie.Runtime),
    valueOrNull(movie.Released),
  ]
    .filter((m): m is string => m !== null)
    .join(" • ");

  return (
    <article className="max-w-3xl mx-auto">
      {/* Title */}
      <header className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content leading-tight">
          {movie.Title}
        </h1>
        <p className="text-base sm:text-lg text-base-content/70">
          ({movie.Year})
        </p>
        {meta && (
          <p className="text-xs sm:text-sm text-base-content/60">{meta}</p>
        )}
        {genres.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2 pt-1">
            {genres.map((g) => (
              <li key={g} className="badge badge-accent text-accent-content">
                {g}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="divider my-4" />

      {/* Poster */}
      <div className="flex justify-center">
        <img
          src={poster}
          alt={`โปสเตอร์ ${movie.Title}`}
          className="w-48 sm:w-60 md:w-72 rounded-lg shadow-lg object-cover"
        />
      </div>

      {/* Actions: watchlist + my rating */}
      <section
        aria-label="การให้คะแนนและรายการโปรด"
        className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
      >
        <button
          type="button"
          className={`btn btn-sm ${inWatchlist ? "btn-secondary" : "btn-outline btn-secondary"}`}
          onClick={() => toggleWatchlist(movie.imdbID)}
          aria-pressed={inWatchlist}
        >
          {inWatchlist ? "✓ อยู่ใน Watch list" : "+ เพิ่มใน Watch list"}
        </button>
      </section>

      <div className="divider my-6" />

      {/* Plot */}
      {plot && (
        <section aria-label="เรื่องย่อ" className="space-y-2">
          <h2 className="text-lg font-bold text-base-content">เรื่องย่อ</h2>
          <p className="text-sm sm:text-base leading-relaxed text-base-content/90 whitespace-pre-line">
            {plot}
          </p>
        </section>
      )}

      {/* Ratings from sources */}
      {movie.Ratings.length > 0 && (
        <section aria-label="คะแนนจากเว็บไซต์ต่าง ๆ" className="mt-6">
          <h2 className="text-lg font-bold text-base-content mb-3">
            คะแนนรีวิว
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {movie.Ratings.map((r) => (
              <li
                key={r.Source}
                className="rounded-lg bg-base-300 px-4 py-3 text-center"
              >
                <p className="text-xl font-bold text-primary">{r.Value}</p>
                <p className="text-xs text-base-content/60">{r.Source}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Details */}
      <section aria-label="ข้อมูลเพิ่มเติม" className="mt-6">
        <h2 className="text-lg font-bold text-base-content mb-1">รายละเอียด</h2>
        <dl className="divide-y divide-base-300">
          <InfoRow label="ผู้กำกับ" value={valueOrNull(movie.Director)} />
          <InfoRow label="บทภาพยนตร์" value={valueOrNull(movie.Writer)} />
          <InfoRow label="นักแสดง" value={valueOrNull(movie.Actors)} />
          <InfoRow label="ภาษา" value={valueOrNull(movie.Language)} />
          <InfoRow label="ประเทศ" value={valueOrNull(movie.Country)} />
          <InfoRow label="รางวัล" value={valueOrNull(movie.Awards)} />
          <InfoRow
            label="IMDb"
            value={
              valueOrNull(movie.imdbRating)
                ? `${movie.imdbRating}/10 (${valueOrNull(movie.imdbVotes) ?? "-"} votes)`
                : null
            }
          />
        </dl>
      </section>

      {/* User reviews */}
      <ReviewSection imdbId={movie.imdbID} />
    </article>
  );
}

export default function MovieDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { data, isLoading, isError, error, refetch, isFetching } = useMovie(id);

  return (
    <div className="space-y-4">
      <Link to="/" className="btn btn-ghost btn-sm text-base-content/70 -ml-2">
        ← กลับหน้าหลัก
      </Link>

      {isLoading && <MovieDetailSkeleton />}

      {isError && (
        <ErrorState
          message={error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อ"}
          onRetry={() => void refetch()}
          isRetrying={isFetching}
        />
      )}

      {data && <MovieDetailContent movie={data} />}
    </div>
  );
}
