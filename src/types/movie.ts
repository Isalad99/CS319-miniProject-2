// src/types/movie.ts

/** OMDb API - Full movie detail response (?i=ttXXXXXXX) */
export interface OmdbMovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string           // comma-separated: "Drama, Horror, Thriller"
  Director: string
  Writer: string
  Actors: string          // comma-separated
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string          // URL
  Ratings: OmdbRating[]
  Metascore: string
  imdbRating: string      // "8.1" (string, not number)
  imdbVotes: string       // "1,217,171"
  imdbID: string          // "tt1520211"
  Type: string            // "movie" | "series" | "episode"
  totalSeasons?: string
  Response: string        // "True" | "False"
  Error?: string          // present when Response = "False"
}

export interface OmdbRating {
  Source: string
  Value: string
}

/** OMDb API - Search response (?s=keyword) */
export interface OmdbSearchResponse {
  Search: OmdbSearchItem[]
  totalResults: string
  Response: string
}

export interface OmdbSearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

/** Fields needed to render a movie in a card (shared by detail + search results) */
export type MovieSummary = Pick<OmdbMovieDetail, 'Title' | 'Year' | 'Poster' | 'imdbID'>

/** OMDb plot length option */
export type OmdbPlotLength = 'short' | 'full'
