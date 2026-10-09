// src/hooks/useMovie.ts
import { useQuery } from '@tanstack/react-query'
import { fetchMovieById } from '../lib/api'
import type { OmdbMovieDetail } from '../types/movie'

const ONE_DAY = 1000 * 60 * 60 * 24

/** Full movie detail (full plot) — cached separately from the short-plot list data */
export function useMovie(imdbId: string) {
  return useQuery<OmdbMovieDetail, Error>({
    queryKey: ['movie', imdbId, 'full'],
    queryFn: () => fetchMovieById(imdbId, 'full'),
    enabled: imdbId.length > 0,
    staleTime: ONE_DAY, // movie metadata rarely changes
  })
}
