// src/lib/api.ts
import type { OmdbMovieDetail, OmdbSearchResponse } from '../types/movie'

const BASE_URL = 'https://www.omdbapi.com'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string

export async function fetchMovieById(imdbId: string): Promise<OmdbMovieDetail> {
  const res = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=short`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as OmdbMovieDetail
  if (data.Response === 'False') throw new Error(data.Error ?? 'Movie not found')
  return data
}

export async function searchMovies(query: string, page = 1): Promise<OmdbSearchResponse> {
  const res = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as OmdbSearchResponse
  if (data.Response === 'False') throw new Error('No results found')
  return data
}
