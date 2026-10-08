// src/pages/HomePage.tsx
import { useFeaturedMovies } from '../hooks/useFeaturedMovies'
import { FEATURED_MOVIES } from '../data/featuredMovies'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import type { OmdbMovieDetail } from '../types/movie'

export default function HomePage() {
  const movieQueries = useFeaturedMovies()

  const isLoading = movieQueries.some((q) => q.isPending)
  const hasError = movieQueries.some((q) => q.isError)

  const moviesWithMeta = movieQueries
    .map((q, i) => ({
      query: q,
      imdbId: FEATURED_MOVIES[i]?.imdbId ?? '',
    }))
    .filter((m) => m.query.isSuccess && m.query.data)

  return (
    <div className="space-y-4">
      {/* Movie grid — 5 columns matching design */}
      <h1 className="text-xl font-bold text-base-content">
        รายการแนะนำ
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {isLoading
          ? Array.from({ length: 25 }).map((_, i) => <SkeletonCard key={i} />)
          : moviesWithMeta.map(({ query, imdbId }) => (
              <MovieCard
                key={imdbId}
                movie={query.data as OmdbMovieDetail}
              />
            ))}
      </div>

      {/* Error fallback */}
      {hasError && (
        <div className="alert alert-error shadow-sm">
          <span>บางรายการโหลดไม่สำเร็จ</span>
        </div>
      )}
    </div>
  )
}
