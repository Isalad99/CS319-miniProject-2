// src/pages/SearchPage.tsx
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../lib/api'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import type { OmdbMovieDetail, OmdbSearchItem } from '../types/movie'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  })

  const totalPages = data ? Math.ceil(Number(data.totalResults) / 10) : 0

  function goToPage(p: number) {
    setSearchParams({ q: query, page: String(p) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Empty query
  if (!query.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-base-content/50">
        <span className="text-6xl">🔍</span>
        <p className="text-lg font-medium">พิมพ์ชื่อหนังที่ต้องการค้นหา</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold text-base-content">
          ผลการค้นหา
        </h1>
        {data && (
          <p className="text-sm text-base-content/60">
            "{query}" — พบ {Number(data.totalResults).toLocaleString()} รายการ
          </p>
        )}
        {!data && !isLoading && !isError && (
          <p className="text-sm text-base-content/60">กำลังค้นหา "{query}"…</p>
        )}
      </div>

      {/* Error state */}
      {isError && (
        <div className="alert alert-error shadow-sm">
          <span>{(error as Error).message ?? 'ค้นหาไม่สำเร็จ กรุณาลองใหม่'}</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : data?.Search.map((item: OmdbSearchItem) => (
              <MovieCard
                key={item.imdbID}
                movie={item as unknown as OmdbMovieDetail}
              />
            ))}
      </div>

      {/* No results */}
      {!isLoading && !isError && data?.Search.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-base-content/50">
          <span className="text-5xl"></span>
          <p className="text-base font-medium">ไม่พบหนังที่ค้นหา</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            className="btn btn-sm btn-ghost"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            ← ก่อนหน้า
          </button>

          <span className="text-sm text-base-content/70 px-2">
            หน้า {page} / {totalPages}
          </span>

          <button
            className="btn btn-sm btn-ghost"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  )
}
