// src/hooks/useMovie.ts
import { useQuery } from '@tanstack/react-query'
import { fetchMovieById } from '../lib/api'

export function useMovie(imdbId: string) {
  return useQuery({
    queryKey: ['movie', imdbId],
    queryFn: () => fetchMovieById(imdbId),
    enabled: !!imdbId,
  })
}
