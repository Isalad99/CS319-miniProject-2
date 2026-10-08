// src/hooks/useFeaturedMovies.ts
import { useQueries } from '@tanstack/react-query'
import { fetchMovieById } from '../lib/api'
import { FEATURED_MOVIES } from '../data/featuredMovies'

export function useFeaturedMovies() {
  return useQueries({
    queries: FEATURED_MOVIES.map((movie) => ({
      queryKey: ['movie', movie.imdbId],
      queryFn: () => fetchMovieById(movie.imdbId),
    })),
  })
}
