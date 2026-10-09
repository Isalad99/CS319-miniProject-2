// src/pages/HomePage.tsx
import { useFeaturedMovies } from '../hooks/useFeaturedMovies'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'

export default function HomePage() {
  const movieQueries = useFeaturedMovies()

  const isLoading = movieQueries.some((q) => q.isPending)
  const hasError = movieQueries.some((q) => q.isError)

  const movies = movieQueries.flatMap((q) => (q.isSuccess ? [q.data] : []))

  return (
    <div className="space-y-4">
      {/* Movie grid — 5 columns matching design */}
      <h1 className="text-xl font-bold text-base-content">
        รายการแนะนำ
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {isLoading
          ? Array.from({ length: 25 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>

      {/* Error fallback */}
      {hasError && (
        <ErrorState
          message="บางรายการโหลดไม่สำเร็จ"
          isRetrying={movieQueries.some((q) => q.isFetching)}
          onRetry={() =>
            movieQueries.forEach((q) => {
              if (q.isError) void q.refetch()
            })
          }
        />
      )}
    </div>
  )
}
